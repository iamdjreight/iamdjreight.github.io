// Vars
const today = new Date(),
    date = today.getDate(),
    dayOfWeek = today.getDay(),
    daysFromThursday = dayOfWeek - 4,
    calendarArray = [];

let thursday = new Date(today.setDate(date - daysFromThursday)),
    thursdayEpoch,
    weeks = 0;

// Create list of Thursdays
while (weeks < 10){
  thursdayEpoch = thursday.getTime();  
  calendarArray.push(thursdayEpoch);
  thursday = new Date(thursday.setDate(thursday.getDate() + 7));
  weeks++;
}

// Create Calendar
let tableBody = document.querySelector('tbody'),
    row = document.createElement('tr'),
    data = document.createElement('td');

// calendarArray.forEach(thurs => console.log(new Date(thurs)));

calendarArray.forEach(function (thurs){
  if(thurs > new Date().getTime()){ 
    const tableBody = document.querySelector('tbody'),
          tableRow = document.createElement('tr'),
          tableData = document.createElement('td'),
          tableData2 = document.createElement('td'),
          tableData3 = document.createElement('td');
          
    let month = new Date(thurs).getMonth() + 1,
        day = new Date(thurs).getDate(),
        year = new Date(thurs).getFullYear().toString().substring(2),
        tdText = `${month}/${day}/${year}`;

    tableData.appendChild(document.createTextNode(tdText));
    tableData2.appendChild(document.createTextNode("Havana House"));
    tableData3.appendChild(document.createTextNode("9:00 pm"));
    
    tableRow.appendChild(tableData);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    
    tableBody.appendChild(tableRow);   

  }
});

