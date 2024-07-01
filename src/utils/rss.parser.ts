import axios from 'axios';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

export const fetchRSSFeed = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const feed = await parser.parseString(data);
        return feed;
    } catch (err) {
        throw new Error(`Error fetching RSS feed from ${url}: ${err.message}`);
    }
};
