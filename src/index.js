// Your code here
document.addEventListener('DOMContentLoaded', () => {
  // Base URL for API
  const baseURL = 'http://localhost:3000';

  // Function to make GET request
  async function fetchData(url) {
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  // Function to display first movie details
  async function displayFirstMovieDetails() {
      const firstMovieData = await fetchData(`${baseURL}/films/1`);
      const { title, runtime, showtime, capacity, tickets_sold, description, poster } = firstMovieData;
      const availableTickets = capacity - tickets_sold;

      // Display movie details in HTML
      document.getElementById('movie-poster').src = poster;
      document.getElementById('title').textContent = title;
      document.getElementById('runtime').textContent = `${runtime} mins`;
      document.getElementById('showtime').textContent = showtime;
      document.getElementById('ticket-num').textContent = `${availableTickets} ticket-num`;
      document.getElementById('film-info').textContent = description;
  }

  // Function to display menu of all movies
  async function displayAllMoviesMenu() {
      const filmsData = await fetchData(`${baseURL}/films`);
      const filmsList = document.getElementById('films');

      filmsData.forEach(film => {
          const li = document.createElement('li');
          li.textContent = film.title;
          li.classList.add('film', 'item');
          li.addEventListener('click', async () => {
              await displayMovieDetails(film.id);
          });
          filmsList.appendChild(li);
      });
  }

  // Function to display movie details
  async function displayMovieDetails(movieId) {
      const movieData = await fetchData(`${baseURL}/films/${movieId}`);
      const { title, runtime, showtime, capacity, tickets_sold, description, poster } = movieData;
      const availableTickets = capacity - tickets_sold;

      // Display movie details in HTML
      document.getElementById('movie-poster').src = poster;
      document.getElementById('title').textContent = title;
      document.getElementById('runtime').textContent = `${runtime} mins`;
      document.getElementById('showtime').textContent = showtime;
      document.getElementById('ticket-num').textContent = `${availableTickets} tickets available`;
      document.getElementById('film-info').textContent = description;
  }

  // Function to handle buying tickets
  async function buyTicket() {
      const movieId = 1; // Assuming buying ticket for the first movie
      const movieData = await fetchData(`${baseURL}/films/${movieId}`);
      const { capacity, tickets_sold } = movieData;

      if (tickets_sold < capacity) {
          const updatedTicketsSold = tickets_sold + 1;
          const updatedMovieData = {
              tickets_sold: updatedTicketsSold
          };

          // Update tickets_sold on the server
          await fetch(`${baseURL}/films/${movieId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedMovieData)
          });

          // Update UI
          await displayFirstMovieDetails();
      } else {
          console.log('Sorry, the showing is sold out.');
      }
  }

  // Event listener for buying tickets button
  document.getElementById('buy-ticket').addEventListener('click', buyTicket);

  // Initialize the application
  displayFirstMovieDetails();
  displayAllMoviesMenu();
});
