const joi= require("joi")
let registersvem = joi.object({
    username:joi.string().required(),
    password:joi.string().required(),
    firstname:joi.string(),
    lastname:joi.string(),
    email:joi.string().required().pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}){1,2}$/)),
    role:joi.string().valid("user","admin").default("user"),
  });

module.exports = registersvem;