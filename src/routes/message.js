import express from 'express';
import { indexPage, messagesPage,addMessage } from '../controllers';
import { modifyMessage,performAsyncAction  } from '../middleware';

const messageRouter = express.Router();
messageRouter.get('/', indexPage);
messageRouter.get('/messages', messagesPage);
messageRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);

export default messageRouter.get('/messages', messagesPage);
;