# Recruitment Bot
Currently hardcoded for a specific server, own usage is possible after editing channel and role ids.

You need a `src/config.json` that looks like this: 

```json
{
	"clientId": "appliction-id",
	"guildId": "dev-server-id",
	"token": "bot-token"
}
```
Invite the bot to your server with admin privileges first

Run these 2 command before running the bot!
```bash
node deploy-commands-g.js
node src/send-message.js
```
