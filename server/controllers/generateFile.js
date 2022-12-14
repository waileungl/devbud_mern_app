const fs = require('fs');
const path = require('path');
// the uuid version 4 is imported and renamed as uuid
const { v4: uuid } = require('uuid');

// __dirname give the path of this file
const dirCompiler = path.join(__dirname, "compiler");
// To ensure the compiler directory exist, if not, create it
if(!fs.existsSync(dirCompiler)){
    fs.mkdirSync(dirCompiler, { recursive:true });
}

const generateFile = async (format, code) => {
    var jobId = uuid();
    const filename = `${jobId}.${format}`
    const filepath = path.join(dirCompiler, filename);
    await fs.writeFileSync(filepath, code);
    return filepath;
}

module.exports = { generateFile };