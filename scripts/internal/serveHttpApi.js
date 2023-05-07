const {createSpinner} = require("../utils/nanospinner");
const {executeCmd} = require("../utils/executor");

/* -------------------------------------------- */

async function run() {

    // Log current directory
    console.log("Running 'http-server-only' in [" + process.cwd() + "]");

    // Yarn dependencies
    let spinner = createSpinner("Starting Go HTTP Server...").start();
    await executeCmd("go run .", [], process.cwd() + "/backend/scripts/http-server-only", false)
    spinner.success();

    console.log("Done!");
}


/* ----------------------------------------------------- */

try {
    run();
} catch (err) {
    console.error(err);
}