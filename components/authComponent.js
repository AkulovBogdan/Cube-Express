module.exports = {
    checkAuth: function (req, res, next) {
      if (req.session.isLoggedIn) 
      {
        return next();
      }
      else 
      {
        res.status(401);
        res.render('auth', {
            username: '',
            errorMessage: ''
        });
      }
    }
  }