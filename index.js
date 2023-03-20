import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import { postPublishMessage } from './routes/postPublish.js';
import { textSearch } from './routes/textSearch.js';
import { unsubscribeAPI } from './routes/unsubscribe.js';
import { postFeedback } from './routes/feedback.js';
import { subscribeAPI } from './routes/subscribe.js';
import { starterPage } from './routes/index.js';
import { subscribeHomepage } from './routes/getSubscribe.js';
import { getPublishPage } from './routes/getPublish.js';
import { getTextSearchPage } from './routes/getTextSearch.js';
import { getUnsubscribePage } from './routes/getUnsubscribe.js';

const app=express();

// To configure the .env file
dotenv.config();

// To set-up the  __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'))

// To render HTML files
app.set('view engine', 'ejs')

// For parsing the request body
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

// Routes

// GET ROUTES
app.use(starterPage)
app.use(subscribeHomepage)
app.use(getPublishPage)
app.use(getTextSearchPage)
app.use(getUnsubscribePage)

// POST ROUTES
app.use(subscribeAPI)
app.use(postPublishMessage)
app.use(textSearch)
app.use(unsubscribeAPI)
app.use(postFeedback)



export {__dirname as dirname};
export default app;