// Load requirements
const Discord = require("discord.js");
const fs = require('fs');
const count = require('./count.json');
const config = require("./config.json");

const client = new Discord.Client();

// Run on start
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
  client.user.setActivity(`killa help`);
});

// Runs on join new server (?)
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
  client.user.setActivity(`killa help`);
});

// Runs on leave server (?)
client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
  client.user.setActivity(`killa help`);
});

// Runs when a new message is sent on a server
client.on("message", async message => {

  // Don't respond to bots
  if(message.author.bot)
    return;


  const command = message.content.toLowerCase();
  let override = false;

  if (command.startsWith("killa"))
    override = true;

  if(command.match(/\bkilla help\b/) != null) {
    message.channel.send("Commands:\n`getKillaCounter` to get the current counter across all servers\nadd `killa` to the start of your message to override the 33% chance of the bot responding");
  } else if(command.match(/\bgetkillacounter\b/) != null) {
    message.channel.send("gg wtf count: ".concat(count[0]["messageCount"], "\ngg count: ", count[1]["messageCount"].toString(), "\nwtf count: ", count[2]["messageCount"].toString(), "\nb o g count: ", count[3]["messageCount"].toString()));
  }


  if(override || Math.floor(Math.random() * 15) < 5) {
    let num = -1;


    // All the cases
    if(command.match(/\bgg\b/) != null && command.match(/\bwtf\b/) != null) {
      message.channel.send("gg wtf");
      num = 0;
    } else if(command.match(/\bgg\b/) != null) {
      message.channel.send("gg");
      num = 1;
    } else if(command.match(/\bwtf\b/) != null) {
      message.channel.send("wtf");
      num = 2;
    } else if(command.match(/\bbog\b/) != null || command.match(/\bb o g\b/) != null || command.match(/\bpog\b/) != null || command.match(/\bpoggers\b/) != null || command.match(/\bpogger\b/) != null) {
      message.channel.send("b o g");
      num = 3;
    } else if(command.match(/\beda\b/) != null) {
      message.channel.send("Eustis does your ass");
    }

    if(command.endsWith("when")) {
      message.channel.send("wait when");
    }

    // Saves new count to json file
    if(num != -1) {
      if (!count[num]) count[num] = { messageCount: 1 };
      else count[num].messageCount++;
      try {
        fs.writeFileSync('./count.json', JSON.stringify(count));
      } catch(err) {
        console.error(err);
      }
    }
  }
});

client.login(config.token);
