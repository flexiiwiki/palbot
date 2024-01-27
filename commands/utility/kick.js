const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { api } = require("../../index.js");
const path = require("path");
var fs = require("fs");
const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).kick;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).kick;
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

      await api.kickPlayer(playerId);

      await interaction.editReply({
        content: json.replyContent ?? def.replyContent,
        ephemeral: false,
      });
    } catch (error) {
      console.error("Error executing /kick command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
