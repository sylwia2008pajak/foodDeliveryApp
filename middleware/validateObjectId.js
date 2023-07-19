const { default: mongoose } = require('mongoose');

function validateObjectId(id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log('Valid Id: ', isValid);
    return isValid;
}

module.exports = validateObjectId;