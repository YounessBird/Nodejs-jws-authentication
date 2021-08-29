const Joi= require('joi')

const registerValidation=(data)=>{
    const schema={
        name:Joi.string().min(4).required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(5)
    }
  return  Joi.validate(data,schema)  
}
const loginValidation=(data)=>{
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().required().min(5)
    }
  return  Joi.validate(data,schema)  
}

module.exports.RegisterValidation=registerValidation
module.exports.loginValidation=loginValidation



