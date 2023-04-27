
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzHd7Qu6s_ckkv12MDCVGgSP7p-4KezUtwc72YnrSW-097JQTweTgDQZ_N-KdwS4p7h2g/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        alert("Thank you .!")
            setTimeout(function(){
                msg.innerHTML = ""
            }, 1000)
            form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })
