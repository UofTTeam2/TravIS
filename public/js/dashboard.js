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
    const plusCard = document.querySelector('.main-cards .card:last-child');
  
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
  
    // Insert the new card right before the "+" card
    mainCards.insertBefore(newCard, plusCard);
  }
  
  document.querySelector('.main-cards .card:last-child').addEventListener('click', appendCard);
  