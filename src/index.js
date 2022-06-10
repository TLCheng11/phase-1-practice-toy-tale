let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //getting toy data form database and show on the website as cards
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    data.forEach(addingToy)
  });

  //function to add toy
  function addingToy (toy){
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const button = document.createElement("button");

      div.className = "card";
      h2.textContent = toy.name;
      img.src = toy.image;
      img.className = "toy-avatar";
      p.textContent = toy.likes;
      button.id = toy.id;
      button.className = "like-btn";
      button.textContent = "Like ❤️"
      button.addEventListener("click", addLikes);

      div.append(h2, img, p, button);
      toyCollection.append(div);
  }

  //adding toy to add toy to database on form submit
  document.querySelector(".add-toy-form").addEventListener("submit", e => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${e.target.name.value}`,
        "image": `${e.target.image.value}`,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(data => addingToy(data));
  })
});

//update toy likes
function addLikes(e){
  const p = e.target.parentNode.querySelector("p");
  p.textContent = parseInt(p.textContent) + 1;
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(p.textContent)
    })
  })
}
