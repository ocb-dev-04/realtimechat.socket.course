const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    online : {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
   const {__v, _id, password, ...publicProps} = this.toObject();
   publicProps.uid = _id; 
   return publicProps;
}

module.exports = model('User', UserSchema);