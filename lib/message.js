import * as hashtagJson from '../data/hastags.json'

const getHashtags = (apt) => {
    const hashtags = [];
    for(const [key, value] of Object.entries(hashtagJson)){
        const hashtagList= value["list"]
        console.log(hashtagList)
        if(apt[key]==true){
            hashtags.push(hashtagList[0])
        }
    }
    return hashtags
}

const getLandNaverLink = (x, y) => {
    return `https://new.land.naver.com/complexes?ms=${y},${x}&a=APT:JGC:ABYG&e=RETAIL`
}

export const setLandAndTagOnMsg = (apts) =>{
    const refinedApts = apts.map(apt=>{
        const tags = getHashtags(apt)
        const landLink = getLandNaverLink (apt['x'], apt['y']) 
        return {
            ...apt,
            tags,
            "land_link" : landLink
        }
    })

    return refinedApts
}

export const getBaseMsg = (apts) =>{
    const refinedApts = setLandAndTagOnMsg(apts)
    const aptsMsg = refinedApts.map(apt=>{
        return {
            "name" : apt['name'],
            "hashtag" : apt['tags'],
            "sales" : apt['Sales']
        }
    }) 
    const msg = {
        "title" : "요청하신 조건의 매물입니다.",
        aptsMsg
    }
    return msg
}

export const getKakaoSimpleMsg = (baseMsg) =>{

    return {

    }
}

export const getKakaoMsg = (msg) => {

}