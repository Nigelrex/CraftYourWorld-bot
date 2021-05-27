const ping = require("ping");
const log = require("log-to-file");
var hosts = ["https://CraftYourWorld-bot.nigelrex.repl.co"];
var myVar;

function cywbping() {
  var d = new Date();
  myVar = setInterval(bping, 300000);
  var hr = d.getHours();
  var mi = d.getMinutes();
  var sec = d.getSeconds();
  console.log("Time:" + hr + ":" + mi + ":" + sec);
  log("Time:" + hr + ":" + mi + ":" + sec);
}
function bping() {
  hosts.forEach(function (host) {
    ping.sys.probe(host, function (isAlive) {
      var d = new Date();
      var msg = isAlive ? host + " is up and running\n" : host + " is down\n";
      var hr = d.getHours();
      var mi = d.getMinutes();
      var sec = d.getSeconds();
      console.log("Time:" + hr + ":" + mi + ":" + sec + " Repl " + msg);
      log("Time:" + hr + ":" + mi + ":" + sec + " Repl " + msg, "console.log");
    });
  });
}

module.exports = cywbping;
