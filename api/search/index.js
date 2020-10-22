import Router from 'koa-router';
import * as searchCtrl from './search.ctrl';

const search = new Router();

search.get('/', searchCtrl.index);
search.get('/test', searchCtrl.test);
search.get('/duration', searchCtrl.durationTest);
search.get('/hashtag', searchCtrl.getHashTag);
search.get('/school', searchCtrl.getSchoolNumber);





export default search;