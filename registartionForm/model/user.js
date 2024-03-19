const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema01 = Schema({
    id:{type:String},
    firstName: { type: String },
    lastName: { type: String },
    email:{type: String },
    phone:{type: String },
    username:{type:String},
    DOB:{type: String },
    age:{type: String },
    

}
);
var userschema = mongoose.model("userSchema", usersSchema01);
module.exports = userschema;
