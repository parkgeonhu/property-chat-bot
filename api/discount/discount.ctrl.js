import { HttpError } from "../../lib/errorHandler";

import axios from 'axios';

const apiKey = require(__dirname + '/../../config/api.config.json');

export const getDiscountList = async ctx => {
    let page = parseInt(ctx.request.query['page']);
    let limit = parseInt(ctx.request.query['limit']);

    page = isNaN(page) ? 0 : page;
    limit = isNaN(limit) ? 30 : page;

    ctx.status = 200;
    ctx.body = {
        cardBenefit: [
            {
                name: 'IBK 기업은행 나라사랑카드 혜택',
                img: 'https://via.placeholder.com/150',
                detail: 'CU 5% 할인 등'
            },
            {
                name: 'IBK 기업은행 나라사랑카드 혜택',
                img: 'https://via.placeholder.com/150',
                detail: 'CU 5% 할인 등'
            },
        ],
        statusBenefit: [
            {
                name: '휴양지 할인',
                img: 'https://via.placeholder.com/150',
                detail: '여기어때 5% 할인 등'
            },
            {
                name: '휴양지 할인',
                img: 'https://via.placeholder.com/150',
                detail: '여기어때 5% 할인 등'
            },
        ],
    };
};