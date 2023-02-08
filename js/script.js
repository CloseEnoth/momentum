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

  const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
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
  const greetingArr = ['Night', 'Morning', 'Afternoon', 'Evening']

  return greetingArr[ Math.floor(hours / 6) ]
}

greeting.textContent = `Good ${getTimeOfDay()}`

const userName = document.querySelector('.greeting-container input')
console.log(userName)

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

