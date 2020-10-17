import axios from 'axios';
const apiKey = require(__dirname + '/../../config/api.config.json');

export const getCategoryInfo = async (category_group_code, radius, x, y) => {
    const res = await axios({
        url: 'https://dapi.kakao.com/v2/local/search/category.json?' +
        'category_group_code=' + encodeURI(category_group_code) +
        '&radius=' + radius +
        '&x=' + x +
        '&y=' + y
        ,
        method: 'GET',
        headers:{
            'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
        },
    });

    return res.data
    
    //return res.data.meta.total_count
};


export const getKeywordInfo = async (keyword) => {
    const res = await axios({
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json?'+
        'query='+ encodeURI(keyword)
        ,
        method: 'GET',
        headers:{
            'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
        },
    });
    return res.data
};

export const getKeywordInfoByNear = async (keyword, radius, x, y) => {
    const res = await axios({
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json?'+
        'query='+ encodeURI(keyword)+
        '&radius=' + radius +
        '&x=' + x +
        '&y=' + y
        ,
        method: 'GET',
        headers:{
            'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
        },
    });
    return res.data
};

// export const getKeywordInfo = async (keyword) => {
//     const res = await axios({
//         url: 'https://dapi.kakao.com/v2/local/search/keyword.json?'+
//         'query='+ encodeURI(keyword)
//         ,
//         method: 'GET',
//         headers:{
//             'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
//         },
//     });
//     return res.data
// };


export const getAddressInfo = async (address) => {
    const res = await axios({
        url: 'https://dapi.kakao.com/v2/local/search/address.json?'+
        'query='+ encodeURI(address)
        ,
        method: 'GET',
        headers:{
            'Authorization': 'KakaoAK ' + apiKey['kakaoKey'],
        },
    });
    return res.data
};
