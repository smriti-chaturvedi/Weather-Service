const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.getElementById('para1')
const p2 = document.getElementById('para2')

p1.textContent = ''
p2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    p1.textContent = 'Loading.....'
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            p1.textContent = data.error
            p2.textContent = ''
        }
        else{
            p1.textContent = data.location
            p2.textContent = data.forecast
        }
    })
})
})


