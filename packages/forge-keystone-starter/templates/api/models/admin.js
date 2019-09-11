const keystone = require('keystone');

const types = keystone.Field.Types;

const Admin = new keystone.List('Admin', {
  label: '账号',
  plural: '账号',
  track: true,
  schema: { collection: 'admins' },
});

Admin.add(
  {
    name: { type: types.Name, required: true, index: true },
    email: {
      type: types.Email,
      initial: true,
      required: true,
      unique: true,
      index: true,
    },
    password: { type: types.Password, initial: true, required: true },
  },
  '权限',
  {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
  }
);

Admin.schema.virtual('canAccessKeystone').get(function checkAdmin() {
  return this.isAdmin;
});

Admin.defaultColumns = 'name, email, isAdmin, createdAt, updatedAt';
Admin.register();
