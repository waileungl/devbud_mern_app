const fs = require('fs');
const path = require('path');

const deleteFile = async (filepath) => {
    console.log("file is run and deleted!");
    try {
        fs.unlinkSync(filepath)
        //file removed
    } catch (err) {
        console.log(err);
    }
    return
}

module.exports = { deleteFile };