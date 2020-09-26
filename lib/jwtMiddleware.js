import jwt from 'jsonwebtoken';
import User from '../models/user';
import {HttpError} from "../../lib/errorHandler";


const jwtMiddleware = async (ctx, next) => {
  const token = ctx.request.headers['authorization'] ?
      ctx.request.headers['authorization'].replace('Bearer ', '') :
      null;

  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      phone : decoded.phone
    };
    // 토큰 3.5일 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 7) {
      const user = await db.User.find({
        where: {phone : decoded.phone},
      });
      const token = user.generateToken();
      // ctx.cookies.set('access_token', token, {
      //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      //   httpOnly: true,
      // });
      throw(new HttpError(401, token))
    }

    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;