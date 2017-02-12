var ModeDevice = require('mode-device');

var DEVICE_ID = 0;
var API_KEY = '';

if (DEVICE_ID == 0) {
  throw("Please set DEVICE_ID");
}
if (API_KEY.length == 0) {
  throw("Please set API_KEY");
}

//
// Output debug message
//
ModeDevice.debug = true;

var device = new ModeDevice(DEVICE_ID, API_KEY);

//
// Send first event to Mode cloud.
//

var id;
device.commandCallback = function(msg, flags) {
  console.log(msg);
  if (msg.action == 'start') {
    id = setInterval(sendData, 5000);
  } else if (msg.action == 'stop') {
    clearInterval(id);
  }
}

function sendData() {
  device.triggerEvent('data', {'value': Math.random()*100.0});
}

device.listenCommands();
