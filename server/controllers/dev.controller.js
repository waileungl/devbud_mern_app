const Dev = require('../models/dev.model');

// Login JWT authentication
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const JWT_SECRET = uuid()

//import Bcrypt
const bcrypt = require("bcryptjs")

// generate file component
const { generateFile } = require('./generateFile');
const { executeJava } = require('./executeJava');
const { deleteFile } = require('./deleteFile');

// READ ALL
module.exports.findAllDevs = (req, res) => {
  // use the model to execute a query
  Dev.find()
    .then((allDevs) => {
      // IMPORTANT what we return here is what we will receive in REACT!
      for(let i = 0; i < allDevs.length; i++){
        allDevs[i].password = "Stop trying to hack this website!"
      }
      res.json(allDevs); // returns an []
    })
    .catch((err) =>
      res.json({ message: 'fail to find all devs', serverError: err })
    );
};

// FIND ONE
module.exports.findOneDev = (req, res) => {
  Dev.findOne({ _id: req.params.id })
    .then((oneDev) => res.json({ dev: oneDev }))
    .catch((err) => res.json({ message: 'fail to find one dev', error: err }));
};

// FIND ALL BY LANGUAGE
module.exports.findDevsByLanguage = (req, res) => {
  Dev.find({ [req.params.language]: true })
  .then((devs) => {
    // console.log(`all developer with ${req.params.language} is here`, devs);
    res.json(devs)
  })
  .catch((err) => res.json({ message: 'fail to find devs by language', error: err }));
} 


// Registration
module.exports.createDev = async (req, res) => {
  // console.log("register request received", req.body);
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)
  const newDevUser = {
    email: req.body.email,
    password: encryptedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePic: req.body.profilePic,
    education: req.body.education,
    yearsOfExp: req.body.yearsOfExp,
    bio: req.body.bio,
    javaScript: req.body.javaScript,
    python: req.body.python,
    java: req.body.java,
  }
  Dev.create(newDevUser)
    .then((newlyCreatedDev) => res.json({
      dev: {
        firstName: newlyCreatedDev.firstName,
        lastName: newlyCreatedDev.lastName,
        profilePic: newlyCreatedDev.profilePic,
        education: newlyCreatedDev.education,
        yearsOfExp: newlyCreatedDev.yearsOfExp,
        bio: newlyCreatedDev.bio,
        javaScript: newlyCreatedDev.javaScript,
        python: newlyCreatedDev.python,
        java: newlyCreatedDev.java,
        createdAt: newlyCreatedDev.createdAt,
        updatedAt: newlyCreatedDev.updatedAt,
        _id: newlyCreatedDev._id
      }
    }))
    .catch((err) => res.json({ message: 'fail to create new user', error: err }));
};

// Email Validation
module.exports.emailValidation = (req, res) => {
  Dev.findOne(req.body)
    .then(result => {
      if (result === null) {
        res.status(200).send({ exist: false });
      } else {
        res.status(200).send({ exist: true });
      }
    })
    .catch((err) => console.log("emaill validation error", err));
}

// User login
module.exports.loginOneDev = async (req, res) => {
  const { email, password } = req.body;

  //Email Validation
  const loginDev = await Dev.findOne({ email: email });
  if (!loginDev) {
    console.log("no such user");
    return res.json({ error: "Invalid email or password" })
  }

  //Bcrypted password validation
  if (await bcrypt.compare(password, loginDev.password)) {
    const token = jwt.sign({}, JWT_SECRET)
    if (res.status(201)) {
      console.log("Login success!")
      return res.json({ status: "ok", token: token, userId: loginDev._id, userName: loginDev.firstName })
    } else {
      return res.json({ error: "error", data: token })
    }
  }
  res.json({
    error: "Invalid email or password"
  })
}

// UPDATE
module.exports.updateExistingDev = (req, res) => {
  Dev.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedDev) => {
      res.json({ dev: updatedDev });
    })
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

// DELETE
module.exports.deleteDev = (req, res) => {
  Dev.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

//For compiling
const errorHandler = (error) => {
  err = String(error.error);
  // let hiddenStart = "";
  // let hiddenEnd = "";
  // for (let i = 0; i < err.length; i++) {
  //     if (err[i] == "F" && err[i + 1] == "i" && err[i + 2] == "l" && err[i + 3] == "e") {
  //         hiddenStart = i
  //     } else if (err[i] == "," && err[i + 2] == "l" && err[i + 3] == "i" && err[i + 4] == "n") {
  //         hiddenEnd = i + 1
  //     }
  // }
  // errMessege = err.replace(err.substring(hiddenStart, hiddenEnd), "");
  return err;
};

// COMPILE (CREATE)
module.exports.compileDev = async (req, res) => {
  const language = req.body.language;
  const code = req.body.codeToServer;
  console.log(
    `Reciving post request from client, language: ${language}, code: ${code}`
  );
  // prevent empty code send by user
  if (code === undefined) {
    console.log('The code from client is empty');
    return res.status(400).json({
      success: false,
      error: 'Your code is empty!',
    });
  }
  try {
    // generate the specific language compiler file
    console.log('entering the generate file function...');
    var filepath = await generateFile(language, code);
    console.log(
      'the compiler file generation is completed! Next is to execute the code'
    );
    // execute the compile file from the filepath
    const output = await executeJava(filepath, language);
    console.log(
      'the compiler file is executed! Next is to delete the compiler file'
    );
    await deleteFile(filepath);

    return res.json({ output });
  } catch (err) {
    console.log(
      'OOP! There is error, Your compiler file is not even generated'
    );
    await deleteFile(filepath);
    const error = errorHandler(await err);
    res.json({ error });
  }
};
