/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = process.env.tgkey;
const url = 'https://tgtr.herokuapp.com';
const port = process.env.PORT;
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const translate = require('google-translate-api');
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
  }).catch(err => {
      console.error(err);
  });

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
  bot.sendMessage(msg.chat.id, 'I am alive!');
});

