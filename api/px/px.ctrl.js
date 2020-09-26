import {HttpError} from "../../lib/errorHandler";

import axios from 'axios';
import checkLoggedIn from "../../lib/checkLoggedIn";

const apiKey = require(__dirname + '/../../config/api.config.json');


const getThumbnail = async (productName) => {
    const res = await axios({
        url: 'https://dapi.kakao.com/v2/search/image?query=' + encodeURI(productName) + '&size=1',
        method: 'GET',
        headers:{
            'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
        },
    });

    return res.data.documents.length === 0 ? '' : res.data.documents[0].thumbnail_url
};


export const px = async ctx => {

    let page = parseInt(ctx.request.query['page']);
    let limit = parseInt(ctx.request.query['limit']);

    page = isNaN(page) ? 0 : page;
    limit = isNaN(limit) ? 30 : page;

    const products = await axios({
        url: 'http://openapi.mnd.go.kr/' + apiKey['mndKey'] + '/json/DS_MND_PX_PARD_PRDT_INFO/' + page + '/' + limit,
        method: 'GET',
        timeout: 1000, // 1.5초 안에 응답이 없으면 더미 데이터를 리턴한다.
    }).catch(async res => {
        return {
            status: 200,
            data: {
                DS_MND_PX_PARD_PRDT_INFO: {
                    row:[
                        {
                            rowno: 1,
                            prdtnm: "신라면",
                        }
                    ],
                },
            },
        }
    });

    // if (!products) throw(new HttpError(500, '국방부 API 호출 실패'));

    ctx.status = 200;
    ctx.body = await Promise.all(
        products.data.DS_MND_PX_PARD_PRDT_INFO.row.map(async item => {
            return {
                id: item.rowno,
                name: item.prdtnm,
                thumbnail: await getThumbnail(item.prdtnm),
            }
        })
    );
};
