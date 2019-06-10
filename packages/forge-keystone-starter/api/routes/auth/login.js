/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const env = require('../../libs/env');
const { User } = require('../../models');
const { login } = require('../../libs/jwt');

const description = {
  en: `Login ${env.appName} with your ABT Wallet`,
  zh: `用 ABT 钱包登录 ${env.appName}`,
};

module.exports = {
  action: 'login',
  claims: {
    profile: ({ extraParams: { locale } }) => ({
      fields: ['fullName', 'email'],
      description: description[locale] || description.en,
    }),
  },
  onAuth: async ({ claims, did, token, storage }) => {
    try {
      const profile = claims.find(x => x.type === 'profile');
      const exist = await User.findOne({ did });
      if (exist) {
        console.log('update user', did, JSON.stringify(profile));
        exist.name = profile.fullName;
        exist.email = profile.email;
        await exist.save();
      } else {
        console.log('create user', did, JSON.stringify(profile));
        const user = new User({
          did,
          name: profile.fullName,
          email: profile.email,
        });
        await user.save();
      }

      // Generate new session token that client can save to localStorage
      const sessionToken = await login(did);
      await storage.update(token, { did, sessionToken });
      console.error('login.onAuth.login', { did, sessionToken });
    } catch (err) {
      console.error('login.onAuth.error', err);
    }
  },
};
