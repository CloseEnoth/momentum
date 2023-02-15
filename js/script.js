//1 clock and time
const time = document.querySelector('.time')
const date = document.querySelector('.date')

function showTime() {
  const todayDate = new Date()

  const hours = todayDate.getHours() < 10 ? '0' + todayDate.getHours() : todayDate.getHours()
  const minutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : todayDate.getMinutes()
  const seconds = todayDate.getSeconds() < 10 ? '0' + todayDate.getSeconds() : todayDate.getSeconds()

  time.textContent = `${hours}:${minutes}:${seconds}`


  if (hours === 6 && minutes === 0 && seconds === 0) getTimeOfDay()
  if (hours === 12 && minutes === 0 && seconds === 0) getTimeOfDay()
  if (hours === 18 && minutes === 0 && seconds === 0) getTimeOfDay()
  if (hours === 0 && minutes === 0 && seconds === 0) getTimeOfDay()
  showDate()
  setTimeout(showTime, 1000)
}

function showDate() {
  const todayDate = new Date()

  const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const currentDate = todayDate.toLocaleDateString('en-US', options);
  console.log(todayDate.toLocaleDateString('en-US', ))
  date.textContent = currentDate
}

showTime()
//1 clock and time

//2 greetings
const greeting = document.querySelector('.greeting')

function getTimeOfDay() {
  const todayDate = new Date()
  const hours = todayDate.getHours()
  const greetingArr = ['night', 'morning', 'afternoon', 'evening']

  return greetingArr[ Math.floor(hours / 6) ]
}

greeting.textContent = `Good ${getTimeOfDay()} <>`

const userName = document.querySelector('.greeting-container input')

function setLocalStorage() {
  localStorage.setItem('userName', userName.value)
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName')
  }
}

window.addEventListener('load', getLocalStorage)
//2 greetings

//3 slider
const body = document.body
let randomNum = getRandomNum(1, 20)

console.log(randomNum)

function getRandomNum(start, end) {
  return Math.floor(Math.random() * end + start)
}

function setBg(randomNum) {
  const timeOfDay = getTimeOfDay()
  const bgNum = randomNum < 10 ? '0' + randomNum : randomNum

  const img = new Image()
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  };
}

setBg(randomNum)

const sliderPrev = document.querySelector('.slide-prev')
const sliderNext = document.querySelector('.slide-next')

function getSliderNext() {
  if (randomNum == 20) {
    randomNum = 1 
  } else {
    randomNum += 1
  } 
  setBg(randomNum)
}

function getSliderPrev() {
  if (randomNum == 1) {
    randomNum = 20
  } else {
    randomNum -= 1
  }
  setBg(randomNum)
}

sliderPrev.addEventListener('click', getSliderPrev)
sliderNext.addEventListener('click', getSliderNext)
//3 slider
//4 weather
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const city = document.querySelector('.city')

city.addEventListener('change', getWeather)

async function getWeather() {
  let userCity
  if (city.value == '') {
    userCity = city.placeholder
  } else {
    userCity = city.value
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=en&appid=c4ac632db3b589d82f8e8a1e83f39460&units=metric`
  const res = await fetch(url)
  const data = await res.json()

  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = data.main.temp
  weatherDescription.textContent = data.weather[0].description
}

getWeather()
//4 weather
//5 quote of the day
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

changeQuote.addEventListener('click', getQuotes)

async function getQuotes() {
  let randomNum = getRandomNum(0, 4)
  const quotes = './json/quotes.json'
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      quote.textContent = data[randomNum].text
      author.textContent = data[randomNum].author
    });
}

getQuotes()
//5 quote of the day
//6 audioPlayer
const audio = new Audio()
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const play = document.querySelector('.play')

import playList from './playList.js';
const playListContainer = document.querySelector('.play-list')

playList.forEach(el => {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = el.title
  playListContainer.append(li)
})

let isPlay = false
let playNum = 0

play.addEventListener('click', doAudio)
playPrevBtn.addEventListener('click', playPrev)
playNextBtn.addEventListener('click', playNext)

function setSrcAudio() {
  audio.src = playList[playNum].src
  audio.currentTime = 0;
}

function toggleBtn() {
  play.classList.toggle('pause')
}

function playAudio() {
  isPlay = true
  audio.play()
}

function pauseAudio() {
  isPlay = false
  audio.pause()
}

function doAudio() {
  if (isPlay === false) {
    playAudio(); 
    toggleBtn()
  } else {
    pauseAudio()
    toggleBtn()
  }
}

function playPrev() {
  if (playNum === 0) playNum = playList.length - 1
  else playNum -= 1
  
  setSrcAudio()
  playAudio()
}

function playNext() {
  if (playNum === playList.length - 1) playNum = 0
  else playNum += 1

  setSrcAudio()
  playAudio()
}

setSrcAudio()
//6 audioPlayer
//7 audioPlayer + progressBar
const currentSongTime = document.querySelector('.player-current')
const totalSongTime = document.querySelector('.player-total')
const playerProgress = document.querySelector('.player-progress')

function updateProgressBar() {
  playerProgress.max = audio.duration
  playerProgress.value = audio.currentTime
}

//7 audioPlayer + progressBar