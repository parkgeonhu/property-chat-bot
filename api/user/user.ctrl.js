import db from '../../models'
import {HttpError} from '../../lib/errorHandler';


export const userInformation = async ctx => {
    const {phone} = ctx.request.body;

    if (!phone) {
        console.log("내 정보 출력");
    }

    await db.User.find({
        where: {phone},
    });
};

export const register = async ctx => {
    const { phone, password, name, birthDate, army } = ctx.request.body;
    await db.User.findOrCreate({
        where: { phone },
        defaults: {
            phone,
            password: password,
            name,
            birthDate,
            isActive:true,
            isAdmin:false,
            army: (army === undefined) ? '육군' : army,
        }
    }).then((result) => {
        const [user, created] = result;
        if (created)
        {
            ctx.status = 201;
            ctx.body = user;
        }
        else
        {
            throw(new HttpError(400, "이미 사용자가 존재합니다."));
        }
    })
}