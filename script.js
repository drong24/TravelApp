function getTxt(id) {
    return document.getElementById(id)
}

function getRs() {
    let txt = getTxt('txtIn').value
    const date = new Date()

    getTxt('entry').innerHTML = `<div>${txtIn.value}</div>`
}