const Discord = require ("discord.js"); // Discord js library
const mariadb = require('mariadb');     // Mariadb connector library
const dotenv = require('dotenv');
dotenv.config({ path: process.cwd() + '/config.env' });// use environment variables for security
const fs = require('fs');               // filesystem

// Must provide a .env file with hostname, port, username, and password for the db
// eqemu defaults in a .env file would look like the following:
// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_USER=root
// DB_PWD=eqemu
/*
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     port: process.env.DB_PORT,
     user: process.env.DB_USER, 
     password: process.env.DB_PWD,
     connectionLimit: 3
});
*/
// Establish discord client and log in.
// .env file must have the Discord bot secret token stored in TOKEN
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// Initialize bot command collection, only allow .js files.
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

// Set prefix for user to call bot commands
const prefix = '!'; 

client.on("message", msg => {
  // ignore messages from bots, ignore messages without the command prefix
  if (msg.author.bot || !msg.content.startsWith(prefix)){ 
    return
  }
  
  // Remove prefix and store arguments passed
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  // First argument after prefix is the command, not case sensitive
  const command = args.shift().toLowerCase();
  
  // return if command not found
  if (!client.commands.has(command)) {
    msg.channel.send("Command not found")
    return; 
  }
  
  
  try {
    client.commands.get(command).execute(msg, args)
  }
  catch (error){
    console.error(`Command ${command} could not execute`)
    msg.channel.send(`The command: ${command} could not be executed.`)
  }
  
  })
