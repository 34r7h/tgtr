// TODO translate attachments and other forms of media. Get group name from chat id. allow other target languages.

const TOKEN = process.env.tgkey;
const url = 'https://tgtr.herokuapp.com';
const port = process.env.PORT;
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const translate = require('@34r7h/google-translate-api');
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}, token ${TOKEN}, endpoint ${url}`);
});

// Just to ping!
bot.on('message', msg => {
  console.log(msg)
  return translate(msg.text, { to: 'en' }).then(res1 => {
    return res1
  }).then((en)=>{
    return translate(msg.text, {to: 'ru'}).then(res2 => {
      return bot.sendMessage('534859505', `${msg.chat.title || 'private'} **${ msg.from.username }** (${en.from.language.iso}):\n ${ msg.text }\n\nen: [ ${ en.text } ] \nру: [ ${ res2.text } ]`);
    })
  }).catch(err => console.log('err', err));
})