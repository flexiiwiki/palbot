const { SlashCommandBuilder } = require("discord.js");
const { api } = require("../../index.js");
const path = require("path");
var fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).onlinePlayers;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).onlinePlayers;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const playerList = await api.showPlayers();
      const embedDescription = json.embed.description ?? def.embed.description;

      const embed = new EmbedBuilder()
        .setColor(json.embed.color ?? def.embed.color)
        .setTitle(json.embed.title ?? def.embed.title)
        .setDescription(embedDescription.replace("${playercount}", playerList.length) ?? embedDescription)
        .setTimestamp();

      if (json.listPlayers == "true" || !json.listPlayers) {
        playerList.forEach((player) => {
          embed.addFields({ name: " ", value: "- "+player, inline: false});
        });
      }

      await interaction.editReply({ embeds: [embed], ephemeral: false });
    } catch (error) {
      console.error("Error executing /onlineplayers command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
