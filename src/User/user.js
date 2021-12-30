const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const salRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.methods.isCorrectPassword = function (password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);