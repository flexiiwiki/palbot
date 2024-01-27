const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { api } = require("../../index.js");
const path = require("path");
var fs = require("fs");

const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).exit;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).exit;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: false });

      await api.doExit();

      await interaction.editReply({
        content: json.replyContent ?? def.replyContent,
        ephemeral: false,
      });
    } catch (error) {
      console.error("Error executing /exit command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
