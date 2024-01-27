const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { api } = require("../../index.js");

var fs = require("fs");
const path = require("path");

const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).ban;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).ban;
module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description)
    .addStringOption((option) =>
      option
        .setName("target")
        .setDescription(
          json.inputStringDescription ?? def.inputStringDescription
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const playerId = interaction.options.getString("target");

      await api.banPlayer(playerId);

      let content = json.replyContent ?? def.replyContent;
      content = content.replace("${playerId}", playerId);

      await interaction.editReply({
        content: content,
        ephemeral: false,
      });
    } catch (error) {
      console.error("Error executing /ban command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
