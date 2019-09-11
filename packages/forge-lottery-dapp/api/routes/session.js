const ForgeSDK = require('@arcblock/forge-sdk');

module.exports = {
  init(app) {
    app.get('/api/session', async (req, res) => {
      const { state } = await ForgeSDK.getForgeState(
        {},
        { ignoreFields: ['state.protocols', /\.txConfig$/, /\.gas$/] }
      );
      res.json({ user: req.user, token: state.token });
    });

    app.post('/api/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });
  },
};
