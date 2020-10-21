import db from '../../models'
import * as sampleRequest from './expect_request.json'
import * as answerInfo from '../../data/answer.info.json'
import * as duration from '../../lib/parsing/duration'
const { Op } = require("sequelize");

const getUserInputByType = (paramKey, paramValue) => {
    try {
        const info = answerInfo[paramKey]
        const type = info['type']
    } catch (err) {
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

const pushConditionToDict = (target, conditionDict) => {
    for (const [key, value] of Object.entries(conditionDict)) {
        target[key] = value
    }
}

const parsingParams = (params) => {
    let whereCondition = {};
    let userCondition = {};
    for (let key of Object.keys(params)) {
        const isWhere = answerInfo[key] != undefined ? answerInfo[key]['is_where'] : 'no'
        if (isWhere == 'no') {
            continue;
        }
        const condition = getUserInputByType(key, params[key])
        if (condition == undefined) {
            continue;
        }
        if (isWhere) {
            pushConditionToDict(whereCondition, condition)
        }
        else {
            pushConditionToDict(userCondition, condition)
        }
        // console.log(condition)
    }
    return {
        whereCondition,
        userCondition
    }
}

const getWHERESequelize = (whereCondition) => {
    let result = {}
    let exceptConditions = ['deposit', 'monthly_rent']
    for (let conditionKey of Object.keys(whereCondition)) {
        // let [key, value] = Object.entries(whereCondition[conditionKey])[0];
        if (exceptConditions.find(el => el == conditionKey) == undefined) {
            result[conditionKey] = whereCondition[conditionKey]
        }
    }

    
    result[`$Sales.deposit$`] = { [Op.lte]: whereCondition['deposit'] }
    result[`$Sales.monthly_rent$`] = { [Op.lte]: whereCondition['monthly_rent'] }
    result['$Sales.bjd$'] = "월계동"


    // let exceptConditions = ['deposit', 'monthly_rent']
    // for (let condition of whereCondition) {
    //     let [key, value] = Object.entries(condition)[0];
    //     if (exceptConditions.find(el => el == key) != undefined) {
    //         result[key] = value
    //     }
    //     else{
    //         result[`$Sales.${key}$`] = { [Op.gte]: 3000 }
    //     }

    // }
    return result;
}


export const test = async ctx => {
    const params = sampleRequest.action.params;

    const conditions=parsingParams(params)
    console.log(conditions)

    console.log(conditions["whereCondition"])
    const where=getWHERESequelize(conditions["whereCondition"])

    const result = await db.Apt.findAll({
        where,
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })

    ctx.status = 200;
    ctx.body = JSON.stringify(result)
}

export const durationTest = async ctx => {

    const driving = await duration.getDrivingDuration(127.07703045060357,37.63906582026493, 126.996969239236, 37.6107638961532)
    const transit = await duration.getTransitDuration(127.07703045060357,37.63906582026493, 126.996969239236, 37.6107638961532)

    console.log(driving, transit)
    
    ctx.status = 200;
    ctx.body = {
        driving,
        transit
    }
}




export const index = async ctx => {
    const params = ctx.request.body.action.detailParams;

    const result = await db.Apt.findAll({
        where: {
            subway: true,
            '$Sales.bjd$': '월계동',
            '$Sales.deposit$': { [Op.lte]: 3000 }
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