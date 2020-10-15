//import db from '../../models'
import { HttpError } from '../../lib/errorHandler';
import { getRTMSDataSvcAptRentInfo } from '../../lib/parsing/openapi/crawling';
import { getKeywordInfo } from '../../lib/kakaoLocal';



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

```
우선 건축년도, 보증금액, 월세금액, 아파트 이름, 월세금액, 전용면적, 층은 db에 insert 하되,
promise로 비동기 처리를 시도.
1. insert 하기 전 법정동+아파트이름 조합한 것을 카카오맵에 질의.
2. 거기서 나온 x,y 좌표는 db에 넣는 것을 대기
3. 2에서 나온 정보 중 도로명 주소 또는 주소의 동만 추출하여 카카오 address에 질의
4. 
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


// async, await로 promise 객체 만들기
const getLngLat = (item) => {
    return new Promise((resolve, reject) => {
        resolve(
            {
                unique : item['아파트'],
                x: 20,
                y: 10
            }
        );
    })
}


//queryList 얻어내기
const getQueryList = (item) => {
    let queryList=[]
    return queryList;
}

const getLocationInfo = async (item) => {
    //최적의 질의어로 상단, documents[0] 의 정보를 파싱하도록 한다.
    let isValid=false;
    let data;

    const queryList = getQueryList();

    // querylist중에 valid한 것만
    for(query of queryList){
        let tempData = await getKeywordInfo(query);
        isValid = tempData.meta.total_count > 0 ? true : false; // 검색 결과가 0 초과면 valid 하다고 판단
        if(isValid){
            data = tempData.documents[0]
            break;
        }
    }


    if(isValid){
        const address = data['address_name']
        return {
            x : data['x'],
            y : data['y'],
            is_valid : isValid,
            address
        }
    }
    else{
        return {
            is_valid : false
        }
    }
}


const preProcessing = async (items) => {
    let mapData = await Promise.all(
        items.map(async item => {
            //let { x, y } = await getLngLat()
            const value = await getLngLat(item);
            return {
                name: item['아파트'],
                build_date: item['건축년도'],
                floor: item['층'],
                bjd: item['법정동'],
                x: value['x'],
                y: value['y'],
            };
            // return {
            //     name: item['아파트'],
            //     build_date: item['건축년도'],
            //     floor: item['층'],
            //     bjd: item['법정동'],
            //     test : getLngLat()
            // }
        })
    )

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

    return mapData
}


// export const userInformation = async ctx => {
//     const {phone} = ctx.request.body;

//     if (!phone) {
//         console.log("내 정보 출력");
//     }

//     await db.User.find({
//         where: {phone},
//     });
// };

// export const register = async ctx => {
//     const { phone, password, name, birthDate, army } = ctx.request.body;
//     await db.User.findOrCreate({
//         where: { phone },
//         defaults: {
//             phone,
//             password: password,
//             name,
//             birthDate,
//             isActive:true,
//             isAdmin:false,
//             army: (army === undefined) ? '육군' : army,
//         }
//     }).then((result) => {
//         const [user, created] = result;
//         if (created)
//         {
//             ctx.status = 201;
//             ctx.body = user;
//         }
//         else
//         {
//             throw(new HttpError(400, "이미 사용자가 존재합니다."));
//         }
//     })
// }