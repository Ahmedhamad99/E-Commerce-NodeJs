const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        firstname:{
            type:String,
            minLength:3,
            maxLength:30
        },
        lastname:{
            type:String,
            minLength:3,
            maxLength:23
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator:function(email){
                    return /^[a-zA-Z]{3,10}[0-9]{0,4}(@)(gmail|yahoo||outlook)(.com)$/.test(email)
                },
                message:(obj)=>`${obj.value} is not correct`
            }
        },
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        image:{
            type:String,
            required:false
        },
        role:{
            type:String,
            enum:["user","admin","seller"],
            default:"user"
        },
        resetPasswordToken: {
            type: String,
          }
        ,
        cart:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            default:[]
        }],
     
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
        orders:[{

            type:mongoose.Schema.Types.ObjectId,
            ref:"Order",
            default:[]
        }],
    },
    {Collection:"User",
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
    let salt = await bcrypt.genSalt(10)
    let hashPassword = await bcrypt.hash(this.password,salt)
    this.password = hashPassword
    next()
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel