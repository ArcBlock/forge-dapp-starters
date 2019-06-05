const keystone = require('keystone');
const types = keystone.Field.Types;

const User = new keystone.List('User', {
  label: '用户',
  plural: '用户',
  track: true,
  noedit: true,
  nodelete: true,
  map: { name: 'did' },
  searchFields: 'did name email',
  defaultSort: '-createdAt',
  schema: { collection: 'users' },
});

User.add({
  did: {
    type: types.Text,
    label: '用户ID',
    required: true,
    initial: true,
  },
  name: { type: types.Text, label: '用户名', required: false },
  email: { type: types.Text, label: '手机号', required: false },
});

User.defaultColumns = 'did, name, email, createdAt, updatedAt';
User.register();
