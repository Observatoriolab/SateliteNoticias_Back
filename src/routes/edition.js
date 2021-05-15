import express from 'express';
import {addEdition} from '../controllers';

const editionRouter = express.Router();
editionRouter.post('/edition', addEdition);

export default editionRouter;