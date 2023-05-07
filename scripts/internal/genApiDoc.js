const {createSpinner} = require("../utils/nanospinner");
const {executeCmd} = require("../utils/executor");

/* -------------------------------------------- */

async function run() {

    // Log current directory
    console.log("Running 'genApiDoc' in [" + process.cwd() + "]");

    // Yarn dependencies
    let spinner = createSpinner("Building Swagger API documentation").start();
    await executeCmd("swag init -o ./../../../docs/http-server/apidoc --dir ./,./../../utils/models", [], process.cwd() + "/backend/apps/http-server", false)
    spinner.success();

    // Go dependencies
    spinner = createSpinner("Creating JavaScript fetch client").start()
    await executeCmd("yarn workspace @toolboard/tb-api generate", [], process.cwd(), false)
    spinner.success();

    console.log("Done!")
}


/* ----------------------------------------------------- */

try {
    run();
} catch (err) {
    console.error(err);
}