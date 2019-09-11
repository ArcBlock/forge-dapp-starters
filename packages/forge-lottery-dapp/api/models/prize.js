const keystone = require('keystone');
const types = keystone.Field.Types;

const storage = require('../libs/storage');

const Prize = new keystone.List('Prize', {
  label: '奖品',
  plural: '奖品',
  track: true,
  noedit: true,
  nodelete: true,
  searchFields: 'did name email',
  defaultSort: '-createdAt',
  schema: { collection: 'prizes' },
});

Prize.add({
  lottery: {
    type: types.Relationship,
    ref: 'Lottery',
    size: 'small',
    label: '所属抽奖',
    index: true,
    required: true,
    initial: true,
  },
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
  cover: {
    type: types.File,
    label: '封面图片',
    storage,
  },
  totalCount: {
    type: types.Number,
    label: '奖品数量',
    required: true,
    initial: true,
  },
  winnerCount: {
    type: types.Number,
    label: '已抽数量',
    default: 0,
  },
  claimedCount: {
    type: types.Number,
    label: '已领数量',
    default: 0,
  },
});

Prize.defaultColumns = 'lottery, name, description, cover, totalCount, winnerCount, claimedCount, createdAt, updatedAt';
Prize.register();
