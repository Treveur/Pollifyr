# Pollifyr
___

Create polls easily with personalized reactions.

## Installation
___

### install package

Then in a command line in the bot's folder use `npm install`.
Now, to start the bot use `node index.js`.

### Host the bot

You can host the bot on your own server.
To do this, you must modify config.json and add **`clientId`** and **`token`** key :

```json
{
	"clientId": "CLIENTID", // Your application id
	"guildId": "GUILD_ID", // Your guild id (server test)
	"token": "DISCORD_TOKEN",
}
```

**`guildId`** is only needed in case of you want to test first on your own server.

### Create commands on your server

Before use commands, you must add commands to your application.

#### Test server

use `npm` or `yarn`

```javascript
yarn run update-commands
// or
npm run update-commands
```
be sure, method to update your app global is comment:

```javascript
/* deploy-commands.js */

const data = await rest.put(
	Routes.applicationGuildCommands(clientId, guildId),
	{ body: commands },
);

// const data = await rest.put(
// 	Routes.applicationCommands(clientId),
// 	{ body: commands },
// );
```

#### Global server

Same as Test server, but this time be sure, method to update your app test is comment:

```javascript
/* deploy-commands.js */

// const data = await rest.put(
// 	Routes.applicationGuildCommands(clientId, guildId),
// 	{ body: commands },
// );

const data = await rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
);
```

## Usage
___

### Use the bot

Use the command /poll **question** "Your question ?" **answers** "Answer 1 👍; Answer 2 👎;".
Your bot must have write right to post message.

# What's next ?

* Localization
* Environnement handling (test server / global server)
* Help command