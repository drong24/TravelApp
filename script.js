

var Lodging = 0;
var Transportation = 0;
var Food = 0;
var Others = 0;



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
    var inputBox = getTxt('enter')
    if (inputBox.style.display == "none") {

        inputBox.style.display = 'block';
    }
    else {
        inputBox.style.display = "none";
    }

}

function addBudget() {
    var inputBox = getTxt('budget_enter')
    if (inputBox.style.display == "none") {

        inputBox.style.display = 'block';
    }
    else {
        inputBox.style.display = "none";
    }
}

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
/*
    console.log(amount);
    console.log(catagory);
    console.log(date);
    console.log(Lodging);
    */
}

