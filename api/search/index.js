import Router from 'koa-router';
import * as searchCtrl from './search.ctrl';

const search = new Router();

search.post('/', searchCtrl.index);
search.get('/test', searchCtrl.test);

export default search;