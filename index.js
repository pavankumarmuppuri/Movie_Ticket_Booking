const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const proceedBtn = document.getElementById('proceedBtn');
const paymentOptions = document.getElementById('paymentOptions');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);

  // Show proceed button if seats are selected
  if (selectedSeatsCount > 0) {
    proceedBtn.style.display = 'block';
  } else {
    proceedBtn.style.display = 'none';
  }
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Proceed to Payment button click event
proceedBtn.addEventListener('click', () => {
  // Show payment options section
  paymentOptions.style.display = 'block';
});

// Confirm Payment button click event
// Confirm Payment button click event
confirmPaymentBtn.addEventListener('click', () => {
  // Get the selected payment method
  const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

  if (selectedPaymentMethod) {
    // Perform actions based on the selected payment method
    const paymentMethod = selectedPaymentMethod.value;
    // Implement payment processing logic here

    // Display "Payment Successful" message
    paymentOptions.innerHTML = '<h2>Payment Successful</h2>';
  } else {
    alert('Please select a payment method.');
  }
});

// Initial count and total set
updateSelectedCount();
