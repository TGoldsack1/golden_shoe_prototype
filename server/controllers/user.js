import User from '../models/user';
import Product from '../models/product';


const url = require('url');


/**
 * Get total cost of user's basket
 * @param {ctx} Koa Context
 */
const getBasketTotal = async ctx => {
  try {
    const queryData = url.parse(ctx.request.url, true).query;
    const { userId } = queryData;
    const user = await User.findOne({ _id: userId }).exec();

    const basketTotal = await user.basket.reduce(async (total, id) => {
      const product = await Product.findById(id);
      return await total + product.price;
    }, 0);
    
    ctx.body = basketTotal;
    ctx.status = 200;
  } catch (err) { 
    console.error(err);
  }
};


/**
 * Add product to basket
 * @param {ctx} Koa Context
 */
const addToBasket = async ctx => {
  try {
    const { body: { userId, productId } } = ctx.request;
    const product = await Product.findById(productId);

    if (product.stock < 1) {
      ctx.throw(500);
    }

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          basket: productId,
        },
      },
      { new: true, upsert: true },
    ).exec();

    ctx.status = 200;
    ctx.body = updatedUser.basket;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

/**
 * Remove product from basket
 * @param {ctx} Koa Context
 */
const removeFromBasket = async ctx => {
  try {
    const { body: { userId, productId } } = ctx.request;

    const user = await User.findById(userId);

    const indexOf = user.basket.indexOf(productId);
    const copyBasket = user.basket;
    copyBasket.splice(indexOf, 1);
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          basket: copyBasket,
        },
      },
      { new: true, upsert: true },
    ).exec();

    ctx.body = updatedUser.basket;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

/**
 * Checkout basket
 * @param {ctx} Koa Context
 */
const checkout = async ctx => {
  try {
    const { body: { userId } } = ctx.request;
    const user = await User.findById(userId);
    
    await user.basket.map(async id => {
      await Product.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $inc: {
            stock: -1,
          },
        },
        { new: true, upsert: true },
      ).exec();
    });

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          basket: [],
        },
      },
      { new: true, upsert: true },
    ).exec();

    ctx.body = [];
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

/**
 * Clear basket
 * @param {ctx} Koa Context
 */
const clearBasket = async ctx => {
  try {
    const { body: { userId } } = ctx.request;

    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          basket: [],
        },
      },
      { new: true, upsert: true },
    ).exec();

    ctx.body = user.basket;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

export default {
  addToBasket,
  getBasketTotal,
  removeFromBasket,
  checkout,
  clearBasket,
}