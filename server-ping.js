const ping = require("ping");

var hosts = ["https://CraftYourWorld-Bot.nigelrex.repl.co"];
var myVar;

function cywbping() {
  myVar = setInterval(bping, 300000);
}
function bping() {
  hosts.forEach(function (host) {
    ping.sys.probe(host, function (isAlive) {
      var msg = isAlive ? host + " is up and running\n" : host + " is down\n";
      console.log(msg);
    });
  });
}

module.exports = cywbping;
