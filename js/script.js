//1 clock and time
const time = document.querySelector('.time')
const date = document.querySelector('.date')

function showTime() {
  const todayDate = new Date()

  const hours = todayDate.getHours() < 10 ? '0' + todayDate.getMinutes() : todayDate.getMinutes()
  const minutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : todayDate.getMinutes()
  const seconds = todayDate.getSeconds() < 10 ? '0' + todayDate.getSeconds() : todayDate.getSeconds()

  time.textContent = `${hours}:${minutes}:${seconds}`
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