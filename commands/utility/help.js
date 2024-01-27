const { SlashCommandBuilder } = require("discord.js");
var fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).help;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).help;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description),
  async execute(interaction) {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(json.embed.color ?? def.embed.color)
      .setTitle(json.embed.title ?? def.embed.title)
      .setDescription(json.embed.description ?? def.embed.description);

    if (json.embed.fields.length == 0) {
      def.embed.fields.forEach((field) => {
        embed.addFields({ name: field.name, value: field.value });
      });
    } else {
      json.embed.fields.forEach((field) => {
        embed.addFields({ name: field.name, value: field.value });
      });
    }

    await interaction.editReply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
