import express from 'express';

const indexRouter = express.Router();

import newsRouter from './news';
import editionRouter from './edition';
import commentRouter from './comment';
import messageRouter from './message';

indexRouter.use(newsRouter)
indexRouter.use(editionRouter)
indexRouter.use(commentRouter)
indexRouter.use(messageRouter)


export default indexRouter;
