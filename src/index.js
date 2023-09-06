const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  IntentsBitField,
  ChannelType,
  PermissionsBitField,
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

// Retrieving commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Custom status
client.on("ready", (c) => {
  console.log("Ready!");

  client.user.setActivity({
    name: "out for true warlords",
    type: ActivityType.Watching,
  });
});

// Sends message to user that just joined
client.on("guildMemberAdd", async (member) => {
  try {
    const channel = await client.channels.cache.get("1115922314526208122");

    await channel.send({
      content: `Welcome <@${member.user.id}>, please go to <#1143699906134028298> to proceed with your application`,
    });
  } catch (error) {
    console.log(error);
  }
});

// Adding slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Button listner for role-select
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    if (interaction.customId === "trialee") {
      await interaction.member.roles.add("1115922313985151039");

      const trialchannel = await interaction.guild.channels.create({
        name: `${interaction.user.displayName}`,
        type: ChannelType.GuildText,
        parent: "1115922314861748249",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      await trialchannel.send({
        content: `Hey <@${interaction.user.id}>,\n\nPlease fill out the <#1115922314526208124> in here and we'll get back to you as soon as possible`,
      });

      await interaction.editReply(`Channel created`);
    } else if (interaction.customId === "member") {
      const channel = await client.channels.cache.get("1148778168057073694");
      if (!channel) return;
      await channel.send({
        content: `<@&1115922313985151041>\n\n<@${interaction.user.id}> would like the Member role`,
      });
      await interaction.editReply(
        `Our recruitment officers have been notified and will give you the role as soon as possible`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(token);
