function getTxt(id) {
    return document.getElementById(id)
}

function getRs() {
    let txt = getTxt('txtIn').value
    const date = new Date()

    getTxt('entry').innerHTML += `<div class="card"><p>${txtIn.value}</p>
    <small>${date.toLocaleTimeString()}, 
    ${date.toLocaleDateString()}</small?</div>`
    document.getElementById('txtIn').remove()

}