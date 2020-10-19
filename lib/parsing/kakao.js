import { getKeywordInfo } from '../../lib/kakaoLocal';
import * as surround from '../surroundingInfo';

export const getLocationInfo = async (item) => {
    //`법정동 지번`으로 질의, documents[0] 의 정보를 파싱하도록 한다.
    let isValid = false;
    let data;

    const query = `${item['법정동']} ${item['지번']}`
    let searchData = await getKeywordInfo(query);

    isValid = searchData.meta.total_count > 0 ? true : false; // 검색 결과가 0 초과면 valid 하다고 판단
    
    if (isValid) {
        // 아파트만 파싱하도록.
        isValid = false;
        for (let document of searchData.documents) {
            let category_name = document.category_name.split(' > ')
            if (category_name[2] == '아파트') {
                data = document
                isValid = true;
                break;
            }
        }

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

export const getMapData = async(items) => {
    let mapData = []
    for (let i = 0; i < items.length; i += 5) {
        const items_sliced = items.slice(i, i + 5)

        await Promise.all(
            items_sliced.map(async item => {
                const locationInfo = await getLocationInfo(item);
                if (locationInfo['is_valid'] == false) {
                    return Promise.resolve();
                }
                mapData.push({
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
                })
            })
        )
    }
    return mapData;
}

export const getSurroundingData = async (mapData) =>{
    let surroundingData = [];
    for (let i = 0; i < mapData.length; i += 3) {
        const items_sliced = mapData.slice(i, i + 3)
        await Promise.all(
            items_sliced
                .map(async item => {
                    const surrounding = await surround.isSatisfy(item['x'], item['y']);
                    surroundingData.push({
                        ...item,
                        surrounding
                    })
                })
        )
    }
    return surroundingData;
}