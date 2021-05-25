const config = require("../../config.json");
const client = require("../../bot");
const Discord = require("discord.js");

module.exports = {
  name: "rroles",
  aliases: ["reactionroles"],
  async execute(message, args, client) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle("**CraftYourWorld Roles**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "React To Your Desired Roles To Get More Information For Your Brain"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields(
        {
          name: "**Vote For Your Roles**",
          value: "\n────────────\n\n\n",
          inline: false,
        },
        {
          name: "\n\n**<:Texturepacks:793404396556779552> Texturepack <:Texturepacks:793404396556779552>**",
          value: "\n**React To Get Updates About Our Resourcepacks**",
          inline: false,
        },
        {
          name: "\n**<:Datapacks:793404388177739786> Datapacks <:Datapacks:793404388177739786>**",
          value: "\n**React To Get Updates About Our Datapacks**",
          inline: false,
        },
        {
          name: "\n**<:MinecraftNews:793404396263309362> Minecraft News <:MinecraftNews:793404396263309362>**",
          value: "\n**React To Get Updates About Minecraft News**",
          inline: false,
        },
        {
          name: "\n**<:Optifine:793420433981833216> Optifine News <:Optifine:793420433981833216>**",
          value: "\n**React To Get Updates About Optifine News**",
          inline: false,
        },
        {
          name: "\n**<:Others:793422268247965707> Other Stuff <:Others:793422268247965707>**",
          value: "\n**React To Get Updates About Other News**",
          inline: false,
        },
        {
          name: "\n**:wave: Joining And leaving :wave:**",
          value: "\n**React To Get Updates About others Joining And leaving **",
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed }).then((reactionMessage) => {
      reactionMessage.react("<:Texturepacks:793404396556779552>");
      reactionMessage.react("<:Datapacks:793404388177739786>");
      reactionMessage.react("<:MinecraftNews:793404396263309362>");
      reactionMessage.react("<:Optifine:793420433981833216>");
      reactionMessage.react("<:Others:793422268247965707>");
      reactionMessage.react("👋");
    });
  },
};
