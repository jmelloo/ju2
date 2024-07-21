const TelegramBot = require( `node-telegram-bot-api` )
const TOKEN = `5478878277:AAH_FjRfcOc8x1e4uwRoivWG1qDzSAGD-X4`
const bot = new TelegramBot( TOKEN, { polling: true } )

bot.on('message', function(msg){
	console.log('msg', msg)
})