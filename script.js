function getTxt(id) {
    return document.getElementById(id)
}

function getRs() {
    let txt = getTxt('txtIn').value
    const date = new Date()

    getTxt('entry').innerHTML += `<div class="card"><p>${txtIn.value}</p>
    <small class="dateTime">${date.toLocaleTimeString()}, 
    ${date.toLocaleDateString()}</small?</div>`
    document.getElementById('txtIn').remove()
    document.getElementById('saveButton').remove()

}

function addText() {
    getTxt('enter').innerHTML = `<div><textarea class="journal_entry" id="txtIn"></textarea>
    <button onclick ="getRs()" class="journal_button" id="saveButton" type="submit">Save</button></div>`
}