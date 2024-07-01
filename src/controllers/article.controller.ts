import { Article } from '../entity/Articles';
import { AppDataSource } from '../data-source';
import { fetchRSSFeed } from '../utils/rss.parser';
import { jsonAll, jsonOne } from '../utils/general';
import { Request, Response, NextFunction } from 'express';

const getArticleList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let pageOptions: { search: string } = {
            search: req.query?.search === undefined ? '' : String(req.query?.search)
        };
        // create article repository
        const articleRepository = AppDataSource.getRepository(Article);
        const articles = await articleRepository
            .createQueryBuilder('article')
            .where("title ILIKE :q", {q:`%${pageOptions.search}%` })
            .orWhere("description ILIKE :q", {q:`%${pageOptions.search}%` })
            .orderBy('publication_date', 'DESC')
            .getMany();

        return jsonAll<any>(res, 200, articles);
    } catch (err) {
        next(err);
    }
};

const fetchArticle = async (req: Request, res: Response, next: NextFunction) => {
    let status = 0;
    const articleRepository = AppDataSource.getRepository(Article);
    const targets = req?.body?.feeds;

    const feeds = await Promise.all(targets.map(fetchRSSFeed));
    const articles = feeds.flatMap(feed => feed.items);

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
        status = 1;
    }

    if (status === 1) {
        return jsonOne<string>(res, 201, 'Feed store request has been executed successfully');
    } else {
        return jsonOne<string>(res, 400, 'Feed store request has not been executed successfully');
    }
};

export default { getArticleList, fetchArticle };
