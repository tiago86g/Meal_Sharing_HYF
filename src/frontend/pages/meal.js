window.handleMealRequest = params => {
  document.body.innerHTML = `
  <aside>
  <div>
  <h1><a href="../">Home</a></h1>
  </div>

    </aside>
    <main>
    <a href="../meals" data-navigo><h3>All meals</h3></a>
      <section class="all-meals">
      </section>`;
  // document.body.innerHTML = `
  // <h1>Meal with id ${params.id}</h1>`;

  fetch(`/api/meals/${params.id}`)
    .then(response => response.json())
    .then(renderMeal);

  //console.log(response.json());

  function renderMeal(meal) {
    console.log('renderMeal');
    const section = document.querySelector('.all-meals');
    const article = document.createElement('article');
    console.log(meal);
    article.innerHTML = `
          <div>
              <h2>${meal[0].title}</h2>
              <h3>Where: ${meal[0].location}</h3>
              <p>Description: ${meal[0].description}</p>
              <p>Price: <strong>${meal[0].price}<strong></p>
              <img src="../img/meal_${meal[0].title}.jpg" alt="">
            </div>
            <form  action= "../../api/reservations" method="post">
              <label for="number_of_guests">number of guests:</label><br>
              <input type="text" id="number_of_guests" name="number_of_guests"><br><br>
              <label for="meal_id">meal number:</label><br>
              <input type="number" id="meal_id" name="meal_id"><br><br>
              <label for="created_date">created date:</label><br>
              <input type="datetime" id="created_date" name="created_date"><br><br>
              <label for="guest_email">guest email:</label><br>
              <input type="text" id="guest_email" name="guest_email"><br><br>
              <input type="submit" value="Reserve">
          </form>
      
    `;
    section.appendChild(article);
  }
};
