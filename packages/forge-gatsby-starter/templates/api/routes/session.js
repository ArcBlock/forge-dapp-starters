const ForgeSDK = require('@arcblock/forge-sdk');

module.exports = {
  init(app) {
    app.get('/api/session', async (req, res) => {
      const { getForgeState: data } = await ForgeSDK.doRawQuery(`{
          getForgeState {
            code
            state {
              token {
                decimal
                description
                icon
                inflationRate
                initialSupply
                name
                symbol
                totalSupply
                unit
              }
            }
          }
        }`);
      res.json({ user: req.user, token: data.state.token });
    });

    app.post('/api/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });
  },
};
