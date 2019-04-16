class Sign {
  constructor({id, image, name, date_range, description, traits}) {
    this.id = id
    this.image = image
    this.name = name
    this.date_range = date_range
    this.description = description
    this.traits = traits
    Sign.all.push(this)
  }
  static getAll() {
    return fetch('http://localhost:3000/signs')
    .then(response=>{return response.json()})
  }
  static getSign(birthDay, birthMonth) {
    let userSign = ""
    if ((birthMonth == 1 && birthDay >= 20)||(birthMonth == 2 && birthDay <=18)) {
      return userSign = "Aquarius"
    } else if ((birthMonth == 2 && birthDay >= 19)||(birthMonth == 3 && birthDay <=20)) {
      return userSign = "Pisces"
    } else if ((birthMonth == 3 && birthDay >= 21)||(birthMonth == 4 && birthDay <=19)) {
      return userSign = "Aries"
    } else if ((birthMonth == 4 && birthDay >= 20)||(birthMonth == 5 && birthDay <=20)) {
      return userSign = "Taurus"
    } else if ((birthMonth == 5 && birthDay >= 21)||(birthMonth == 6 && birthDay <=20)) {
      return userSign = "Gemini"
    } else if ((birthMonth == 6 && birthDay >= 21)||(birthMonth == 7 && birthDay <=22)) {
      return userSign = "Cancer"
    } else if ((birthMonth == 7 && birthDay >= 23)||(birthMonth == 8 && birthDay <=22)) {
      return userSign = "Leo"
    } else if ((birthMonth == 8 && birthDay >= 23)||(birthMonth == 9 && birthDay <=22)) {
      return userSign = "Virgo"
    } else if ((birthMonth == 9 && birthDay >= 23)||(birthMonth == 10 && birthDay <=22)) {
      return userSign = "Libra"
    } else if ((birthMonth == 10 && birthDay >= 23)||(birthMonth == 11 && birthDay <=21)) {
      return userSign = "Scorpio"
    } else if ((birthMonth == 11 && birthDay >= 22)||(birthMonth == 12 && birthDay <=21)) {
      return userSign = "Sagittarius"
    } else if ((birthMonth == 12 && birthDay >= 22)||(birthMonth == 1 && birthDay <=19)) {
      return userSign = "Capricorn"
    }
  }
}
Sign.all = []
