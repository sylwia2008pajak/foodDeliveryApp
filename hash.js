const bcrypt = require('bcrypt');

async function run(){
    try {
        const salt = await bcrypt.genSalt(10); //number of rounds
        const hashed = await bcrypt.hash('1234', salt);
        console.log(salt);
        console.log(hashed);
    } catch (err) {
        console.error('Error occured: ', err);
        throw err;
    }
};

run();
