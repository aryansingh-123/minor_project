const scriptURL = 'https://script.google.com/macros/s/AKfycbyg7mhfRtJxwElNqFuE-9bzWQbXVTySIOcMl7oKhTXpjw5OghsI6LWysCctslxzP057gg/exec'

const form = document.forms['submit-to-google-sheet']

const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {
        method: 'POST', body: new FormData(form)})
        .then(response =>{
            alert("Problem received Successfully  , We will contact you soon as soon as Possible.")
            setTimeout(function(){
                msg.innerHTML = ""
            }, 1000)
            form.reset()
        })
        .catch(error => console.error('Error !', error.message))
})
