const display = document.querySelector('#showData')
const fetchButton = document.querySelector('#getData')

fetchButton.addEventListener('click', async event =>{
    const response = await fetch('/hamsters')
    const json = await response.json()

    let text = JSON.stringify(json, null, ' ')
    display.innerHTML = text
})