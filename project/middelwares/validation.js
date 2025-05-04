const valdtion = (schema)=>{

    return (req,res,next)=>{
        let  validat = schema.validate({...req.body,...req.params},{abortEarly:false})
        if(validat.error){
            res.status(400).json({status:"Failed",message:validat.error.details[0].message})
          }else{
            next()
          }
    }

}

module.exports = valdtion