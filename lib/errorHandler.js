export class HttpError {
    constructor(status, message) {
        this.message = message;
        this.status = status;
    }
}


const errorHandler = async (ctx, next) => {
    try{
        await next();
    }catch(e){
        console.log(e)
        ctx.status = !e.status ? 500 : e.status ;
        ctx.body = {error: e.message};
    }
}

export default errorHandler;