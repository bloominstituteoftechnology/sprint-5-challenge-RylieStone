
async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  const learners = await axios.get("http://localhost:3003/api/learners")
  const mentors = await axios.get("http://localhost:3003/api/mentors").then(document.querySelector(".info").textContent = "No learner is selected")
  const learnerArr = Array.from(learners.data)
  const mentorArr = Array.from(mentors.data)
    
  learnerArr.forEach(learner => {
    let names = []
    learner.mentors.forEach(id => {
      let filterMentors = mentorArr.filter(mentor => mentor.id === id)
      names.push(filterMentors[0].firstName + " " + filterMentors[0].lastName)
    })
    
    for (let i = 0; i < learner.mentors.length; i++) {
      learner.mentors[i] = names[i]
    }
  }) // the id's are replaced with mentors names

  // i need to transfer the elements to dom
  function cardMaker(learner) {
    let card = document.createElement("div")
    let namePlate = document.createElement("h3")
    let email = document.createElement("div")
    let mentorDrop = document.createElement("h4")
    let mentors = document.createElement("ul")

    card.classList.add("card")
    mentorDrop.classList.add("closed")

    namePlate.textContent = learner.fullName
    email.textContent = learner.email
    mentorDrop.textContent = "Mentors"
    
    learner.mentors.forEach(mentor => {
      let mentorL = document.createElement("li")
      mentorL.textContent = mentor
      mentors.appendChild(mentorL)
    })

    card.appendChild(namePlate)
    card.appendChild(email)
    card.appendChild(mentorDrop)
    card.appendChild(mentors)

    mentorDrop.addEventListener("click", () => {
      if (card.classList.contains("selected")) {
        event.stopPropagation()
      mentorDrop.classList.toggle("closed")
      mentorDrop.classList.toggle("open")
      } else {
        mentorDrop.classList.toggle("closed")
      mentorDrop.classList.toggle("open")
      }
    })
    card.addEventListener("click", () => {
      if (!card.classList.contains("selected")) {
        
        document.querySelectorAll(".card").forEach(card => {
          card.classList.remove("selected")
          namePlate.textContent = learner.fullName // why isnt this working
        })

        card.classList.add("selected")
        namePlate.textContent = `${learner.fullName}, ID ${learner.id}`
        document.querySelector(".info").textContent = "The selected learner is " + learner.fullName
      } else {
        
        document.querySelectorAll(".card").forEach(card => {
          card.classList.remove("selected")
          console.log("log")
          namePlate.textContent = learner.fullName
        })

        document.querySelector(".info").textContent = "No learner is selected"
      }
    })
    return card
  }
  learnerArr.forEach(learner => {
    document.querySelector(".cards").appendChild(cardMaker(learner))
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
