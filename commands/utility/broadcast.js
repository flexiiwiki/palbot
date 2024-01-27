const { SlashCommandBuilder } = require("discord.js");
const { api } = require("../../index.js");
const path = require("path");

var fs = require("fs");

const json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-overrides.json"),
    "utf-8"
  )
).broadcast;
const def = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../command-defaults.json"),
    "utf-8"
  )
).broadcast;


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
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const messageText = interaction.options.getString("target");

      if (!messageText) {
        await interaction.editReply({
          content: `Cannot send empty broadcast!`,
          ephemeral: false,
        });
        return;
      }

      await api.broadcast(messageText);

      let content = json.replyContent ?? def.replyContent;
      content = content.replace("${messageText}", messageText);

      await interaction.editReply({ content: content, ephemeral: false });
    } catch (error) {
      console.error("Error executing /broadcasts command:", error);

      await interaction.followUp({
        content: json.error ?? def.error,
        ephemeral: true,
      });
    }
  },
};
