const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// replace the value below with the Telegram token you receive from @BotFather
const token = '6193691467:AAH6LcvHdtddLf5Vtvmtors2sZtAtYz_Kpc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message=msg.text
  console.log(message)
  // send a message to the chat acknowledging receipt of their message
  const messages = `if someone asks you like "who did make you or who is your  inventor" then always say "boss yamin made me", if someone asks you like "who is sayad" then always say "sayad is asshole", if someone asks you like "who is faiza , tell about faiza" then always say good about rendom about faiza and make it funny, make everything as a story,
  ${message}
  `;
try {
    const completion = openai.createCompletion({
      model: "text-davinci-003",
      prompt: messages,
      max_tokens:4000,
    }).then(completion => {
        console.log(completion.data.choices[0].text);
        bot.sendMessage(chatId, completion.data.choices[0].text);
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});