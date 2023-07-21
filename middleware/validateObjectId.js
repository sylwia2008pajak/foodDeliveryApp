const { default: mongoose } = require('mongoose');

function validateObjectId(id) {
    try {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        console.log('Valid Id: ', isValid);
        return isValid;
    } catch (err) {
        console.error('Error validating objectId: ', err);
        throw err;
    }
}

module.exports = validateObjectId;