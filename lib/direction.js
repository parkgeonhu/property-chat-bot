import axios from 'axios';
import * as apiKey from '../config/api.config.json'

export const getTransitDirection = async (sx, sy, dx, dy) => {

    let res;
    try {
        res = await axios({
            url: 'https://maps.googleapis.com/maps/api/directions/json?' +
                'origin=' + `${sy},${sx}` +
                '&destination=' + `${dy},${dx}` +
                '&mode=transit' +
                '&key=' + apiKey['gcpKey']
            ,
            method: 'GET',
        });
        const duration = res.data.routes[0].legs[0].duration.value/60
    } catch (err) {
        console.log('https://maps.googleapis.com/maps/api/directions/json?' +
            'origin=' + `${sy},${sx}` +
            '&destination=' + `${dy},${dx}`+
            '&mode=transit' +
            '&key=' + apiKey['gcpKey']
            )
    }
    return res.data
};

export const getDrivingDirection = async (sx, sy, dx, dy) => {
    console.log('https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?' +
        'start=' + `${sy},${sx}` +
        '&goal=' + `${dy},${dx}`)
    const res = await axios({
        url: 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?' +
            'start=' + `${sx},${sy}` +
            '&goal=' + `${dx},${dy}`
        ,
        method: 'GET',
        headers: {
            'X-NCP-APIGW-API-KEY-ID': apiKey['ncp']['api_key_id'],
            'X-NCP-APIGW-API-KEY': apiKey['ncp']['api_key'],
        },
    });
    return res.data
};

export const getWalkingDirection = async (payload) => {
    const res = await axios({
        url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json'
        ,
        method: 'POST',
        data: {
            "appKey": apiKey['tmapKey'],
            "startX": "126.97871544",
            "startY": "37.56689860",
            "endX": "127.00160213",
            "endY": "37.57081522",
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857"
        }
    });
    return res.data
};