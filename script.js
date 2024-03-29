
var itin_items = [];
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calender = getTxt('calender');

function onLoad() {
    let calender = document.getElementById('itinerary_calender');
    let inputBox = document.getElementById('enter');
    
    calender.style.display = 'none';
}

function load() {
    const dt = new Date();
    //console.log(dt);
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
        console.log(dt);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); 

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calender.innerHTML = '';

    //console.log(daysInMonth);
    for(let i = 1; i <= 42; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i <= paddingDays || i > (daysInMonth + paddingDays)) {
            daySquare.classList.add('padding');
        } else {
            daySquare.innerText = i - paddingDays;
            
            //daySquare.addEventListener('mouseover', () => console.log('click'));
        }
        //console.log(daySquare);
        calender.appendChild(daySquare);
    }

    let eventNum = 0;
    let calenderDays = document.querySelectorAll('.day');
    let dayEvent;
    let hoverEvent;
    let hoverNodes;
    let lastNode;
    let addressLink;
    //console.log(calenderDays);

    calenderDays.forEach(day => {
        hoverEvent = document.createElement('div');
        itin_items.forEach(activity => {
            if (new Date(activity.date).getMonth() == dt.getMonth() && 
            new Date(activity.date).getFullYear() == dt.getFullYear() && 
            day.innerHTML == new Date(activity.date).getDate()) {
                eventNum++;
                hoverEvent.innerHTML += 
                `<div style="color: white;">
                <a href="https://maps.google.com/?q=${activity.address}" target="_blank" 
                style="font-size:13px" >${activity.activity}</a></div>`

                //console.log(hoverEvent);
                //console.log('!!');
            }
        })
        if (eventNum != 0) {
            dayEvent = document.createElement('div');
            dayEvent.classList.add('eventNum');
            dayEvent.innerText = eventNum;
            //console.log(dayEvent);
            day.append(dayEvent);
            //console.log(day);
            eventNum = 0;
            day.classList.add('hover');
            hoverEvent.classList.add('itin_hover');

            if (Array.prototype.indexOf.call(day.parentElement.childNodes, day) >= 35) {
                hoverEvent.classList.add('last_row');
                //console.log('added!');
            }
            day.append(hoverEvent);

            hoverNodes = document.querySelectorAll('.itin_hover');
            lastNode = hoverNodes[hoverNodes.length - 1];

            day.addEventListener('mouseover', () => {
                //console.log(lastNode);
                day.lastChild.style.display = 'block';
            });
            day.addEventListener('mouseout', () => {
                day.lastChild.style.display = 'none';            });
        }
    })
    let i = 1;
    let dt2 = new Date(dt);
    
    document.querySelector('.itinerary_entry').innerHTML = "";
    while (i <= daysInMonth) {
        dt2.setDate(i);
        document.querySelector('.itinerary_entry').innerHTML += `<p class="listDay">${dt.toLocaleDateString('en-us', {month: 'long'})} 
        ${i} - ${weekdays[dt2.getDay()]}</p>`;

        itin_items.forEach(element => {
            if(dt2.getFullYear() == new Date(element.date).getFullYear() &&
            dt2.getMonth() == new Date(element.date).getMonth() && 
            dt2.getDate() == new Date(element.date).getDate()) {
                document.querySelector('.itinerary_entry').innerHTML += 
                `<div class="card"><p>${element.activity}</p>
                <a href="https://maps.google.com/?q=${element.address}" target="_blank">${element.address}</a>`;
            }
        }); 
        i++;
    }
    

}

function initButton() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
        console.log(nav);
    });
}
initButton();
function getTxt(id) {
    return document.getElementById(id)
}

function getRs() {
    var txt = getTxt('txtIn')
    const date = new Date()

    getTxt('entry').innerHTML += `<div class="card"><p>${txtIn.value}</p>
    <small class="dateTime">${date.toLocaleTimeString()}, 
    ${date.toLocaleDateString()}</small></div>`
    txt.value = '';
    addText()

}

function addText() {
    var list = document.getElementById('journal_list');
    var node = document.createElement('div');
    let noteId = 'n' + Math.floor(Math.random() * 1000000);

    node.classList.add('entry_preview', noteId);

    //creates a new textarea
    document.getElementById('journal_note').insertAdjacentHTML('beforeend', 
    `<textarea class='journal_title ${noteId}'>New Entry</textarea><textarea class='journal_entry ${noteId}'></textarea>`);

    //add event listener to textarea to allow tabs to indent
    //needs to be fixed -------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----------
    document.querySelector('.journal_entry').addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

            this.selectionStart = this.selectionEnd = start + 1;
        }
    });

    //adds event listener to show related text area when clicked
    node.addEventListener("click", () => {
        let selectedElement = document.querySelector('.--selected');
        if (selectedElement != null) {
            //console.log('removed');
            selectedElement.classList.remove('--selected');
        }
        node.classList.add('--selected');

        //takes all textarea in journal_list, changes their display to none,
        //then sets display to block for the selected element only
        let allNotes = document.querySelectorAll('.journal_title, .journal_entry');

        //console.log(allNotes);
        allNotes.forEach(note => {
            if(note.classList.contains(node.classList[1])) {
                note.style.display = 'block';
            }
            else {
                note.style.display = 'none';
            }
        });

    });
    var newText = `<div><p>New Entry</p><small class='datetime'>${new Date().toDateString()}</small></div><button class='small_button delete_button' onClick="deleteNote()">x</button>`;
    node.insertAdjacentHTML('beforeend', newText);
    list.insertBefore(node, list.firstChild);
    
    const buttons = document.querySelectorAll('.delete_button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const itemToDelete = document.querySelectorAll('.' + button.parentElement.classList[1]);
            itemToDelete.forEach(item => {
                item.remove();
            });
            //button.parentElement.remove();
        })
    });
}

function deleteNote() {
    const buttons = document.querySelector('.delete_button');  
    console.log('deleted!');
}

function addBudget() {
    var inputBox = getTxt('budget_enter');
    if (inputBox.style.display == "none") {
        inputBox.style.display = 'block';
    }
    else {
        inputBox.style.display = "none";
        
        
    }
}

//adds a div that provides information of an added expense
function addExp() {
    const amount = document.querySelector('.budget_amount');
    const catagory = document.querySelector('.budget_catag');
    const date = document.querySelector('.budget_date');
    
    document.querySelector('.budget_entry').innerHTML += 
    `<div class="card"><p>${catagory.value}</p>
    <p>${amount.value}</p>
    <small class="dateTime">${date.value}</small></div>`
    
    amount.value = '';
    catagory.value = '';
    date.value = 'mm/dd/yyyy';
    
    //add script to add amount to chosen catagory 

    console.log(amount.value);
    console.log(catagory.value);
    console.log(date.value);
    
}

//itinerary


function addItinerary() {
    
    var inputBox = getTxt('enter')

    if (inputBox.style.display == "none") {

        inputBox.style.display = 'flex';
        inputBox.style.flexDirection = 'column';
    }
    else {
        inputBox.style.display = "none";
    }
}

function itineraryMode() {
    var calender = getTxt('itinerary_calender');
    var entry = getTxt('itin_entry');
    //console.log(entry);

    if (calender.style.display == 'none') {
        calender.style.display = 'flex';
        calender.style.flexDirection = 'column';
        entry.style.display = 'none';
    }
    else {
        calender.style.display = 'none';
        entry.style.display = 'flex';
    }
}

function addItineraryItem() {
    let date = getTxt('itin_date').value;
    let activity = getTxt('itin_activity').value;
    let address = getTxt('itin_address').value;

    itin_items.push({date, activity, address});
    itin_items.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
    load();

    getTxt('itin_activity').value = "";
    getTxt('itin_address').value = "";

}

function itineraryList() {
    document.querySelector('.itinerary_entry').innerHTML = "";

    itin_items.forEach(element => {
        document.querySelector('.itinerary_entry').innerHTML += 
        `<div class="card"><p>${element.activity}</p>
        <a href="https://maps.google.com/?q=${element.address}" target="_blank">${element.address}</a>
        <small class="dateTime">${element.date}</small></div>`;

    }); 
}