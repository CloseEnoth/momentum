//1 clock and time
const time = document.querySelector('.time')
const date = document.querySelector('.date')

function showTime() {
  const todayDate = new Date()

  const hours = todayDate.getHours() < 10 ? '0' + todayDate.getHours() : todayDate.getHours()
  const minutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : todayDate.getMinutes()
  const seconds = todayDate.getSeconds() < 10 ? '0' + todayDate.getSeconds() : todayDate.getSeconds()

  time.textContent = `${hours}:${minutes}:${seconds}`


  if (hours / 6 === 0 && minutes === 0 && seconds === 0) getTimeOfDay()
  if (hours === 0 && minutes === 0 && seconds === 0) getTimeOfDay()
  
  showDate()
  setTimeout(showTime, 1000)
}

function showDate() {
  const todayDate = new Date()

  const options = {weekday: 'long',month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const currentDate = todayDate.toLocaleDateString('en-US', options);
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

greeting.textContent = `Good ${getTimeOfDay()}`

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

function getRandomNum(start, end) {
  return Math.floor(Math.random() * end + start)
}

function setBg(randomNum) {
  const timeOfDay = getTimeOfDay()
  const bgNum = randomNum < 10 ? '0' + randomNum : randomNum

  const img = new Image()
  img.src = `https://raw.githubusercontent.com/closeenoth/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
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
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
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
  
  try {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)} °C`
    wind.textContent = `${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `${Math.round(data.main.humidity)} %`
    weatherDescription.textContent = data.weather[0].description
  } catch (error) {
    alert(`${data.message}`)
  }
}

function setLocalStorageCity() {
  localStorage.setItem('userCity', city.value)
}

window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
  if (localStorage.getItem('userCity')) {
    city.value = localStorage.getItem('userCity')
  }
}

window.addEventListener('load', getLocalStorageCity)
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

let isMuted = false
let isPlay = false
let playNum = 0

const playerCurrentTrack = document.querySelector('.player-track')

function showCurrentTrack() {
  const playList = playListContainer.children
  const currentTrack = playList[playNum].textContent
  playerCurrentTrack.textContent = currentTrack
}

audio.addEventListener('ended', playNext)

play.addEventListener('click', playAudio)
playPrevBtn.addEventListener('click', playPrev)
playNextBtn.addEventListener('click', playNext)

function highLightSong() {
  const playList = playListContainer.children
  Array.from(playList).forEach(li => {
    li.classList.remove('play-item__highlight')
  })
  playList[playNum].classList.add('play-item__highlight')
}

function setSrcAudio() {
  audio.src = playList[playNum].src
  audio.currentTime = 0;
  highLightSong()
  showCurrentTrack()  
}

function toggleBtn() {
  play.classList.toggle('pause')
}

function playAudio() {
  if (isPlay === false) {
    audio.play()
    toggleBtn()
    isPlay = true
  } else {
    audio.pause()
    toggleBtn()
    isPlay = false
  }
}

function playPrev() {
  if (playNum === 0) playNum = playList.length - 1
  else playNum -= 1

  setSrcAudio()

  if (isPlay === false) {
    isPlay = true
    audio.play()
    toggleBtn()
  } else {
    audio.play()
  }
}

function playNext() {
  if (playNum === playList.length - 1) playNum = 0
  else playNum += 1

  setSrcAudio()
  
  if (isPlay === false) {
    isPlay = true
    audio.play()
    toggleBtn()
  } else {
    audio.play()
  }
}

setSrcAudio()
//6 audioPlayer
//7 audioPlayer + progressBar
const currentSongTime = document.querySelector('.player-current')
const totalSongTime = document.querySelector('.player-total')
const playerProgress = document.querySelector('.player-progress')
const playerMutedBtn = document.querySelector('.player-muted')
const playerVolume = document.querySelector('.player-volume')

playerVolume.addEventListener('change', changeVolume)
playerMutedBtn.addEventListener('click', muteAudio)
playerProgress.addEventListener('change', changeProgressBar)

setInterval(updateProgressBar, 500)

function changeVolume(e) {
  audio.volume = parseFloat(e.target.value) / 10 
}

let volumeBeforeMuted = 0.5
playerVolume.value = volumeBeforeMuted

function muteAudio() {
  
  playerMutedBtn.classList.toggle('active')

  if(isMuted === false) {
    volumeBeforeMuted = audio.volume
    isMuted = true
    audio.volume = 0
  } else {
    isMuted = false
    audio.volume = volumeBeforeMuted
  }
}

function updateProgressBar() {
  playerProgress.max = audio.duration
  playerProgress.value = audio.currentTime

  totalSongTime.innerHTML = formateTime(Math.floor(audio.duration))

  currentSongTime.innerHTML = formateTime(Math.round(audio.currentTime))
  if (currentSongTime.innerHTML === "NaN:NaN") {
    currentSongTime.innerHTML = "0:00"
  }
}

function formateTime(seconds) {
  let min = Math.floor( seconds / 60 )
  let sec = Math.floor( seconds - min * 60 )
  
  if (sec < 10) {
    sec = `0${sec}`
  }
  
  return `${min}:${sec}`
}

function changeProgressBar() {
  audio.currentTime = playerProgress.value
}

//7 audioPlayer + progressBar

//9 unsplash

async function setBgUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=EBEOAig1tA_6M4FKJaDXDOTPSnF1f9OWHy7fdMGZwFs`;
  try {
    const response = await fetch(url)
    const data = await response.json()
    const photo = await data.urls.regular

    const img = new Image()
    img.src = photo
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`
    };
    console.log('unsplash done')
  } catch (error) {
    console.log('unsplash not working', error)
  }
}

//setBgUnsplash()

const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}
delay(5000)
async function setBgFlicker() {
  console.log('Flicker image generation...')
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0a5fae729645a274e2453ad765cb4d96&tags=nature&extras=url_l&format=json&nojsoncallback=1`
  try {
    const response = await fetch(url)
    const data = await response.json()
    const photos = await data.photos
    const photo = await photos.photo[0].url_l
    console.log(photo)
    console.log('Flicker done')
    const img = new Image()
    img.src = photo
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`
    };
  } catch (error) {
    console.log('Flicker error')
  }
}
//setBgFlicker()

//9 unsplash