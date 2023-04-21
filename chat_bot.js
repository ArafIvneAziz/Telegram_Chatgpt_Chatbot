const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
// Check the "README" file for easiness
const configuration = new Configuration({
  apiKey: "Paste_Your_Openai_API_keys",
});
const openai = new OpenAIApi(configuration);
// replace the value below with the Telegram token you receive from @BotFather
const token = 'Paste_Your_Telegram_Token';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message=msg.text
  console.log(message)
  // send a message to the chat acknowledging receipt of their message
  const messages = `
  I am highly intelligent  question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. if you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".
  Q:what is human life expectancy in United States?
  A:Human life expectancy in the United States is 78 years.

  Q:
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
