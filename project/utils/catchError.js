function catchErorr(func){
    
    return (req,res,next)=>{
        func(req,res,next).catch(next);
    };
}


module.exports = catchErorr;