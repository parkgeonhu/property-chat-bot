require('dotenv').config();
import Koa from 'koa';
import Router from "koa-router";
import bodyParser from 'koa-bodyparser';
import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';
import errorHandler, {HttpError} from './lib/errorHandler';
import cors from 'koa2-cors';
const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(cors());
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(errorHandler);
app.use(router.routes()).use(router.allowedMethods());

app.use(async ctx => {
    // Not Found 이고, 주소가 /api 로 시작하지 않는 경우
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        throw(new HttpError(404, 'Error'));
    }
 });
  

const server = app.listen(4000, () => {
    console.log('hssp server is listening to port 4000');
});

module.exports = {
    server
}