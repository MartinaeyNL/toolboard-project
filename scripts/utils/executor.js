const { spawn } = require("node:child_process");

async function executeCmd(command, args, cwd, doLogging) {
    const ls = spawn(command, args, { cwd: cwd, shell: true })
    if(doLogging) {
        ls.stdout.pipe(process.stdout);
    }
    for await (const data of ls.stdout) {}
}

module.exports = {
    executeCmd: executeCmd
}