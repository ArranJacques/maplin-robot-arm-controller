const readline = require('readline');
const Paplin = require('paplin');


process.stdin.setRawMode(true);


// Extract arguments.
let arguments = {};
process.argv.forEach(arg => {
    if (/^--/.test(arg)) {
        let argParts = arg.split('=');
        if (argParts.length === 2) {
            arguments[argParts[0].substr(2)] = argParts[1];
        }
    }
});

// Define custom values using the argument values.
const idVendor = arguments.idVendor ? parseInt(arguments.idVendor) : 4711;
const jointMovementGranularity = arguments.jmg ? parseInt(arguments.jmg) : 200;
const gripMovementGranularity = arguments.gmg ? parseInt(arguments.gmg) : 70;


/**
 * Kill the current process.
 */
function killProcess() {
    process.kill(process.pid, 'SIGINT');
}


// Open a connection to the robot arm.
console.log('connecting to robot arm...');
const Arm = new Paplin();
if (!Arm.openConnection(idVendor)) {
    console.error('\x1b[31m%s\x1b[0m ', 'unable to connect to robot arm');
    killProcess();
    return;
}
console.log('\x1b[32m%s\x1b[0m ', 'connected!');
console.log('use your keyboard to control the arm');
console.log('see README.md for key mappings');


/**
 * Make the arm perform an action.
 *
 * @param {string} name
 * @param {int} [time]
 */
function performAction(name, time) {
    Arm[name](time).then(() => {
    }).catch(err => {
        if (err.code !== 1) {
            console.error('\x1b[31m%s\x1b[0m ', 'error performing: ' + name);
        }
    });
}


// Bind event listener so that we can response to keypresses.
readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (str, key) => {

    // Close the connection.
    if (key.ctrl && key.name === 'c') {
        Arm.closeConnection();
        console.log('\x1b[33m%s\x1b[0m ', 'session ended');
        killProcess();
        return;
    }

    switch (key.name) {
        case 'up':
            performAction('moveShoulderUp', jointMovementGranularity);
            break;
        case 'down':
            performAction('moveShoulderDown', jointMovementGranularity);
            break;
        case 'left':
            performAction('moveShoulderCounterclockwise', jointMovementGranularity);
            break;
        case 'right':
            performAction('moveShoulderClockwise', jointMovementGranularity);
            break;
        case 'q':
            performAction('moveWristDown', jointMovementGranularity);
            break;
        case 'w':
            performAction('moveWristUp', jointMovementGranularity);
            break;
        case 'a':
            performAction('moveElbowDown', jointMovementGranularity);
            break;
        case 's':
            performAction('moveElbowUp', jointMovementGranularity);
            break;
        case 'o':
            performAction('openGrip', gripMovementGranularity);
            break;
        case 'p':
            performAction('closeGrip', gripMovementGranularity);
            break;
        case 'space':
            performAction(Arm.lightOn ? 'turnLightOff' : 'turnLightOn');
            break;
    }
});