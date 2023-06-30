




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
    var inputBox = getTxt('budget_enter');
    var spacerBox = getTxt('budget_spacer');
    if (inputBox.style.display == "none") {
        spacerBox.style.height = "0px";
        inputBox.style.display = 'block';
    }
    else {
        spacerBox.style.height = "219px";
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
    /*
    amount.value = '';
    catagory.value = '';
    date.value = 'mm/dd/yyyy';
    */
    //add script to add amount to chosen catagory 

    console.log(amount.value);
    console.log(catagory.value);
    console.log(date.value);
    
}

