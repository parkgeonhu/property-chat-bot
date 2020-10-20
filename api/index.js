import Router from 'koa-router';
// import auth from './auth';
// import user from './user';

import data from './data';
import search from './search';


import px from './px';
import food from './food';
import discount from './discount';

const api = new Router();

// api.use('/auth', auth.routes());
// api.use('/user', user.routes());

api.use('/data', data.routes());
api.use('/search', search.routes());


// api.use('/px', px.routes());
// api.use('/food', food.routes());
// api.use('/discount', discount.routes());

// 라우터를 내보냅니다.
export default api;