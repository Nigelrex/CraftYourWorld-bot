const Discord = require("discord.js");
const client = new Discord.Client({
  ws: {
    intents: Discord.Intents.ALL,
  },
  partials: ["MESSAGE", "REACTION"],
});
client.commands = new Discord.Collection();
module.exports.client = client;
const config = require("./config.json");
const { MessageAttachment } = require("discord.js");

// const Commando = require("discord.js-commando");
// const client = new Commando.CommandoClient({
//   owner: "738032578820309072",
//   commandPrefix: config.prefix,
// });

const dotenv = require("dotenv").config();
const keepAlive = require("./server");
const pm2 = require("pm2");
const fs = require("fs");
const scaleImage = require("./scale");
const { response } = require("express");
const path = require("path");
const request = require("request").defaults({ encoding: null });
const chalk = require("chalk");
const scalePixelArt = require("scale-pixel-art");
const Jimp = require("jimp");
const blist = require("./commands/moderation/badwords.json");
const webhookID = process.env.webhookurl.substr(33, 18);
const webhookToken = process.env.webhookurl.substr(52, 68);
const creationsWebhook = new Discord.WebhookClient(webhookID, webhookToken);

//files.js

client.once("ready", () => {
  client.user.setPresence({
    activity: { name: "Your World", type: "WATCHING" },
    status: "dnd",
  });
  console.log("CraftYourWorld Bot is Online\n\n");

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
  });
});

client.on("message", async (message) => {
  const commandFolders = fs.readdirSync("./commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }
  }
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.log(chalk.red("There was an error executing the command ") + error);
  }
});

// client.registry
// 	.registerDefaultTypes()
// 	.registerGroups([
// 		['owner', 'bot owner only commands'],
// 		['fun', 'fun commands'],
//         ['moderation', 'moderation commands'],
//         ['misc', 'misc commands']
// 	])
// 	.registerDefaultGroups()
// 	.registerDefaultCommands({
//         help: true,
//         ping: false
//     })
// 	.registerCommandsIn(path.join(__dirname, 'commands'));

//member add and leave and roles and scale image command starts
client.on("guildMemberAdd", (member) =>
  client.channels.cache.get("789830758331318273").send({
    embed: {
      title: "Joined",
      description: `\n📥 <@${member.id}> joined the server. There are now \`${member.guild.memberCount}\` in the server \nWelcome <@${member.id}> :wave:`,
      color: config.color,
    },
  })
);

client.on("guildMemberRemove", (member) =>
  // @ts-ignore
  client.channels.cache.get("789830758331318273").send({
    embed: {
      title: "Left",
      description: `\n📤 <@${member.id}> left the server. There are now \`${member.guild.memberCount}\` in the server \nwhat made them leave? :thinking:`,
    },
  })
);

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partials) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  const rchannel = config.rulesChannel;
  const membersrole = config.memberrole;
  const tickemoji = "✅";

  if (reaction.message.channel.id === rchannel) {
    console.log("Reaction added");
    if (reaction.emoji.name === tickemoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(membersrole);
    }
  } else {
    return;
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partials) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  const rchannel = config.rulesChannel;
  const membersrole = config.memberrole;
  const tickemoji = "✅";

  if (reaction.message.channel.id === rchannel) {
    console.log("Reaction removed");
    if (reaction.emoji.name === tickemoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(membersrole);
    }
  } else {
    return;
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  const rochannel = config.rolesChannel;
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === rochannel) {
    if (reaction.emoji.id === "793404396556779552") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390193507696654");
    }
    if (reaction.emoji.id === "793404388177739786") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793389937671536681");
    }
    if (reaction.emoji.id === "793404396263309362") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("791929524996014110");
    }
    if (reaction.emoji.id === "793420433981833216") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390200453726208");
    }
    if (reaction.emoji.id === "793422268247965707") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390528954892289");
    }
    if (reaction.emoji.name === "👋") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793410703653470218");
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;
  const rochannel = config.rolesChannel;

  if (reaction.message.channel.id === rochannel) {
    if (reaction.emoji.id === "793404396556779552") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390193507696654");
    }
    if (reaction.emoji.id === "793404388177739786") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793389937671536681");
    }
    if (reaction.emoji.id === "793404396263309362") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("791929524996014110");
    }
    if (reaction.emoji.id === "793420433981833216") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390200453726208");
    }
    if (reaction.emoji.id === "793422268247965707") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390528954892289");
    }
    if (reaction.emoji.name === "👋") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793410703653470218");
    }
  }
});

client.on("message", (message) => {
  if (
    !message.content.startsWith(`${config.prefix}scale`) &&
    !message.content.startsWith(`${config.prefix}resize`)
  )
    return;

  if (message.author.bot) return;

  if (message.reference)
    scaleAndSend(
      message.referencedMessage.attachments.first(),
      message.channel
    );
  else
    inputAttachment = scaleAndSend(
      message.attachments.first(),
      message.channel
    );
});

const scaleAndSend = (inputAttachment, channel) => {
  if (inputAttachment == undefined) {
    channel.send({
      embed: {
        title: "Did you send the image?",
        description:
          'There was no attachment on that message.\ntype "scale" or "resize" with an image, or type "scale" or "resize" the bot in a reply to an image to scale it.',
      },
    });
    return;
  }

  const inputAttachmentURL = inputAttachment.url;

  request.get(inputAttachmentURL, (_err, _res, body) => {
    scaleImage(body)
      .then((buffer) => {
        const outputAttachment = new Discord.MessageAttachment(
          buffer,
          "scaled.png"
        );
        channel.send(outputAttachment);
      })
      .catch((error) => {
        channel.send({
          embed: {
            title: "Error",
            description: `There was an error trying to do that:\n\`${error}\``,
          },
        });
        console.error(error);
      });
  });
};

client.on("message", (message) => {
  if (
    message.channel.id != process.env.creationschannelid || // the message is not in community creations
    message.author.id == client.user.id || // the message was sent my the bot
    message.author.id == config.botowner ||
    message.attachments.array().length > 0 || // there is an attachment
    message.content.includes("http://") || // there is a link
    message.content.includes("https://") // there is a link
  )
    return;

  message.delete();
  message
    .reply({
      embed: {
        title: "Oops",
        description: `your message was deleted because it didn't have an attachment, image or link. Please use <#${process.env.discussionchannelid}> for talking about creations posted in this channel.`,
        color: config.color,
      },
    })
    .then((response) => response.delete({ timeout: 10000 }));

  if (message.member.nickname == null) name = message.author.username;
  else name = message.member.nickname;

  const webhookUserData = {
    username: name,
    avatarURL: message.author.avatarURL({ dynamic: true }),
  };

  creationsWebhook.send(message.content, webhookUserData);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.emoji.name === "🔖") {
    let author = `${reaction.message.author.username}`;
    const DMm = {
      embed: {
        color: config.color,
        author: {
          name: author,
          icon_url: reaction.message.author.avatarURL(),
        },
        description: reaction.message.content,
        fields: [
          { name: "Original", value: `[Jump](${reaction.message.url})` },
        ],
        footer: {
          text:
            "From " +
            reaction.message.guild.name +
            " #" +
            reaction.message.channel.name,
        },
      },
    };
    user.send(DMm).then(
      reaction.message.reactions.cache
        .get("🔖")
        .remove()
        .catch((error) => console.error("Failed to remove reactions: ", error))
    ); //.then((DMm) => {DMm.react("❌")}.then(message.delete)
    console.log(`BookMarked a message for ${author}`);
  }
});

client.on("messageReactionAdd", async (reaction, _user) => {
  if (reaction.emoji.name == "⭐") {
    const message = reaction.message;
    const reactionData = message.reactions.cache.get("⭐");
    if (
      reactionData.count == 5 &&
      !reactionData.users.cache.has(client.user.id)
    ) {
      if (message.member.nickname == null) name = message.author.username;
      else name = `${message.member.nickname} (${message.author.username})`;
      message.react("⭐");
      const embed = {
        color: color,
        author: {
          name: name,
          icon_url: message.author.avatarURL(),
        },
        description: message.content,
        fields: [
          {
            name: "Original",
            value: `[Jump](${message.url})`,
          },
        ],
        footer: { text: "#" + message.channel.name },
      };
      if (message.attachments.size != 0)
        embed.image = {
          url: message.attachments.entries().next().value[1].attachment,
        };
      client.channels.cache.get("791635796431601715").send({ embed: embed });
    }
  }
});

// client.on("message", (message) => {
//   if (message.content.includes(blist)) 
//     message.delete();
//     message.channel.send({
//       embed: {
//         title: "WARNING",
//         description: `${message.author.tag} has been warned for swearing on this server`,
//         color: "RED",
//       },
//     });
  
//   return;
// });

// member add and leave and roles and scale image commands end

keepAlive();
client.login(process.env.bottoken);
