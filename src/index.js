function homeDiv() {return document.querySelector('div.columns')}

document.addEventListener('DOMContentLoaded', event=>{
  fetch('http://localhost:3000/signs/')
  .then(response=>{return response.json()})
  .then(signsArr=>{
    signsArr.forEach(sign=>{
      console.log(sign)
    })
  })
})

homeDiv().addEventListener('click', event=>{
  if (event.target.tagName === "BUTTON") {
    console.log('You clicked the Submit')
    let userName = event.target.parentElement.parentElement.querySelector('#name').value
    let dateBirth = event.target.parentElement.parentElement.querySelector('#dob').value
    // debugger
  } else {
    console.log('Almost')
  }
})
