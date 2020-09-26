import {HttpError} from "../../lib/errorHandler";

import axios from 'axios';

const apiKey = require(__dirname + '/../../config/api.config.json');

export const getFoodList = async ctx => {
    let page = parseInt(ctx.request.query['page']);
    let limit = parseInt(ctx.request.query['limit']);

    page = isNaN(page) ? 0 : page;
    limit = isNaN(limit) ? 30 : page;

    ctx.status = 200;
    ctx.body = [
        {
            "type":"breakfast",
            "menu":[
                {
                    "name" : "보리밥",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "비엔나 소세지 야채볶음",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "아이스크림",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
            ]
        },
        {
            "type":"lunch",
            "menu":[
                {
                    "name" : "보리밥",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "비엔나 소세지 야채볶음",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "아이스크림",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
            ]
        },
        {
            "type":"dinner",
            "menu":[
                {
                    "name" : "보리밥",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "비엔나 소세지 야채볶음",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
                {
                    "name" : "아이스크림",
                    "kcal": 365,
                    "protein" : 300,
                    "carbohydrate" : 200
                },
            ]
        }
    ];
};