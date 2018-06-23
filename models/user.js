const mongoose = require('mongoose');
//define a schema
//define the shape of the documents within the MongoDB collection.
const schema = mongoose.Schema;
const bcrypt  = require('bcryptjs');
const userSchema = new schema({

    username:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}

});

//create a model mongoose.model(modelName, schema)
//export it to be accessed by other files.
module.exports = mongoose.model("User",userSchema);

//define a saveUser function which is available in other files.
module.exports.saveUser = function (newUser,callback) {
//hash the password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;

            if (err) throw err;
            newUser.save(callback);
        });
    });

};
//define a findByEmail function
module.exports.findByEmail = function (email,callback) {
    //
    const query = {email:email};
    User.findOne(query,callback);


};
//define a password checking function
module.exports.passwordCheck = function (plainpassword,hash,callback) {

    bcrypt.compare(plainpassword, hash, function(err, res) {
            if(err) throw  err;

            if (res){
                callback(null,res);
            } else{
                callback(null,false)
            }
    });
};
// define a function which find a user by id
module.exports.findUserbyId = function (id,callback) {

    User.findOne(id,callback);
};
