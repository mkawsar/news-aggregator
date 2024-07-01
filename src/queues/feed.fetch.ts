import Queue from 'bull';
import { Article } from '../entity/Articles';
import { AppDataSource } from '../data-source';
import { fetchRSSFeed } from '../utils/rss.parser';

const rssQueue = new Queue('rssQueue');

const rssFeeds = [
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
];

rssQueue.process(async (job, done) => {
    try {
        await AppDataSource.initialize();
        const feeds = await Promise.all(rssFeeds.map(fetchRSSFeed));
        const articles = feeds.flatMap(feed => feed.items);

        //create article repository
        const articleRepository = AppDataSource.getRepository(Article);
        for (const article of articles) {
            const existingArticle = await articleRepository.findOne({where: { title: article?.title }});
            if (!existingArticle) {
                const feed = new Article();
                feed.title = article?.title;
                feed.description = article?.content;
                feed.creator = article?.creator;
                feed.publication_date = new Date(article?.pubDate);
                feed.source = article?.link;
                await articleRepository.save(feed);
            }
        }
        done();
    } catch (err) {
        done(err);
    }
});

// Add a job to the queue every 15 minutes
setInterval(() => {
    rssQueue.add({});
}, 15 * 60 * 1000);
  
console.log('Worker is running...');
