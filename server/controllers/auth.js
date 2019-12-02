import User from '../models/user';
import bcrypt from 'bcryptjs';

const login = async ctx => {
  try {
    const { body } = ctx.request;
    console.log('BODY: ', body);

    const user = await User.findOne({ email: body.email.toLowerCase() })
      .exec();
    if (!user) {
      ctx.status = 500;
      ctx.body = 'No user found';
    }
    const auth = await bcrypt.compare(body.password, user.password);

    if (auth) {
      const retObj = {
        userId: user._id,
        email: user.email,
        basket: user.basket,
      };
      ctx.body = {
        user: retObj,
      };
      ctx.status = 200;
    }
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
};

const register = async ctx => {
  try {
    const { body } = ctx.request;
    console.log(body);

    await new User(body).save();
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(500);
  }
};

export default { login, register };
