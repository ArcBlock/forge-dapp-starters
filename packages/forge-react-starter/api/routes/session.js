module.exports = {
  init(app) {
    app.get('/api/session', (req, res) => {
      res.json({ user: req.user });
    });

    app.post('/api/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });
  },
};
