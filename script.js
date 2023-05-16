
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

function addExp() {
    const amount = document.querySelector('.budget_entry').value;
    const catagory = document.querySelector('.budget_catag').value;
    const date = document.querySelector('.budget_date').value;
    
    document.querySelector('.budget_entry').innerHTML += 
        `<div> </div>`

    console.log(amount);
    console.log(catagory);
    console.log(date);
}
