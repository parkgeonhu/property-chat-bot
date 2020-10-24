import { getTransitDirection, getDrivingDirection, getWalkingDirection } from '../direction'

export const getDrivingDuration = async (sx, sy, dx, dy) => {
    const direction = await getDrivingDirection(sx, sy, dx, dy)
    let duration;
    try {
        duration = direction.route.traoptimal[0].summary.duration / 60000
    } catch (err) {
        console.log("처리 안된 좌표 : ",sx, sy, dx, dy)
        duration = 0;
    }
    return duration
};

export const getTransitDuration = async (sx, sy, dx, dy) => {
    const direction = await getTransitDirection(sx, sy, dx, dy)
    let duration
    try {
        duration = direction.routes[0].legs[0].duration.value / 60
    }
    catch (err) {
        console.log("처리 안된 좌표 : ",sx, sy, dx, dy)
        duration = 0;
    }
    return duration
};