import express from 'express';
import { indexPage, messagesPage,addMessage } from '../controllers';
import { modifyMessage,performAsyncAction  } from '../middleware';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);


import news from '../controllers/news';
import edition from '../controllers/edition';
import comment from '../controllers/edition';

indexRouter.use(news)
indexRouter.use(edition)
indexRouter.use(comment)
export default indexRouter;
