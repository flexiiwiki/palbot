const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { api } = require("../../index.js");
const path = require("path");
var fs = require("fs");
const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).shutdown;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).shutdown;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(json.name ?? def.name)
    .setDescription(json.description ?? def.description)
    .addIntegerOption((option) =>
      option
        .setName("s")
        .setDescription(
          json.inputIntegerDescription ?? def.inputIntegerDescription
        )
        .setRequired(true)
    )
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

      let secondsTillShutdown = interaction.options.getInteger("s");
      let messageText = interaction.options.getString("target");

      await api.shutdown(secondsTillShutdown, messageText);

      await interaction.editReply({
        content: json.replyContent ?? def.replyContent,
        ephemeral: false,
      });
    } catch (error) {
      console.error("Error executing shutdown command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
