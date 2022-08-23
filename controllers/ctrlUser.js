const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");


postRegister = (req, res) => {

    console.log(req.body);
    const { username, password, mail } = req.body
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
                password: password,
                mail: mail
            })

            //req.session.user = newUser;
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
  //req.session.success = true;

  const userId = User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(404).send({ message: err });
    }
    if (!user) {
       return res.status(404).send({ message: "User Not found." });
    }
    if (!user.checkPassword(password)) {
      return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    }
    console.log("userId ",user.id)
    console.log("config.secret ",config.secret)
    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
           id: user.id,
           username: username,
           accessToken: token
         });
  })

  //const sessionUser = sessionizeUser({userId, username});
  //req.session.user = sessionUser;


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
    getHome

}
