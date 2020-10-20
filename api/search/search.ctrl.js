import db from '../../models'
import * as sampleRequest from './expect_request.json'
import * as answerInfo from '../../data/answer.info.json'
const { Op } = require("sequelize");

const getUserInputByType = (paramKey, paramValue) => {
    try{
        const info = answerInfo[paramKey]
        const type = info['type']
    }catch(err){
        return;
    }
    const info = answerInfo[paramKey]
    const type = info['type']
    let result = {};
    if (type == 'text') {
        let key = info['condition_name']
        result[key] = paramValue
    } else if (type == 'choose') {
        let list = info['list']
        for (let entry of list) {
            let key = entry['condition_name']
            let value = entry['condition_value']
            if (paramValue == entry['item_name']) {
                result[key] = value;
                break;
            }
        }
    } else if (type == 'currency') {
        const { amount } = JSON.parse(paramValue);
        let key = info['condition_name']
        result[key] = amount
    }
    return result;
}

const parsingParams = (params) => {
    for (let key of Object.keys(params)) {
        // if (answerInfo[key]['is_where']) {
        //     console.log(getUserInputByType(key, params[key]))
        // }
        console.log(getUserInputByType(key, params[key]))
    }
}


export const test = async ctx => {
    const params = sampleRequest.action.params;

    parsingParams(params)

    ctx.status = 200;
    ctx.body = {}
}



export const index = async ctx => {
    const params = ctx.request.body.action.detailParams;

    const result = await db.Apt.findAll({
        where: {
            subway: true,
            '$Sales.bjd$': '월계동',
            '$Sales.deposit$': { [Op.gte]: 3000 }
        },
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })
    // .then(users => {
    //     console.log(JSON.stringify(users));
    // })

    ctx.status = 200;
    ctx.body = JSON.stringify(result)
}