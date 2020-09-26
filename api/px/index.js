import Router from 'koa-router';
import * as pxCtrl from './px.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const px = new Router();

px.get('/',checkLoggedIn, pxCtrl.px);

export default px;