import Router from 'koa-router';
import * as foodCtrl from './food.ctrl';
import checkLoggedIn from "../../lib/checkLoggedIn";

const food = new Router();

food.get('/', checkLoggedIn, foodCtrl.getFoodList);

export default food;