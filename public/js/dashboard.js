// Sidebar Toggle

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

document.querySelector('.menu-icon').addEventListener('click', openSidebar);
document.getElementById('dashClose').addEventListener('click', closeSidebar);

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// Append Card

function appendCard() {
  const mainCards = document.querySelector('.main-cards');
  const plusCard = document.querySelector('.main-cards .add-card');

  // Creating the <a> container
  const newLink = document.createElement('a');
  newLink.href = "/trips/edit";
  newLink.className = 'card-link';

  // Creating the card
  const newCard = document.createElement('div');
  newCard.className = 'card';

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const pText = document.createElement('p');
  pText.className = 'text-primary font-weight-bold';
  pText.textContent = 'New Destination';

  const pDate = document.createElement('p');
  pDate.className = 'text-secondary';
  pDate.textContent = 'Date Here';

  cardInner.appendChild(pText);
  newCard.appendChild(cardInner);
  newCard.appendChild(pDate);

  newLink.appendChild(newCard);

  mainCards.insertBefore(newLink, plusCard);

  // Data for the new card
  const tripData = {
      title: 'New Destination',
      date: 'Date Here'
  };

  fetch('/trips/create-trip', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
  })
  .then(response => {
      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
          // Trip successfully created in the database
          console.log("Trip saved in the database!");
      } else {
          console.error("Error saving the trip:", data.error);
      }
  })
  .catch((error) => {
      console.error('There was a problem with the fetch operation:', error.message);
  });
}
