require('dotenv').config()
const axios = require('axios');

const url = process.env.URL;  // Замените на ваш URL
const token = process.env.TOKEN;
const minutes = process.env.INTERVAL_MINUTES
const countTaps = parseInt(process.env.COUNT_TAPS)

console.log()
setInterval(() => {

  currentTime = new Date()

  const data = {
    // Ваши данные для отправки
      count: countTaps, //Заменить на максимальное кол-во энергии
      availableTaps: countTaps, //Заменить на максимальное кол-во энергии
      timestamp: Math.floor(currentTime/1000)
  }

  axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 YaBrowser/24.6.0.0 Safari/537.36'
    }
  })
  .then(() => {
    console.log(currentTime, 'Запрос выполнен успешно');
  })
  .catch(error => {
    console.error('Ошибка запроса:', error.message);
  })
  
  
  console.log(currentTime, data)
  
}, minutes*60*1000) //Рассчитать с запасом, чтобы не запускался чаще, чем энергия наполняется до краев.