const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  IntentsBitField,
  ActionRow,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Sends our role select message
client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1143699906134028298");
    if (!channel) return;

    const row = new ActionRowBuilder();

    row.components.push(
      new ButtonBuilder()
        .setCustomId("trialee")
        .setLabel("I want to join Mythic")
        .setStyle(ButtonStyle.Primary)
    );
    row.components.push(
      new ButtonBuilder()
        .setCustomId("member")
        .setLabel("I'm already a member")
        .setStyle(ButtonStyle.Secondary)
    );

    await channel.send({
      content: "**Do you want to join Mythic?**",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(token);
