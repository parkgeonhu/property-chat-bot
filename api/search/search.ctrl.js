import db from '../../models'
const { Op } = require("sequelize");


export const index = async ctx => {
    const result = await db.Apt.findAll({
        where: {
            subway : true,
            '$Sales.bjd$': '월계동',
            '$Sales.deposit$': { [Op.gte]: 3000 }
        },
        include: [{
            model: db.Sale,
            as: 'Sales'
        }]
    })
    // .then(users => {
    //     console.log(JSON.stringify(users));
    // })

    ctx.status = 200;
    ctx.body = JSON.stringify(result)
}