const keystone = require('keystone');
const types = keystone.Field.Types;

const Winner = new keystone.List('Winner', {
  label: '中奖记录',
  plural: '中奖记录',
  track: true,
  noedit: true,
  nodelete: true,
  searchFields: 'did name email',
  defaultSort: '-createdAt',
  schema: { collection: 'winners' },
});

Winner.add({
  lottery: {
    type: types.Relationship,
    ref: 'Lottery',
    size: 'small',
    label: '所属抽奖',
    index: true,
    required: true,
    initial: true,
  },
  prize: {
    type: types.Relationship,
    ref: 'Prize',
    size: 'small',
    label: '所得奖项',
    index: true,
    required: true,
    initial: true,
  },
  winTxHash: {
    type: types.Text,
    label: '领奖交易Hash',
    default: '',
  },
  claimTxHash: {
    type: types.Number,
    label: '领取交易',
    default: '',
  },
  status: {
    type: types.Select,
    options: 'created, certified, claimed',
    label: '领取状态',
    default: 'created',
    index: true,
  },
});

Winner.defaultColumns = 'lottery, prize, status, winTxHash, claimTxHash, createdAt, updatedAt';
Winner.register();
