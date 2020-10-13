import Router from 'koa-router';
import * as dataCtrl from './data.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const data = new Router();

data.get('/testParsing', dataCtrl.testParsing);
//auth.get('/sample1', dataCtrl.sample1);
//auth.post('/login', dataCtrl.login);

//회원만 접근 가능하게끔
// auth.get('/test', checkLoggedIn, dataCtrl.forUser);

export default data;