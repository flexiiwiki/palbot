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
).info;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).info;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const embed = new EmbedBuilder()
        .setColor(json.embed.color ?? def.embed.color)
        .setTitle(json.embed.title ?? def.embed.title)
        .setDescription(json.embed.description ?? def.embed.description);

      if (!json.includeInfoRcon || json.includeInfoRcon === "false") {
        const infoResponse = await api.info();
        embed.setDescription(infoResponse ?? "\u200B");
        return;
      }

      if (json.embed.fields.length == 0) {
        def.embed.fields.forEach((field) => {
          embed.addFields({
            name: field.name,
            value: field.value,
            inline: field.inline == "true",
          });
        });
      } else {
        json.embed.fields.forEach((field) => {
          embed.addFields({
            name: field.name,
            value: field.value,
            inline: field.inline == "true",
          });
        });
      }

      await interaction.editReply({
        embeds: [embed],
        ephemeral: false,
      });
    } catch (error) {
      console.error("Error executing /info command:", error);
      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
