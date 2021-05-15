import express from 'express';
import {addPieceNews, putPieceNewsMetadata, putPieceNewsRelevance, putPieceNewsIrrelevance    } from '../controllers';
import { createSlug, addRatingRelevance, addRatingIrrelevance,addAuthorCount } from '../middleware';

const newsRouter = express.Router();


newsRouter.post('/news', createSlug, addPieceNews);


newsRouter.put('/news_rating_relevance', addRatingRelevance, putPieceNewsRelevance);
newsRouter.put('/news_rating_irrelevance', addRatingIrrelevance, putPieceNewsIrrelevance);


newsRouter.put('/news_metadata', addAuthorCount,putPieceNewsMetadata);

export default newsRouter;