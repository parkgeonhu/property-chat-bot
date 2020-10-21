//import db from '../../models'
import { HttpError } from '../../lib/errorHandler';
import { getRTMSDataSvcAptRentInfo } from '../../lib/crawling/openapi';
import db from '../../models'
import * as seoulBorough from '../../data/seoul.borough.json'
import * as constant from '../../data/constant.json'
import * as parsingKakao from '../../lib/parsing/kakao'
import * as util from '../../util'


const getQuery = (item) => {
    return `${item['bjd']} ${item['jibun']}`
}

const getRefinedSales = (items) => {
    //[TO-DO] build_date, new 판단 
    let refinedSales = items.map(item => {
        let deposit=util.getRefinedPrice(item['보증금액'])
        let monthly_rent=util.getRefinedPrice(item['월세금액'])
        let deal_type = "전세"

        if(monthly_rent!=0){
            deal_type = "월세"
        }

        return {
            build_date: item['건축년도'],
            floor: item['층'],
            bjd: item['법정동'].trim(),
            jibun: item['지번'],
            deposit,
            monthly_rent,
            deal_type
        }
    })
    return refinedSales;
}

const getSalesByJibun = (items, jibun) => {
    let sales = items.filter(el => el['jibun'] == jibun)
    return sales;
}

const getSaleData = async () => {
    //[TO-DO] 왜 default 가 object.entries에 있ㄴ느지
    const seoul_borough = Object.entries(seoulBorough);
    const limit = constant['parsing_limit']
    let saleData = [];

    for (let i = 0; i < seoul_borough.length; i += 5) {
        const seoul_borough_sliced = seoul_borough.slice(i, i + 5)

        await Promise.all(
            seoul_borough_sliced
                .map(async borough => {
                    const lawd_cd = borough[1]['lawd_cd']
                    if (lawd_cd == undefined) {
                        return Promise.resolve();
                    }

                    let items = []


                    //deal_ymd로 2020년 08년, 2020년 09월 매물 거래 리스트 뽑아오기
                    let deal_ymds = ["202008", "202009"]
                    for await (let deal_ymd of deal_ymds) {
                        const data = await getRTMSDataSvcAptRentInfo(lawd_cd, deal_ymd, "0");
                        if (data == undefined || data.items.item==undefined) {
                            return Promise.resolve();
                        }
                        const saleItems = getRefinedSales(data.items.item);  // 매물들
                        for (let item of saleItems) {
                            items.push(item)
                        }

                    }

                    // const items = getRefinedSales(data.items.item);  // 매물들
                    if (items == undefined) {
                        return Promise.resolve();
                    }

                    // 법정동 기준으로 필터링
                    for (let bjd of borough[1]['bjd']) {
                        const items_filteredBybjd = items.filter(el => el.bjd==bjd)
                        const uniqueItems = util.getUniqueArray(items_filteredBybjd, 'jibun')

                        util.writeJSONData(bjd, uniqueItems)

                        const refinedItems = uniqueItems.map(item => {
                            return {
                                query: getQuery(item),
                                sales: getSalesByJibun(items, item['jibun']).slice(0, 3)
                            }
                        })

                        let limit_items = refinedItems.slice(0, limit);

                        for (let item of limit_items) {
                            saleData.push(item)
                        }

                    }

                })
        )
    }

    util.writeJSONData("test", saleData);
    console.log(saleData.length)

    return saleData
}


const insertData = async (items) => {

    for await (let item of items) {
        //apt db에 정보가 있는지
        const aptSearch = await db.Apt.findAll({ where: { address: item['address'] } })

        let aptId = null

        if (aptSearch.length == 0) {
            // subway : item['surrounding']['전통시장']['is_satisfied'],
            let temp = await db.Apt.create({
                name: item['name'],
                x: item['x'],
                y: item['y'],
                restaurant : item['surrounding']['음식점']['is_satisfied'],
                school : item['surrounding']['학교']['is_satisfied'],
                subway: item['surrounding']['지하철역']['is_satisfied'],
                cultural_facility: item['surrounding']['문화시설']['is_satisfied'],
                convenience_store: item['surrounding']['편의점']['is_satisfied'],
                traditional_market: item['surrounding']['전통시장']['is_satisfied'],
                bjd: item['bjd'],
                address: item['address']
            })
            aptId = temp.id
        }

        if (aptId == null) {
            let temp = await db.Apt.findOne({ where: { address: item['address'] } })
            aptId = temp.id
        }

        for await (let sale of item['sales']) {
            await db.Sale.create({
                aptId,
                deposit: sale['deposit'],
                monthly_rent: sale['monthly_rent'],
                bjd: sale['bjd'],
                deal_type : sale['deal_type']
            })
        }
    }
}

const preProcessing = async (items) => {

    let mapData = await parsingKakao.getMapData(items)


    console.log(mapData)


    let surroundingData = await parsingKakao.getSurroundingData(mapData)


    return surroundingData
}



export const parsing = async ctx => {
    let saleData = await getSaleData()
    let dbData = await preProcessing(saleData)
    await insertData(dbData)
    ctx.status = 200;
    ctx.body = {
        status: "success12"
    }
}