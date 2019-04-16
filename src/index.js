function homeDiv() {return document.querySelector('div.columns')}
function resetBtn() {return document.querySelector('button.reset')}
const homeSection = document.querySelector('section.hero')
const htmlTag = document.querySelector('html')

document.addEventListener('DOMContentLoaded', event=>{
  Sign.getAll()
  .then(signsArr=>{
    signsArr.forEach(sign=>{
      const newSign = new Sign(sign)
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
      let birthMonth = parseInt(dateBirth.split("-")[1]);
      let birthDay = parseInt(dateBirth.split("-")[2]);
      const userSign = Sign.all.filter((element)=>{return element.name==Sign.getSign(birthDay, birthMonth)})[0]
      debugger
    }
  }
})

//page refresh
resetBtn().addEventListener('click', event=>{
  location.reload()
})
