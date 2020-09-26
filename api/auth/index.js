import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const auth = new Router();

auth.get('/sample', authCtrl.sample);
auth.get('/sample1', authCtrl.sample1);
auth.post('/login', authCtrl.login);

//회원만 접근 가능하게끔
auth.get('/test', checkLoggedIn, authCtrl.forUser);

export default auth;