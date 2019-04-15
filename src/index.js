function homeDiv() {return document.querySelector('div.columns')}
function resetBtn() {return document.querySelector('button.reset')}
const homeSection = document.querySelector('section.hero')

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
    homeSection.classList.toggle('running')
  } else {
    console.log('Almost')
  }
})

resetBtn().addEventListener('click', event=>{
  location.reload()
})
