import Router from 'koa-router';

import data from './data';
import search from './search';

const api = new Router();

api.use('/data', data.routes());
api.use('/search', search.routes());


// 라우터를 내보냅니다.
export default api;