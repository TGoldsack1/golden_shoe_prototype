import Product from '../models/product';

const url = require('url');

/**
 * Get all products
 * @param {ctx} Koa Context
 */
const getAll = async ctx => {
  try {
    const products = await Product.find({}, (res, prods) => {
      let prodMap = {};
      prods.forEach((prod) => {
        prodMap[prod._id] = prod;
      })
      return prodMap;
    });

    ctx.body = products;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
    console.error(err)
  }
};

/**
 * Get a products
 * @param {ctx} Koa Context
 */
const get = async ctx => {
  try {
    const queryData = url.parse(ctx.request.url, true).query;
    const { productId } = queryData;
    const product = await Product.findOne({ _id: productId }).exec();

    ctx.body = product;
    ctx.status = 200;
  } catch (err) { 
    console.error(err)
  }
};



/**
 * Create product
 * @param {ctx} Koa Context
 */
const create = async ctx => {
  try {
    const { body } = ctx.request;

    await new Product(body).save();
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

export default {
  getAll,
  get,
  create,
};
