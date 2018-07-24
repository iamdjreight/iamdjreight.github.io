///////////////////////////////////////////// Database Code
(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBt6G7qtbkOkybsDP8sTHHIRwfR-FH0BCw",
    authDomain: "djreight-events.firebaseapp.com",
    databaseURL: "https://djreight-events.firebaseio.com",
    projectId: "djreight-events",
    storageBucket: "djreight-events.appspot.com",
    messagingSenderId: "963237232182"
  };

  firebase.initializeApp(config);
  
  firebase.auth().signInAnonymously();
  
  let database = firebase.database();
  let ref = database.ref('events');

  // Query DB - init UI once
  ref.once('value', getDBData, DBerror);


  function getDBData(data) {
    let eventData = data.val();
    let keys = Object.keys(eventData);
    let events = [];

    keys.forEach(key => {
      let date = eventData[key].date;
      let venue = eventData[key].venue;
      let time = eventData[key].time;

      events.push(new Event(date, venue, time));
    })

    createCalendar(events);
  }

  function DBerror(error) {
    console.log(`ERROR! : ${error}`);
  }

  //////////////////////////////////////////////////// UI Code


  function Event(date, venue, time) {
    this.date = date;
    this.venue = venue;
    this.time = time;
  }

  function createCalendar(events) {
    events.forEach(event => {
      addToCalendar(event);
    });
  }

  // Add to UI
  function addToCalendar(event) {
    const tableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    // row.id = event.key;
    row.innerHTML = `
  <td>${event.date}</td>
  <td>${event.venue}</td>
  <td>${event.time}</td>
  `;

    tableBody.appendChild(row);
  }

  location.reload();
}());
