var bcrypt = require('bcrypt');
if (process.env.REDISTOGO_URL) {
  	// redistogo connection
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var redis = require("redis").createClient(rtg.port, rtg.hostname);
	redis.auth(rtg.auth.split(":")[1]);  
} else {
	var redis = require("redis"),
	    client = redis.createClient();
}

client.on("error", function (err) {
    console.log("Redis Error: " + err);
});


// usernames and passwords

/*
admin / 28rTu932Ypxz987
pickpocket23bazooka / dY78vNqP37sS94U
stephenmoore56 / Ty84Db0U6qM33
*/

// delete old keys
client.del("admin");
client.del("pickpocket23bazooka");
client.del("stephenmoore56");

// generate salt
var salt = bcrypt.genSaltSync(10);
// repopulate
client.set("admin",               bcrypt.hashSync("28rTu932Ypxz987", salt));
client.set("pickpocket23bazooka", bcrypt.hashSync("dY78vNqP37sS94U", salt));
client.set("stephenmoore56",      bcrypt.hashSync("Ty84Db0U6qM33",   salt));

// exit
client.quit();