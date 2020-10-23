import {getTransitDirection,getDrivingDirection,getWalkingDirection} from '../direction'

export const getDrivingDuration = async (sx, sy, dx, dy) => {
    const direction = await getDrivingDirection(sx, sy, dx, dy)
    console.log(direction)
    const duration = direction.route.traoptimal[0].summary.duration/60000
    return duration 
};

export const getTransitDuration = async (sx, sy, dx, dy) => {
    const direction = await getTransitDirection(sx, sy, dx, dy)
    console.log(direction)
    const duration = direction.routes[0].legs[0].duration.value/60
    return duration
};