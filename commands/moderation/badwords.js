const blist = require("./badwords.json");
const config = require("../../config.json");

module.exports = {
  name: `${blist}`,
  description: "eliminates bad words from the server",
  execute: async (message, args) => {
    message.content.includes(blist);
    message.delete();
    message.reply({
      embed: {
        title: "WARNING",
        description: "you have been warned for swearing on this server",
      },
    });

    config.serverlogs.send(
      `${message.author} has sweared in the channel #${guild.channel.name}`
    );
  },
};
