function Event(date, venue, time) {
  this.date = date;
  this.venue = venue;
  this.time = time;
}

function clearInputs() {
  document.getElementById('date').value = '';
  document.getElementById('venue').value = '';
  document.getElementById('time').value = '';
}

function getEvents() {
  let events;
  if (localStorage.getItem('events') === null) {
    events = [];
  }
  else {
    events = JSON.parse(localStorage.getItem('events'));
  }

  return events;
}

function createCalendar() {
  const events = getEvents();

  events.forEach(event => {
    addToCalendar(event);
  });
}

function addToCalendar(event) {
  const tableBody = document.querySelector('tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
  <td>${event.date}</td>
  <td>${event.venue}</td>
  <td>${event.time}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  tableBody.appendChild(row);
}

function addToLocalStorage(event) {
  const events = getEvents();

  events.push(event);

  localStorage.setItem('events', JSON.stringify(events));
}

function removeFromLocalStorage(venue) {
  const events = getEvents();

  events.forEach(function (event, index) {
    if (event.venue === venue) {
      events.splice(index, 1);
    }
  });

  localStorage.setItem('events', JSON.stringify(events));

}




// Add event
document.querySelector('button').addEventListener('click', function () {
  let rawDate = document.getElementById('date').value.split('-'),
    year = rawDate.shift();
  rawDate.push(year);

  let rawTime = document.getElementById('time').value.split(':');

  if (rawTime[0] > '12'){
    rawTime[0] = String(rawTime[0] - 12);
    rawTime = rawTime.join(':') + ' pm';
  }
  else {
    rawTime = rawTime.join(':') + ' am';
  }


  const date = rawDate.join('-'),
    venue = document.getElementById('venue').value,
    time = rawTime,
    event = new Event(date, venue, time);

  console.log(event.date, event.venue, event.time);

  addToCalendar(event);

  addToLocalStorage(event);

  clearInputs();

});

// Remove event
document.querySelector('tbody').addEventListener('click', function (e) {
  console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
  if (e.target.className === 'delete') {
    e.target.parentElement.parentElement.remove();
  }
  removeFromLocalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});

document.addEventListener('DOMContentLoaded', createCalendar);