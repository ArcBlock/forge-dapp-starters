/* eslint no-console:"off" */
const keystone = require('keystone');

const Admin = keystone.list('Admin').model;

module.exports = done => {
  const users = [
    {
      'name.first': 'admin',
      'name.last': '',
      email: 'keystone@starter.arcblock.io',
      password: 'admin',
      isAdmin: true,
    },
  ];

  // 4. insert source into target
  const tasks = users.map(
    info =>
      new Promise(resolve => {
        const user = new Admin(info);

        user.save(err => {
          (err ? console.error : console.log)(
            `insert user ${err ? 'failed' : 'success'}`,
            JSON.stringify({ info, err })
          );
          resolve(user);
        });
      })
  );

  Promise.all(tasks)
    .then(() => {
      console.log('user list initialize completed');
      done();
    })
    .catch(e => {
      console.error('user list initialize failed', e);
      done();
    });
};
