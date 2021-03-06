const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("../config/config.json");

const messageHelper = require('./helpers/message');

client.on("ready", () => {
    console.log(`NSFW filter bot started.`);
});

client.on("message", message => messageHelper.message(client, message));

client.login(config.token);