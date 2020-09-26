import {HttpError} from "./errorHandler";

const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        throw(new HttpError(401, "Log in"));
        // ctx.status = 401; // Unauthorized
        return;
    }
    return next();
};
  
  export default checkLoggedIn;