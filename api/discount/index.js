import Router from 'koa-router';
import * as discountCtrl from './discount.ctrl';

const discount = new Router();

discount.get('/', discountCtrl.getDiscountList);

export default discount;