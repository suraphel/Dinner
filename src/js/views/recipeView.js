import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './view';

class RecipeView extends View {
  //private ele
  _parentEl = document.querySelector('.recipe'); // this. will make rendering other obj easy
  _errorMessage = 'Unable to find the recipe, Please try agaon later';
  _successMessage = 'Task completed successfully';

  // _data;
  // // event listner that will listen to any change in the hash!!!
  // window.addEventListener('hashchange', controlRecipes);
  // window.addEventListener('load', controlRecipes);
  // //shorter way of doing it
  // // evern shall be under the dom element and under the view
  // // for any one that is listening
  // // for connecting model and the viewer indirectly
  publisher_subscriber(subscriber) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, subscriber)
    );
  }

  // an eventlistener for updating the serving buttons
  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.data-updata-serving'); // which button is clicked
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo; // reads the value at this instance
      console.log(btn);
      if (updateTo > 0) handler(updateTo);
    });
  }

  // render(data) {
  //   this._data = data; // this data bings in info the class

  //   const markup = this_generateMarkup();
  //   this._clear();
  //   this._parentEl.insertAdjacentHTML('afterbegin', markup);
  // }

  // _clear() {
  //   this._parentEl.innerHTML = '';
  // }

  // loader = function () {
  //   const markup = `
  //   <div class="spinner">
  //     <svg>
  //       <use href="${icons}#icon-loader"></use>
  //     </svg>
  //   </div>
  // `;
  //   this._parentEl.innerHTML = '';
  //   this._parentEl.insertAdjacentHTML('afterbegin', markup);
  // };

  // // rendering the error for the user
  // rendererror(message = this_errorMessage) {
  //   const markup = `
  //     <div class="error">
  //       <div>
  //         <svg>
  //           <use href="${icons}#icon-alert-triangle"></use>
  //         </svg>
  //       </div>
  //         <p>${message}</p>
  //       </div>
  //   `;
  //   this._clear();
  //   this._parentEl.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderSuccess(message = this._successMessage) {
  //   const markup = `
  //     <div class="message">
  //       <div>
  //         <svg>
  //           <use href="${icons}#icon-smile"></use>
  //         </svg>
  //       </div>
  //         <p>${message}</p>
  //       </div>
  //   `;
  //   this._clear();
  //   this._parentEl.insertAdjacentHTML('afterbegin', markup);
  // }

  _generateMarkup() {
    // returns html string
    return ` 
        <figure class="recipe__fig">
        <img src="${this._data.recipe.url}"alt= 
        "${this._data.title}" class="recipe__img" />
              <h1 class="this._data.title" >
                <span>${this._data.recipe.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.recipe.cookingtime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.recipe.servings
                }</span>
                <span class="recipe__info-text">servings</span>
                  <div class="recipe__info-buttons">
                  <button data-update-to = ${
                    this._data.recipe.servings - 1
                  }class="btn--tiny btn--update-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button data-update-to = ${
                    this._data.recipe.servings + 1
                  }class="btn--tiny btn--update-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round">
                <svg class="">
                  <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
               <ul class="recipe__ingredient-list">
               ${this._data.recipe.ingredients
                 .map(this._generateMarkupIngredient)
                 .join('')}
            </div>      
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This. recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.recipe.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>`;
  }
  _generateMarkupIngredient(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">
            ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
          </div>
          <div class="recipe__description">
            <span class=${ing.unit}>cup</span>
            ${ing.description}
          </div>
        </li>
      `;
  }
}

export default new RecipeView(); // exporting an object yet privacy of the propreties
