import {getCategoryInfo, getKeywordInfoByNear} from './kakaoLocal'
import * as nearCondtion from './../data/near.condition.json'


/* 
MT1	대형마트
CS2	편의점
PS3	어린이집, 유치원
SC4	학교
AC5	학원
PK6	주차장
OL7	주유소, 충전소
SW8	지하철역
BK9	은행
CT1	문화시설
AG2	중개업소
PO3	공공기관
AT4	관광명소
AD5	숙박
FD6	음식점
CE7	카페
HP8	병원
PM9	약국
*/

// 학교의 경우 필터링이 필요해서 이렇게 함수를 분리한 것임


// 편의점
export const isSatisfyCS = async (x, y) => {
    const {category_group_code, radius, statisfaction} = nearCondtion["편의점"]

    const data = await getCategoryInfo(category_group_code, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};

export const isSatisfySW = async (x, y) => {
    const {category_group_code, radius, statisfaction} = nearCondtion["지하철역"]

    const data = await getCategoryInfo(category_group_code, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};

export const isSatisfyCT = async (x, y) => {
    const {category_group_code, radius, statisfaction} = nearCondtion["문화시설"]

    const data = await getCategoryInfo(category_group_code, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};


export const isSatisfyFD = async (x, y) => {
    const {category_group_code, radius, statisfaction} = nearCondtion["음식점"]

    const data = await getCategoryInfo(category_group_code, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};

export const isSatisfyTM = async (x, y) => {
    const {keyword, radius, statisfaction} = nearCondtion["전통시장"]

    const data = await getKeywordInfoByNear(keyword, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};

export const isSatisfySC = async (x, y) => {
    const {keyword, radius, statisfaction} = nearCondtion["학교"]

    const data = await getKeywordInfoByNear(keyword, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};


export const isSatisfy = async (x,y) => {
    let categorySurround = await Promise.all([
        isSatisfyCS(x,y),
        isSatisfySW(x,y),
        isSatisfyCT(x,y),
        isSatisfyFD(x,y)
    ])

    let keywordSurround = await Promise.all([
        isSatisfySC(x,y),
        isSatisfyTM(x,y)
    ])

    return {
        "편의점" : {
            is_satisfied : categorySurround[0]
        },
        "지하철역" : {
            is_satisfied : categorySurround[1]
        },
        "문화시설" : {
            is_satisfied : categorySurround[2]
        },
        "음식점" : {
            is_satisfied : categorySurround[3]
        },
        "학교" : {
            is_satisfied : keywordSurround[0]
        },
        "전통시장" : {
            is_satisfied : keywordSurround[1]
        },
    }
}
