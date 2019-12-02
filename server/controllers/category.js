import Category from '../models/category';

/**
 * Get all categories
 * @param {ctx} Koa Context
 */
const getAll = async ctx => {
  try {
    const categories = await Category.find({}, (res, cats) => {
      let catMap = {};
      cats.forEach((cat) => {
        catMap[cat._id] = cat;
      })
      return catMap;
    });

    ctx.body = categories;
    ctx.status = 200;
  } catch (err) { 
    console.error(err)
  }
};

const create = async ctx => {
  try {
    const { body } = ctx.request;

    await new Category(body).save();
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
}

export default {
  getAll,
  create,
};