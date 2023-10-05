let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((toy) => {
      let divCard = document.createElement('div')
      divCard.className = 'card'
      document.getElementById('toy-collection').appendChild(divCard)

      let toyNameH2 = document.createElement('h2')
      toyNameH2.innerText = toy.name 
      divCard.appendChild(toyNameH2)

      let toyImage = document.createElement('img')
      toyImage.src = toy.image 
      toyImage.className = 'toy-avatar'
      divCard.appendChild(toyImage)

      let toyLikes = document.createElement('p')
      toyLikes.innerText = `${toy.likes} likes` 
      divCard.appendChild(toyLikes)

      let toyBtn = document.createElement('button')
      toyBtn.className = 'like-btn'
      toyBtn.id = 'toy-id'
      toyBtn.innerText = 'Like'
      divCard.appendChild(toyBtn)

      toyBtn.addEventListener('click', (e) => {
        let newLikes = toy.likes + 1
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type' :'application/json'},
          body: JSON.stringify ({
            'likes': newLikes
          })
        })
        .then((resp) => resp.json())
        .then((element) => {
          console.log(element)
          let likes = element.likes
          toyLikes.innerText = `${likes} likes` 
        })
      })
    })
  })
  
  let submitButton = document.querySelector("input[class='submit']")
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let toyName = document.querySelector('input[name="name"]')
    let toyUrl = document.querySelector('input[name="image"]')
    let toyObj = {
      'name': `${toyName.value}`,
      'image': `${toyUrl.value}`,
      'likes': 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: { 
        'accept': 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(toyObj)
    })
    .then(resp => resp.json())
    .then((data) => {
      console.log(data)
      let divCard = document.createElement('div')
      divCard.className = 'card'
      document.getElementById('toy-collection').appendChild(divCard)

      let toyNameH2 = document.createElement('h2')
      toyNameH2.innerText = data.name 

      let toyImage = document.createElement('img')
      toyImage.src = data.image 
      toyImage.className = 'toy-avatar'

      let toyLikes = document.createElement('p')
      toyLikes.innerText = `${data.likes} likes` 
      
      
      divCard.appendChild(toyNameH2)
      divCard.appendChild(toyImage)
      divCard.appendChild(toyLikes)

      let toyBtn = document.createElement('button')
      toyBtn.className = 'like-btn'
      toyBtn.id = '[toy_id]'
      toyBtn.innerText = 'Like'

      divCard.appendChild(toyBtn)
    })
  })
})
