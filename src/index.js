function homeDiv() {return document.querySelector('div.columns')}
function resetBtn() {return document.querySelector('button.reset')}
const homeSection = document.querySelector('section.hero')
const htmlTag = document.querySelector('html')

document.addEventListener('DOMContentLoaded', event=>{
  fetch('http://localhost:3000/signs/')
  .then(response=>{return response.json()})
  .then(signsArr=>{
    signsArr.forEach(sign=>{
      console.log(sign)
    })
  })
})

//home form
homeDiv().addEventListener('click', event=>{
  if (event.target.tagName === "BUTTON") {
    let userName = event.target.parentElement.parentElement.querySelector('#name').value;
    let dateBirth = event.target.parentElement.parentElement.querySelector('#dob').value;
    if (userName == "" || dateBirth == "") {
      alert('Are you a ghost, child?')
    } else {
      homeSection.classList.toggle('running');
      htmlTag.style.backgroundImage = "url('https://files.slack.com/files-pri/T02MD9XTF-FHWM0P4Q5/otheroption.jpg')";
    }
  }
})

//page refresh
resetBtn().addEventListener('click', event=>{
  location.reload()
})
