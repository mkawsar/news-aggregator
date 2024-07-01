import { Router } from 'express';
import { ArticleController } from '../../controllers'
import validate from '../../middleware/validation.middleware';
import { requiredTextField } from '../../validators/common.validator';

const _router = Router();

_router
    .route('/list')
    .get(ArticleController.getArticleList);

 _router
    .route('/fetch')
    .post(validate([
        requiredTextField('feeds', 'feeds', { min: 2, max: 255 })
    ]), ArticleController.fetchArticle);

//EXPORT
export const router = _router;
