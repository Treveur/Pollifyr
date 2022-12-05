# Pollifyr

Create polls easily with personalized reactions.

## Installation

### install package

Then in a command line in the bot's folder use `npm install`.
Now, to start the bot use `node index.js`.

### Host the bot

You can host the bot on your own server.
To do this, you must add a .env file and add **`CLIENT_ID`** and **`DISCORD_TOKEN`** key :

```bash
# Ensure you, your .env file is only on your machine
CLIENT_ID=# Client/application id
GUILD_ID=# Test local serveur id
DISCORD_TOKEN=# Discord token
```

**`GUILD_ID`** is only needed in case of you want to test first on your own server.

### Create commands on your server

Before use commands, you must add commands to your application.

#### Add or update commands

use `npm` or `yarn`

```bash
yarn update-commands
# or
npm run update-commands
```

Add **`:local`** if you want test on local server `yarn update-commands:local`

#### Delete commands

```bash
yarn delete-commands
# or
npm run delete-commands
```

Add **`:local`** if you want test on local server `yarn delete-commands:local`

## Usage

### Use the bot

Use the command /poll **question** "Your question ?" **answers** "Answer 1 👍; Answer 2 👎;".
Your bot must have write right to post message.

# What's next ?

* Test
* Help command