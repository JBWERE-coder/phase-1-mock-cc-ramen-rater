// write your code here
const ramenMenu = document.querySelector("#ramen-menu");

getAllRamen();
formEventListener();

async function getAllRamen() {
  try {
    const response = await fetch("http://localhost:3000/ramens");
    const ramenArr = await response.json();
    ramenArr.forEach(ramen => {
      renderImage(ramen);
    });
  } catch (error) {
    console.log(error);
  }
}

function renderImage(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  ramenMenu.append(img);

  img.addEventListener("click", async function(e) {
    try {
      const response = await fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`);
      const ramen = await response.json();
      renderDetails(ramen);
    } catch (error) {
      console.log(error);
    }
  });
}

function renderDetails(ramen) {
  const img = document.querySelector(".detail-image");
  const h2 = document.querySelector(".name");
  const h3 = document.querySelector(".restaurant");
  const ratingInput = document.querySelector("#rating");
  ratingInput.value = ramen.rating;
  const commentInput = document.querySelector("#comment");
  commentInput.value = ramen.comment;
  img.src = ramen.image;
  img.alt = ramen.name;
  h2.textContent = ramen.name;
  h3.textContent = ramen.restaurant;
  const ramenForm = document.querySelector("#ramen-rating");
  ramenForm.dataset.id = ramen.id;
}

function formEventListener() {
  const ramenForm = document.querySelector("#ramen-rating");
  ramenForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const newRating = document.querySelector("#rating").value;
    const newComment = document.querySelector("#comment").value;
    const updatedObj = {
      id: parseInt(ramenForm.dataset.id),
      rating: newRating,
      comment: newComment
    };

    await updateRamen(updatedObj);
    e.target.reset();
  });
}

async function updateRamen(updatedObj) {
  try {
    const response = await fetch(`http://localhost:3000/ramens/${updatedObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedObj),
    });

    const updatedRamen = await response.json();
    const ratingInput = document.querySelector("#rating");
    const commentInput = document.querySelector("#comment");
    ratingInput.value = updatedRamen.rating;
    commentInput.value = updatedRamen.comment;
  } catch (error) {
    console.log(error);
  }
}
