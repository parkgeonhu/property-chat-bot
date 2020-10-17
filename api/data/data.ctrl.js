//import db from '../../models'
import { HttpError } from '../../lib/errorHandler';
import { getRTMSDataSvcAptRentInfo } from '../../lib/parsing/openapi/crawling';
import { getKeywordInfo } from '../../lib/kakaoLocal';
import * as surround from '../../lib/surroundingInfo';
import db from '../../models'


/*
//거래 날짜
<년>2020</년>
<월>5</월>
<일>8</일>


<건축년도>2008</건축년도>
<법정동>사직동</법정동>
<보증금액>75,000</보증금액>
<아파트>광화문풍림스페이스본(101동~105동)</아파트>
<월세금액>0</월세금액>
<전용면적>94.51</전용면적>
<층>1</층>
```

```testParsing 명세
crawlingData() : 크롤링
preProcessing() : 데이터 전처리

```
*/

//코드 뼈대
export const parsing = async ctx => {
    //
    const data = await getRTMSDataSvcAptRentInfo();

}

// 파싱 테스트

export const testParsing = async ctx => {
    // 노원구 매물 2020/05 0페이지 
    const data = await getRTMSDataSvcAptRentInfo("11350", "202005", "0");

    let items = data.items.item;

    console.log(items[0]['아파트']);

    ctx.status = 200;
    ctx.body = await preProcessing(items)
}

export const test20 = async ctx => {
    // 노원구 매물 2020/05 0페이지 
    const data = await getRTMSDataSvcAptRentInfo("11350", "202005", "0");

    let items = data.items.item;

    let test20items = items.slice(0, 11);

    const result = await preProcessing(test20items);
    await insertData(result)


    ctx.status = 200;
    ctx.body = {
        status: "success"
    }
}



// async, await로 promise 객체 만들기
const getLngLat = (item) => {
    return new Promise((resolve, reject) => {
        resolve(
            {
                unique: item['아파트'],
                x: 20,
                y: 10
            }
        );
    })
}


const getLocationInfo = async (item) => {
    //`법정동 지번`으로 질의, documents[0] 의 정보를 파싱하도록 한다.
    let isValid = false;
    let data;

    const query = `${item['법정동']} ${item['지번']}`
    console.log(query)
    let searchData = await getKeywordInfo(query);
    isValid = searchData.meta.total_count > 0 ? true : false; // 검색 결과가 0 초과면 valid 하다고 판단
    if (isValid) {
        //추후 검색 후 documents 파싱할 때 다른 순서의 것을 가져올 수도 있음
        data = searchData.documents[0]
    }

    if (isValid) {
        // 도로명 주소가 없는 경우가 있나?
        const address = data['road_address_name']
        return {
            name: data['place_name'],
            x: data['x'],
            y: data['y'],
            is_valid: true,
            address
        }
    }
    else {
        return {
            is_valid: false
        }
    }
}


const preProcessing = async (items) => {
    let mapData = await Promise.all(
        items.map(async item => {
            //let { x, y } = await getLngLat()
            const locationInfo = await getLocationInfo(item);
            return {
                name: locationInfo['name'],
                build_date: item['건축년도'],
                floor: item['층'],
                bjd: item['법정동'],
                jibun: item['지번'],
                deposit: item['보증금액'],
                monthly_rent: item['월세금액'],
                x: locationInfo['x'],
                y: locationInfo['y'],
                address: locationInfo['address']
            };
        })
    )



    let result = await Promise.all(
        mapData.map(async item => {
            const surrounding = await surround.isSatisfy(item['x'], item['y']);
            return {
                ...item,
                surrounding
            }
        })
    )

    // console.log(mapData)
    // let data = items.map((item, idx) => {
    //     return {
    //         name: item['아파트'],
    //         build_date: item['건축년도'],
    //         floor: item['층'],
    //         bjd: item['법정동'],
    //         x : mapData[idx]['x'],
    //         y : mapData[idx]['y'],
    //         key : mapData[idx]['unique']
    //     }
    // })

    return result
}

const insertData = async (items) => {
    for (let item of items) {
        //apt db에 정보가 있는지
        const aptSearch = await db.Apt.findAll({ where: { address: item['address'] } })

        let aptId = null

        if (aptSearch.length == 0) {
            // subway : item['surrounding']['전통시장']['is_satisfied'],
            let temp = await db.Apt.create({
                name: item['name'],
                x: item['x'],
                y: item['y'],
                subway: item['surrounding']['지하철역']['is_satisfied'],
                cultural_facility: item['surrounding']['문화시설']['is_satisfied'],
                convenience_store: item['surrounding']['편의점']['is_satisfied'],
                traditional_market: item['surrounding']['전통시장']['is_satisfied'],
                bjd: item['bjd'],
                address : item['address']
            })
            aptId = temp.id
        }

        if (aptId == null) {
            let temp = await db.Apt.findOne({ where: { address: item['address'] } })
            aptId = temp.id
        }


        await db.Sale.create({
            aptId,
            deposit: item['deposit'],
            monthly_rent: item['monthly_rent'],
            bjd: item['bjd']
        })



    }
}