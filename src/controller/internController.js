const internModel = require("../models/internModel");
const evalidator = require("validator");
const valid = require("../validation/validation")
const mongoose = require('mongoose')
 const ObjectId = mongoose.Types.ObjectId;

const intern = async function (req, res) {
  try {
    let internData = req.body;
    const {name , email, mobile , collegeId} = req.body 
    


    if (Object.keys(internData).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should  be not Empty.. " });
    }

    if (!valid.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Name field is mandatory" });
    }
    if (!valid.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Email field is mandatory" });
    }
    if (!valid.isValid(mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Mobile field is mandatory" });
    }
  

    if (!valid.isValid(collegeId)) {
      return res
        .status(400)
        .send({ status: false, msg: "CollegeId field is mandatory" });
    }


    let Id = collegeId
    if(Id.length != 24){
      return res.status(400).send({status:false,msg: "invalid College Id."}) }



    if (!valid.reg(name))
      return res
        .status(400)
        .send({ status: false, msg: "Please Use Alphabets in name" });


    let reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(mobile);

    if (!reg) {
      return res
        .status(400)
        .send({ status: false, msg: "invalid phone number" });
    }

   let duplicateEmail = await internModel.findOne({ email: email });

    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "Email Already Exist." });
    }

   let duplicatePhone = await internModel.findOne({ mobile: mobile });

    if (duplicatePhone) {
      return res
        .status(400)
        .send({ status: false, msg: "Phone Number Already Exist." });
    }
    let validate = evalidator.isEmail(email);
    if (!validate) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "You have entered an invalid email address!",
        });
    }

    let result = await internModel.create(internData);
    res.status(201).send({ status: true, Data: result });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  intern: intern,
};
