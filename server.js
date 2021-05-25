const express = require('express');
const server = express();
var ping = require('ping');
server.all('/', (req, res)=>{
    res.send('Thanks for waking up CraftYourWorld Bot!')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("server running\n")});
}


var hosts = ['https://CraftYourWorld-Bot.nigelrex.repl.co'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ?  host + ' is up and running\n' : host + ' is down\n';
        console.log(msg);
    });
});
module.exports = keepAlive;