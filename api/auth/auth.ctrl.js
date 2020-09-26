import db from '../../models'
import createToken from '../../lib/createToken';
import {HttpError} from "../../lib/errorHandler";

export const sample = async (ctx) => {
    //contact의 모든 row 반출
    const contacts = await db.Contact.findAll();
    console.log(ctx.user);
    ctx.body = contacts;
};

export const sample1 = async (ctx) => {
    ctx.body = {"task":"sample","status" : "success"};
};


export const login = async ctx => {
    const { phone, password } = ctx.request.body;

    // username, password 가 없으면 에러 처리
    if (!phone || !password) {
        throw(new HttpError(401, '계정이 존재하지 않거나 패스워드가 일치하지 않습니다.'));
    }

    const user = await db.User.findOne({ where : { phone } });
    // 계정이 존재하지 않으면 에러 처리
    if (user === null) {
        throw(new HttpError(401, '계정이 존재하지 않거나 패스워드가 일치하지 않습니다.'));
    }
    //const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    // if (!valid) {
    //     ctx.status = 401;
    //     return;
    // }
    const token = createToken(phone);

    ctx.body = {
        token
    }
    // ctx.cookies.set('access_token', token, {
    //     maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    //     httpOnly: true,
    // });

};

export const forUser = async ctx => {
    ctx.body = ctx.state.user
};