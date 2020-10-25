import Router from 'koa-router';
import * as dataCtrl from './data.ctrl';

const data = new Router();

// data.get('/testParsing', dataCtrl.testParsing);
// data.get('/test20', dataCtrl.test20);
// data.get('/parsing', dataCtrl.parsing);

data.get('/parsing', dataCtrl.parsing);

export default data;