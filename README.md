# Pollifyr

Create polls easily with personalized reactions.


## Use the bot

Use the command !poll "Your question ?" "Answer 1 👍" "Answer 1 👎".
Your bot must have write right to post message.

## Host the bot

You can host the bot on your own server.
To do this, you must modify config.json and add **`token`** key under **`prefix`** key :

```json
{
	"prefix":"!",
	"token":"your token",
}
```

then call **"token"** key in index.js :

```javascript
const { prefix, token } = require('./config.json');
...
client.login(token);
```

Then in a command line in the bot's folder use `npm install`.

Now, to start the bot use `node index.js`.
