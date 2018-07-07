///////////////////////////////////////////// Database Code

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAN_NR2gl7cInyo9tB49DXB7GKAKkdR-fY",
  authDomain: "djreight-92d83.firebaseapp.com",
  databaseURL: "https://djreight-92d83.firebaseio.com",
  projectId: "djreight-92d83",
  storageBucket: "djreight-92d83.appspot.com",
  messagingSenderId: "232510634936"
};

firebase.initializeApp(config);

let database = firebase.database();
let ref = database.ref('events');

// Query DB - init UI once
// ref.on('value', getDBData, DBerror);
ref.once('value', getDBData, DBerror);


function getDBData(data) {
  let eventData = data.val();
  let keys = Object.keys(eventData);
  let events = [];

  keys.forEach(key => {
    let date = eventData[key].date;
    let venue = eventData[key].venue;
    let time = eventData[key].time;

    // console.log(key, date, venue, time);

    events.push(new Event(key, date, venue, time));
    // events.push(new Event(key, date, venue, time));
  })

  createCalendar(events);
}

function DBerror(error) {
  console.log(`ERROR! : ${error}`);
}

//////////////////////////////////////////////////// UI Code


function Event(key, date, venue, time) {
  this.key = key;
  this.date = date;
  this.venue = venue;
  this.time = time;
}

function DBEvent(date, venue, time) {
  this.date = date;
  this.venue = venue;
  this.time = time;
}

function clearInputs() {
  document.getElementById('date').value = '';
  document.getElementById('venue').value = '';
  document.getElementById('time').value = '';
}


function createCalendar(events) {
  events.forEach(event => {
    // console.log(event);
    addToCalendar(event);
  });
}

// Add to UI
function addToCalendar(event) {
  const tableBody = document.querySelector('tbody');
  const row = document.createElement('tr');

  row.id = event.key;
  row.innerHTML = `
  <td>${event.date}</td>
  <td>${event.venue}</td>
  <td>${event.time}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  tableBody.appendChild(row);
}


// Add event
document.querySelector('button').addEventListener('click', function () {
  let rawDate = document.getElementById('date').value.split('-'),
    year = rawDate.shift();
  rawDate.push(year);

  let rawTime = document.getElementById('time').value.split(':');

  if (rawTime[0] > '12') {
    rawTime[0] = String(rawTime[0] - 12);
    rawTime = rawTime.join(':') + ' pm';
  }
  else {
    rawTime = rawTime.join(':') + ' am';
  }


  const date = rawDate.join('-'),
    venue = document.getElementById('venue').value,
    time = rawTime,
    event = new DBEvent(date, venue, time);

  // addToCalendar(event);

  // add to DB
  ref.push(event);

  clearInputs();
  location.reload();
});

// Remove event
document.querySelector('tbody').addEventListener('click', function (e) {
  let DBid = e.target.parentElement.parentElement.id;

  if (e.target.className === 'delete') {
    e.target.parentElement.parentElement.remove();
  }
  // remove from DB
  database.ref(`events/${DBid}`).remove();
});

// Clear calendar UI
function clearCalendar() {
  let tableBody = document.querySelector('tbody');
  let children = tableBody.hasChildNodes();

  while (children) {
    tableBody.deleteRow(0);
  }
  
  ref.on('value', getDBData, DBerror);
}
