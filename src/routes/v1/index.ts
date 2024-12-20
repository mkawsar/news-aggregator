import { router as ArticleRoute } from './article.route';
import { Request, Response, NextFunction, Router } from 'express';

const _router: Router = Router({
    mergeParams: true
});

//DEFINE API VERSION
_router.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Api-Version', 'v1');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// HEALTHCHECK
_router.route('/v1/health/check').get(function (req: Request, res: Response) {
    return res.status(200).json({ healthy: true, version: 'v1' });
});

_router.use('/v1/article', ArticleRoute);

export const router = _router;
