# tgtr TELEGRAM TRANSLATOR (alpha, ru and en only atm)

https://github.com/yagop/node-telegram-bot-api 
https://github.com/34r7h/google-translate-api

The world is large and you've been missing out on many ideas! Run this telegram bot to translate without leaving the chat.

## Set up instructions for heroku

  1. Use @botfather to create a bot, choose bot name, get key - assign key to process.env.tgkey
    a. extra credit, set up commands with botfather (/t, /help)
  2. set process.env.tgid to include any groups you DONT want to be auto-translated
  3. set process.env.admin to your tg user id
  4. set process.env.url to your Heroku app url. **no trailing /**
  5. invite the bot to a group or private conversation
  6. type /t and text in any language supported by google translate
