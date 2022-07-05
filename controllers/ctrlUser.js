const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy
//import { parseError, sessionizeUser } from "../util/helpers";
//const passport = require('../passport');



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

            req.session.user = newUser;
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
  const parseError = err => {
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  };

   const sessionizeUser = user => {
    return { userId: user.id, username: user.username };
  }

  const { username, password } = req.body
  let error=""
  let pincho= false;
  req.session.success = true;

  const userId = User.findOne({ username: username }, (err, user) => {
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
  console.log("error: "+error)
  const sessionUser = sessionizeUser({userId, username});
  req.session.user = sessionUser;
  console.log(req.session)
  res.send(sessionUser);

  //var userInfo = {username: username};
  //console.log("username "+username)
  //req.session.user = username
  //req.session.userid=username;
  //res.send(userInfo);
}




postLogout = (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
}

getHome1 = ({ session: { user }}, res) => {
  console.log("buzina user: "+user)
  res.send({ user });
};

getHome = (req, res, next) => {

    console.log("La req.user en el getHome: " + req.user)
    console.log("La req.session en el getHome: " + req.session.user)

    if (req.session) {
        res.json({ user: req.session.user })
    } else {
        res.json({ user: null })
    }
    next()
}



module.exports = {
    getLogin,
    getRegister,
    postLogout,
    postRegister,
    getHome,
}
