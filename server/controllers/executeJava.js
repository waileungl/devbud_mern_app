const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
// const { stdout, stderr } = require("process");

// just for C++
// const outputPath = path.join(__dirname, "outputs");

// if(!fs.existsSync(outputPath)){
//     fs.mkdirSync(outputPath, { recursive:true });
// }

const executeJava = (filepath, language) => {
    // To compile C++, because there is one more extra compile file for C++ to execute
    // const outPath = path.join(outputPath, `${jobId}.`)
    
    // to extract out the file name shown below
    // D:\coding dojo\MERN Group Project\collaborative-leetcode-clone\server\compiler\87f31f59-06ee-44ea-9bb1-9e476f783ca7.java
    // const jobId = path.basename(filepath).split(".")[0]

    return new Promise((resolve, reject) => {
        if(language === "js") language = "node"
        exec(`${language} ${filepath}`, (error, stdout, stderr) => {
            // stderror is just the error in the terminal; stdout is the output code from the terminal
            if(error){
                reject({error, stderr});
            }
            if(stderr){
                reject({stderr});
            }
            resolve(stdout);
        })
    })
}

module.exports = { executeJava }