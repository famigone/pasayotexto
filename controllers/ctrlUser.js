const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy
const passport = require('../passport');
postRegister = (req, res) => {
    console.log(req.body);

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
}

getLogin1 = (req, res, next)=> {
      console.log(req.body)
      next()
  }

getLogin =  (req, res, next) => {
  const { username, password } = req.body
  let error=""
  let pincho= false;
  req.session.success = true;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      req.session.success = false;
      error = err
    }
    if (!user) {
      req.session.success = false;
      error= 'Incorrect username'
    }
    if (!user.checkPassword(password)) {
      req.session.success = false;
      error = 'Incorrect password'
    }
  })
  var userInfo = {
      username: username,
  };
  //console.log("username "+username)
  req.session.user = username
  //req.session.userid=username;

  res.send(userInfo);
}




postLogout = (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
}

getHome = (req, res, next) => {

    console.log("La req.user en el getHome: " + req.user)
    console.log("La req.session en el getHome: " + req.session.user)
    console.log("La req.session.passport.user en el getHome: " + req.session.passport)
    if (req.session.user) {
        res.json({ user: req.session.user })
    } else {
        res.json({ user: null })
    }
}



module.exports = {
    getLogin,
    getRegister,
    postLogout,
    postRegister,
    getHome,
}
