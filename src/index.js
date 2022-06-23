const movieURL = 'http://localhost:3000/films'
const movieList = document.getElementById('films')
const remainingTickets = document.getElementById('ticket-num')
const extraContent = document.getElementById('extras')

// first fetch will be to films/1
// see the first movies details including poster, title, runtime, showtime, available tickets on page load.
// available tickets is number of tickets sold - capacity

fetch ('http://localhost:3000/films/1')
.then(res => res.json())
.then(data => renderMainDisplay(data))

function renderMainDisplay (obj) {
    const poster = document.getElementById('poster')
    const title = document.getElementById('title')
    const runtime = document.getElementById('runtime')
    const descriptioin = document.getElementById('film-info')
    const showtime = document.getElementById('showtime')
    const buyTicketButton = document.createElement('button')

    buyTicketButton.id = obj.id
    buyTicketButton.textContent = 'Buy Ticket'
    buyTicketButton.className = 'ui orange button'
    poster.src = obj.poster
    title.textContent = obj.title
    runtime.textContent = obj.runtime
    descriptioin.textContent = obj.description
    showtime.textContent = obj.showtime
    remainingTickets.textContent = obj.capacity - obj.tickets_sold


    // buy a ticket.  if 0 tickets available, cannot buy.  when ticket is purchased count should decrease by 1
    buyTicketButton.addEventListener('click', () => {
        //console.log('ya clicked me')
        filmItem = document.getElementById(`movie-title ${obj.id}`)
        if (parseInt(remainingTickets.textContent) > 0){
            remainingTickets.textContent = remainingTickets.textContent - 1
        }   else {
            remainingTickets.textContent = `Sorry, this film has sold out.  Try again later! 0 `
            buyTicketButton.textContent = 'Sold Out'
            filmItem.className = 'sold-out'
        }
        // if (buyTicketButton.id === parseInt(movieTitle.id)) {
        //     movieTitle.className = 'sold-out'
        // }
    })
    if (extraContent.child === buyTicketButton){
        console.log('do not need a button')
    } else {
        extraContent.append(buyTicketButton)
    }

}

// see a menu of all movies on the lft side in ul#films on page load. (style them by adding class film item to each li)

fetch (movieURL)
.then(res => res.json())
.then(data => data.forEach(renderMovieList))

function renderMovieList (obj) {

    const movieTitle = document.createElement('li')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = `x`
    deleteButton.addEventListener('click', (e) => {
        movieTitle.remove()
    })
    movieTitle.className = 'film item'
    movieTitle.textContent = obj.title
    movieTitle.id = `movie-title ${obj.id}`
    movieTitle.addEventListener('click', () => {
        //console.log('yarrrrr clicked i was')
        renderMainDisplay(obj)
    })

    movieTitle.append(deleteButton)
    movieList.append(movieTitle)
}

