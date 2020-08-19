window.handleHomeRequest = () => {
  document.body.innerHTML = `
  <aside>
  <div>
  <h1><a href="/">MEAL SHARING</a></h1>
  </div>

    </aside>
    <main>
    <a href="meals" data-navigo><h3><input 
    class="nav-btn"
    type="button"
    value="see all meals"></h3></a>
      <section class="all-meals">
      </section>
`;

  // make sure the backend api works before working with it here
  //console.log('res', response);

  const section = document.querySelector('.all-meals');

  function renderMeals() {
    fetch('api/meals?limit=4')
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

// window.handleHomeRequest = () => {
//   document.body.innerHTML = `<h1>Home</h1>
//   <a href="meals" data-navigo>Meals</a>
//   and
//   <a href="meal/1" data-navigo>meal/1</a>
//   `;

//   // if any links are added to the dom, use this function
//   // make the router handle those links.
//   router.updatePageLinks();
// };
