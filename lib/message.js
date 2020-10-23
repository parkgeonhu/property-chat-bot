import * as hashtagJson from '../data/hastags.json'

const getHashtags = (apt) => {
    const hashtags = [];
    for (const [key, value] of Object.entries(hashtagJson)) {
        const hashtagList = value["list"]
        console.log(key)
        if (apt[key] == true) {
            hashtags.push(hashtagList[0])
        }
    }
    return hashtags
}

const getLandNaverLink = (x, y) => {
    return `https://new.land.naver.com/complexes?ms=${y},${x}&a=APT:JGC:ABYG&e=RETAIL`
}

export const setLandAndTagOnMsg = (apts) => {
    const refinedApts = apts.map(apt => {
        const tags = getHashtags(apt)
        const landLink = getLandNaverLink(apt['x'], apt['y'])
        return {
            ...apt,
            tags,
            "land_link": landLink
        }
    })

    return refinedApts
}

const getSalesReadable = (sales) => {
    return sales.map(sale => {
        return `\n거래유형 : ${sale['deal_type']}\n보증금 : ${sale['deposit']}\n월세 : ${sale['monthly_rent']}\n`
    })
}

export const getBaseMsg = (apts) => {
    const refinedApts = setLandAndTagOnMsg(apts)
    const aptsInfo = refinedApts.map(apt => {
        return {
            "name": apt['name'],
            "address": apt['address'],
            "hashtag": apt['tags'],
            "land_link": apt['land_link'],
            "sales": getSalesReadable(apt['Sales'])
        }
    })
    const msg = {
        "title": "요청하신 조건의 매물입니다.",
        "apts": aptsInfo
    }
    return msg
}

const listToStr = (list) => {
    let str = ""
    for (let entry of list) {
        str += entry + " "
    }
    return str;
}


const getAptsMsg = (apts) => {
    let msg = "";
    for (let apt of apts) {
        const hashtag = listToStr(apt['hashtag'])
        const sales = listToStr(apt['sales'])
        msg += `[${apt['name']}]\n` +
            `주소 : ${apt['address']}\n` +
            `매물 주소 : ${apt['land_link']}\n` +
            `${hashtag}\n`+
            "[지난달 거래 내역]"+
            `${sales}\n\n`
    }
    return msg;
}

export const getKakaoSimpleMsg = (baseMsg) => {
    const msg = `${baseMsg['title']}\n` + getAptsMsg(baseMsg['apts'])
    return {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": msg
                    }
                }
            ]
        }
    }
}

export const getKakaoMsg = (msg) => {

}