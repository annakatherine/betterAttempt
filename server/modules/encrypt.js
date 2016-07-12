var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;

var publicAPI = {
  encryptPassword: function( password ){
    var sal = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    console.log( 'sal' );
    return bcrypt.hashSync(password, sal);
  },

  comparePassword: function( candidatePassword, storedPassword ){
    console.log( 'compare candidate and stored passwords in encrypt.js' );
    return bcrypt.compareSync(candidatePassword, storedPassword);
    }
};
module.exports = publicAPI;
