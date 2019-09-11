const keystone = require('keystone');
const types = keystone.Field.Types;

const storage = require('../libs/storage');

const Lottery = new keystone.List('Lottery', {
  label: '抽奖',
  plural: '抽奖',
  track: true,
  noedit: true,
  nodelete: true,
  searchFields: 'name description',
  defaultSort: '-createdAt',
  schema: { collection: 'lotteries' },
});

Lottery.add({
  name: {
    type: types.Text,
    label: '名称',
    required: true,
    initial: true,
  },
  description: {
    type: types.Text,
    label: '描述',
    required: true,
    initial: true,
  },
  startTime: {
    type: types.Datetime,
    label: '开始时间',
    required: true,
    initial: true,
  },
  endTime: {
    type: types.Datetime,
    label: '结束时间',
    required: true,
    initial: true,
  },
  cover: {
    type: types.File,
    label: '封面图片',
    storage,
  },
});

Lottery.defaultColumns = 'name, description, startTime, endTime, cover, createdAt, updatedAt';
Lottery.register();
