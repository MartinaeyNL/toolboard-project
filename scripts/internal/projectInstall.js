const {createSpinner} = require("../utils/nanospinner");
const {executeCmd} = require("../utils/executor");

/* -------------------------------------------- */

async function run() {

    // Log current directory
    console.log("Running 'projectInstall' in [" + process.cwd() + "]");

    // Yarn dependencies
    let spinner = createSpinner("Installing yarn dependencies").start();
    await executeCmd("yarn install", [], process.cwd(), false)
    spinner.success();

    // Go dependencies
    spinner = createSpinner("Preparing Go project").start()
    await executeCmd("go install", [], (process.cwd() + "/backend/apps/http-server/api"), false)
    await executeCmd("go install", [], (process.cwd() + "/frontend/apps/desktop"), false)
    spinner.success();

    console.log("Done!")
}


/* ----------------------------------------------------- */

try {
    run();
} catch (err) {
    console.error(err);
}