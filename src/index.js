// Your code here
function displayRamens() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        const ramenMenu = document.getElementById('ramen-menu');
        data.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.addEventListener('click', () => handleClick(ramen));
          ramenMenu.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching ramen data:', error));
  }
  
  function handleClick(ramen) {
    const ramenDetail = document.getElementById('ramen-detail');
    ramenDetail.innerHTML = `<p>${ramen.comment}</p><p>${ramen.rating}</p>`;
  }
  
  function addSubmitListener() {
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const ramenName = document.getElementById('ramen-name').value;
      const ramenImage = document.getElementById('ramen-image').value;
      const ramenComment = document.getElementById('ramen-comment').value;
      const ramenRating = document.getElementById('ramen-rating').value;
  
      const ramenMenu = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = ramenImage;
      img.alt = ramenName;
      img.addEventListener('click', () => handleClick({name: ramenName, comment: ramenComment, rating: ramenRating}));
      ramenMenu.appendChild(img);
  
      // Clear input fields after submission
      document.getElementById('ramen-name').value = '';
      document.getElementById('ramen-image').value = '';
      document.getElementById('ramen-comment').value = '';
      document.getElementById('ramen-rating').value = '';
    });
  }
  
  function main() {
    displayRamens();
    addSubmitListener();
  }
  
  // Invoke main after the DOM has fully loaded
  document.addEventListener('DOMContentLoaded', main);

  document.addEventListener('DOMContentLoaded', function() {
    // Function to make GET request
    function fetchData(url, callback) {
      fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Function to display movie details
    function displayMovieDetails(movie) {
      const poster = document.getElementById('movie-poster');
      const title = document.getElementById('movie-title');
      const runtime = document.getElementById('movie-runtime');
      const showtime = document.getElementById('movie-showtime');
      const availableTickets = document.getElementById('available-tickets');
      const description = document.getElementById('movie-description');
      const buyButton = document.getElementById('buy-ticket');
  
      poster.src = movie.poster;
      title.textContent = movie.title;
      runtime.textContent = `Runtime: ${movie.runtime} minutes`;
      showtime.textContent = `Showtime: ${movie.showtime}`;
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;
      description.textContent = movie.description;
  
      // Update buy button text and disabled state based on ticket availability
      if (ticketsAvailable > 0) {
        buyButton.textContent = 'Buy Ticket';
        buyButton.disabled = false;
      } else {
        buyButton.textContent = 'Sold Out';
        buyButton.disabled = true;
      }
  
      // Add event listener to buy button
      buyButton.addEventListener('click', () => buyTicket(movie.id, ticketsAvailable));
    }
  
    // Function to display movies menu
    function displayMoviesMenu(movies) {
      const filmsList = document.getElementById('films');
      filmsList.innerHTML = '';
      movies.forEach(movie => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film', 'item');
        if (movie.capacity - movie.tickets_sold === 0) {
          filmItem.classList.add('sold-out');
        }
        filmItem.textContent = movie.title;
        filmItem.addEventListener('click', () => {
          fetchData(`/films/${movie.id}`, displayMovieDetails);
        });
        filmsList.appendChild(filmItem);
      });
    }
  
    // Function to handle buying a ticket
    function buyTicket(movieId, availableTickets) {
      if (availableTickets > 0) {
        const updatedTickets = availableTickets - 1;
        const availableTicketsElement = document.getElementById('available-tickets');
        availableTicketsElement.textContent = `Available Tickets: ${updatedTickets}`;
      }
    }
  
    // Load initial movie details and movies menu
    fetchData('/films/1', displayMovieDetails);
    fetchData('/films', displayMoviesMenu);
  });