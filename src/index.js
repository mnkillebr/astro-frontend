function homeDiv() {return document.querySelector('div.columns')}
function resetBtn() {return document.querySelector('button.reset')}
const homeSection = document.querySelector('section.hero')
const htmlTag = document.querySelector('html')
const htmlBody = document.querySelector('body')
function gameDiv() {return document.querySelector('.tile.is-ancestor')}
let matches = []

function gameBtnClick() {
  gameDiv().addEventListener('click', event=>{
    if (event.target.tagName === 'BUTTON') {
      document.querySelector('canvas#background').id = 'play'
      event.target.remove()

    }
  })
}

document.addEventListener('DOMContentLoaded', event=>{
  Sign.getAll()
  .then(signsArr=>{
    signsArr.forEach(sign=>{
      const newSign = new Sign(sign)
    })
  })
  Sign.getAllMatchings()
  .then(matchingArr=> {
    matchingArr.forEach(matchy=>{
      matches.push(matchy)
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
      htmlTag.classList.add('new');
      let birthMonth = parseInt(dateBirth.split("-")[1]);
      let birthDay = parseInt(dateBirth.split("-")[2]);

      let userSign = Sign.all.filter((element)=>{return element.name==Sign.getSign(birthDay, birthMonth)})[0]
      let traitsList = ""
      let matchesArr = []
      let enemiesArr = []
      let matchesList = ""
      let enemiesList = ""
      userSign.traits.split(" ").forEach((trait) => {
        traitsList += `<li>${trait}</li>`
      })
      matches.forEach((match) => {
        if(match.sign.name == userSign.name && match.compatible === true){
          matchesArr.push(match.matched_sign)
        }
        else if(match.sign.name == userSign.name && match.compatible === false){
          enemiesArr.push(match.matched_sign)
        }
        else{}
      })
      matchesArr.forEach((el) => {
        matchesList += `<li>${el.name}<img src="${el.image}" height="30" width="30"></li>`
      })
      enemiesArr.forEach((el) => {
        enemiesList += `<li>${el.name}<img src="${el.image}" height="30" width="30"></li>`
      })
      htmlBody.innerHTML += createSignHTML(userSign, traitsList, matchesList, enemiesList)
      resetBtn().addEventListener('click', event=>{
        location.reload()
      })
      gameBtnClick()
    }
  }
})



const createSignHTML = (userSign, traitsList, matchesList, enemiesList) => {
  return `
            <div class="tile is-ancestor">
              <div class="tile is-4 is-vertical is-parent">
                <div id="welcome" class="tile is-child box">
                  <p class="title">Hello, ${userSign.name}.</p>
                  <p id="description">${userSign.description}</p>
                </div>
                <div id="traits" class="tile is-child box">
                  <p class="title">${userSign.name} Traits</p>
                    <ul>
                      ${traitsList}
                    </ul>
                </div>
              </div>
              <button class="play">Play</button>
              <div class="tile is-4 is-vertical is-parent">
                <div id="matches" class="tile is-child box">
                  <p class="title">Most compatible signs:</p>
                    <ul>
                      ${matchesList}
                    </ul>
                </div>
                <div id="enemies" class="tile is-child box">
                  <p class="title">Least compatible signs:</p>
                    <ul>
                      ${enemiesList}
                    </ul>
                </div>
              </div>
            </div>`
}

//page refresh
resetBtn().addEventListener('click', event=>{
  debugger
  location.reload()
})
