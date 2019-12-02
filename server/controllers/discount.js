import Discount from '../models/discount';
import User from '../models/user';

const Email = require('email-templates');

const sendDiscountCode = async ctx => {
  try {
    const { body } = ctx.request;
    const user = User.findById(body.userId);
    const discounts = await Discount.find({}, (res, dis) => {
      let disMap = {};
      dis.forEach((item) => {
        disMap[item._id] = item;
      })
      return disMap;
    });

    const code = discounts[0].code;

    const email = new Email({
      message: {
        from: 'tgoldsack1@gmail.com',
        transport: {
          jsonTransport: true
        },
        textOnly: true,
        text: `Hey! Here is your discount code: ${code}`
      }
    });
  
    email.send({
      template: '',
      message: {
        to: 'tgoldsack1@gmail.com'
      },
    })
    .then(console.log)
    .catch(console.error);

    ctx.status = 200;
  } catch(err) {
    ctx.throw(500);
    console.error(err)
  }
}

/**
 * Get all discounts
 * @param {ctx} Koa Context
 */
const getAll = async ctx => {
  try {
    const discounts = await Discount.find({}, (res, dis) => {
      let disMap = {};
      dis.forEach((item) => {
        disMap[item._id] = item;
      })
      return disMap;
    });

    ctx.body = discounts;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
    console.error(err)
  }
};

export default { sendDiscountCode, getAll };