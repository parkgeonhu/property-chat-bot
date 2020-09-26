import Router from 'koa-router';
import * as userCtl from './user.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const user = new Router();

user.get('/:phone', userCtl.userInformation);
user.post('/', userCtl.register);

export default user;