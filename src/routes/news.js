import express from 'express';
import { createSlug, addRatingRelevance, addRatingIrrelevance,addAuthorCount } from '../middleware';

import {addPieceNews, putPieceNewsMetadata, putPieceNewsRelevance, putPieceNewsIrrelevance,getBatchNews    } from '../controllers';


const newsRouter = express.Router();

newsRouter.post('/get_news', getBatchNews);

newsRouter.post('/create_news', createSlug, addPieceNews);


newsRouter.put('/news_rating_relevance', addRatingRelevance, putPieceNewsRelevance);
newsRouter.put('/news_rating_irrelevance', addRatingIrrelevance, putPieceNewsIrrelevance);


newsRouter.put('/news_metadata', addAuthorCount,putPieceNewsMetadata);

export default newsRouter;