import db from '../../models'
import * as sampleRequest from './expect_request.json'
import * as aptsDuration from './expected.apts.json'
import * as answerInfo from '../../data/answer.info.json'
import * as duration from '../../lib/parsing/duration'
import * as util from '../../util/index'
import { getKeywordInfo } from '../../lib/kakaoLocal'
import { isSatisfySC } from '../../lib/surroundingInfo';
import { getBaseMsg, getKakaoSimpleMsg } from '../../lib/message'
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
    let exceptConditions = ['deposit', 'monthly_rent', 'deal_type']
    for (let conditionKey of Object.keys(whereCondition)) {
        // let [key, value] = Object.entries(whereCondition[conditionKey])[0];
        if (exceptConditions.find(el => el == conditionKey) == undefined) {
            //answer.info의 condition_value 가 false일 때는 조건에 넣어주지 않는다.
            if (whereCondition[conditionKey] == false) {
                continue;
            }
            result[conditionKey] = whereCondition[conditionKey]
        }
    }


    result[`$Sales.deposit$`] = { [Op.lte]: whereCondition['deposit'] }
    result[`$Sales.monthly_rent$`] = { [Op.lte]: whereCondition['monthly_rent'] }
    result[`$Sales.deal_type$`] = whereCondition['deal_type']
    // result['$Sales.bjd$'] = "월계동"


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

const getDestinationInfo = async (commute_location) => {
    const data = await getKeywordInfo(commute_location)
    const isValid = data.meta.total_count > 0 ? true : false; // 검색 결과가 0 초과면 valid 하다고 판단

    if (isValid) {
        // 아파트만 파싱하도록.
        const document = data.documents[0]
        console.log(document)
        const x = document.x;
        const y = document.y;

        return {
            is_valid: true,
            x,
            y
        }
    }
    else {
        return {
            is_valid: false
        }
    }
}

const getDuration = async (userCondition, sales) => {
    const commute_type = userCondition["commute_type"]
    const commute_time = userCondition["commute_time"]
    const commute_location = userCondition["commute_location"]

    console.log(commute_location)

    const destination = await getDestinationInfo(commute_location)
    if (destination['is_valid'] == false) {
        //통근 주소가 잘못됐다는 반려폼 들어가야함
        throw ("address error")
    }

    console.log(destination)

    const dx = parseFloat(destination['x']);
    const dy = parseFloat(destination['y']);

    let sales_sorted_by_distance = sales.map(sale => {
        console.log(sale['x'], sale['y'], dx, dy)
        const distance = util.getDistance(sale['x'], sale['y'], dx, dy)
        return {
            ...sale,
            distance
        }
    })

    sales_sorted_by_distance.sort((a, b) => {
        if (a.distance < b.distance) {
            return -1;
        } else if (a.distance > b.distance) {
            return 1;
        }
        return 0;
    })

    console.log(sales_sorted_by_distance)

    let sales_sliced = sales_sorted_by_distance.slice(0, 5)

    let sales_sorted;
    if (commute_type == 'transit') {
        sales_sorted = await Promise.all(sales_sliced.map(async sale => {
            return {
                ...sale,
                duration: await duration.getTransitDuration(sale['x'], sale['y'], dx, dy)
            }
        }))
    } else if (commute_type == 'driving') {
        sales_sorted = await Promise.all(sales_sliced.map(async sale => {
            return {
                ...sale,
                duration: await duration.getDrivingDuration(sale['x'], sale['y'], dx, dy)
            }
        }))
    }

    return sales_sorted.filter(el => el.duration <= commute_time);
}


export const test = async ctx => {
    const params = sampleRequest.action.params;

    const conditions = parsingParams(params)
    console.log(conditions)

    console.log(conditions["whereCondition"])
    const where = getWHERESequelize(conditions["whereCondition"])

    const result = await db.Apt.findAll({
        where,
        raw: true,
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })

    const userCondition = conditions["userCondition"]
    await getDuration(userCondition, result)

    ctx.status = 200;
    ctx.body = JSON.stringify(result)
}

export const durationTest = async ctx => {

    const driving = await duration.getDrivingDuration(127.07703045060357, 37.63906582026493, 126.996969239236, 37.6107638961532)
    const transit = await duration.getTransitDuration(127.07703045060357, 37.63906582026493, 126.996969239236, 37.6107638961532)

    console.log(driving, transit)

    ctx.status = 200;
    ctx.body = {
        driving,
        transit
    }
}


export const getSchoolNumber = async ctx => {

    console.log(await isSatisfySC(127.07703045060357, 37.63906582026493))

    ctx.status = 200;
    ctx.body = {
        "status": "success"
    }
}


export const getHashTag = async ctx => {


    ctx.status = 200;
    ctx.body = hastagExample
}



export const index = async ctx => {
    // // const params = ctx.request.body.action.detailParams;

    // const params = sampleRequest.action.params;

    // const conditions = parsingParams(params)
    // console.log(conditions)

    // console.log(conditions["whereCondition"])

    // const dbData = await db.Apt.findAll({
    //     where: {
    //         '$Sales.bjd$': '월계동',
    //     },
    //     include: [{
    //         model: db.Sale,
    //         as: 'Sales'
    //     }]
    // })



    const params = ctx.request.body.action.params;

    const conditions = parsingParams(params)
    console.log(conditions)

    console.log(conditions["whereCondition"])
    const where = getWHERESequelize(conditions["whereCondition"])

    const dbData = await db.Apt.findAll({
        where,
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })



    const dbDataJson = JSON.stringify(dbData)
    const result = JSON.parse(dbDataJson)

    const userCondition = conditions["userCondition"]
    const apts = await getDuration(userCondition, result)

    const baseMsg = getBaseMsg(apts)
    const kakaoMsg = getKakaoSimpleMsg(baseMsg)
    util.writeJSONData("baseMsg", baseMsg)
    util.writeJSONData("kakaoMsg", kakaoMsg)



    // .then(users => {
    //     console.log(JSON.stringify(users));
    // })

    ctx.status = 200;
    ctx.body = kakaoMsg
}

export const kakao = async ctx => {
    const params = sampleRequest.action.params;
    //const params = ctx.request.body.action.params;


    const conditions = parsingParams(params)
    console.log(conditions)

    const where = getWHERESequelize(conditions["whereCondition"])

    const dbData = await db.Apt.findAll({
        where,
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })



    const dbDataJson = JSON.stringify(dbData)
    const result = JSON.parse(dbDataJson)

    const userCondition = conditions["userCondition"]
    try {
        const apts = await getDuration(userCondition, result)

        const baseMsg = getBaseMsg(apts)
        const kakaoMsg = getKakaoSimpleMsg(baseMsg)
        util.writeJSONData("baseMsg", baseMsg)
        util.writeJSONData("kakaoMsg", kakaoMsg)
        ctx.status = 200;
        ctx.body = kakaoMsg
    } catch (err) {
        console.error(err)
        ctx.status = 400;
        ctx.body = {
            message: err
        }
    }




    // .then(users => {
    //     console.log(JSON.stringify(users));
    // })


}