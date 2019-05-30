/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const { User } = require('../../models');
const { login } = require('../../libs/jwt');

const description = {
  en: 'Sign this transaction to receive 25 TBA for test purpose',
  zh: '签名该交易，你将获得 25 个测试用的 TBA',
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
        console.log('new user', did, JSON.stringify(profile));
        exist.name = profile.fullName;
        exist.email = profile.email;
        exist.mobile = profile.mobile;
        await exist.save();
      } else {
        console.log('exist user', did, JSON.stringify(profile));
        const user = new User({
          did,
          name: profile.fullName,
          email: profile.email,
          mobile: profile.phone,
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
