function getTxt(id) {
    return document.getElementById(id)
}

function getRs() {
    let txt = getTxt('txtIn').value
    const date = new Date()

    getTxt('entry').innerHTML += `<div><p>${txtIn.value}</p>
    <small>${date.toLocaleDateString()}</small?</div>`
}