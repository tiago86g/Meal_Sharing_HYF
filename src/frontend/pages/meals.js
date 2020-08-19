window.handleMealsRequest = () => {
  document.body.innerHTML = `
  <aside>
  <div>
  <h1><a href="/">MEAL SHARING</a></h1>
  </div>

    </aside>
    <main>
      <section class="all-meals">
      </section>
    <main>`;

  // make sure the backend api works before working with it here
  //console.log('res', response);

  const section = document.querySelector('.all-meals');

  function renderMeals() {
    fetch('/api/meals')
      .then(res => res.json())
      .then(data => {
        data.forEach(meal => {
          const article = document.createElement('article');
          article.innerHTML = `
          <div>
            <a href="meal/${meal.id}" data-navigo>
              <div>
                <h2>${meal.title}</h2>
                <h3>Where: ${meal.location}</h3>
                <img src="img/meal_${meal.title}.jpg" alt="">
              </div>
              <div>
                <button>more</button>
              </div>
            </a>
          </div>`;
          section.appendChild(article);
        });
      });
  }

  renderMeals();
  //section.innerHTML = '';

  router.updatePageLink();
};

////////////////////////////////
