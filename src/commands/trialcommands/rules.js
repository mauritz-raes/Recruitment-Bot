const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Sends a message with the trial rules'),
  async execute(interaction) {
    await interaction.reply(
      'Trial will be performed on **trial characters**, so make sure you have your trial character fully set up **before** trial starts\n**NO draught**, **NO perfume** and **NO crystals** (only **2x Elkarr**)\n**NO E-BUFF**, **Z-BUFF** or **100%** during 1v1s, all skills are allowed during the 3v3s\nFor the 3v3s everyone will take of 1 ring'
    );
  },
};
