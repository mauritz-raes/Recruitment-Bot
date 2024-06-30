const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Sends a message with the trial rules'),
  async execute(interaction) {
    await interaction.reply(
      'Trial will be performed on **trial characters**, so make sure you have your trial character fully set up **before** the trial starts\n**ALLOWED:** Giant Draught, Food buff, Villa, Alch stone and 2x Elkarr crystal\n**NOT ALLOWED:** Perfume, crystals (only **2x Elkarr**), E-BUFF, Z-BUFF or Rage skills'
    );
  },
};
