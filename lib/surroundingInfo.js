import {getCategoryInfo, getKeywordInfoByNear} from './kakaoLocal'
import * as nearCondtion from './near.condition.json'


```
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
```
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


export const isSatisfyTM = async (x, y) => {
    const {keyword, radius, statisfaction} = nearCondtion["전통시장"]

    const data = await getKeywordInfoByNear(keyword, radius, x, y)

    const isSatisfied = data.meta.total_count >= statisfaction ? true : false;

    // return 주변 시설의 개수
    return isSatisfied
};

export const isSatisfy = async (x,y) => {
    let result = await Promise.all(
        isSatisfyCS(),
        isSatisfySW(),
        isSatisfyCT(),
        isSatisfyTM()
    )
    return {
        "편의점" : {
            is_satisfied : result[0]
        },
        "지하철역" : {
            is_satisfied : result[1]
        },
        "문화시설" : {
            is_satisfied : result[2]
        },
        "전통시장" : {
            is_satisfied : result[3]
        }
    }
}
