const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Thanks for waking up CraftYourWorld Bot!')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("server running\n")});
}
module.exports = keepAlive;