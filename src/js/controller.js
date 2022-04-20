import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import menuView from './views/menuView.js';
import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

//event listener and extracts an Id andd fetch the same element dform the api
const controlRecipes = async function () {
  // function controlRecipes() {} // a embedded function
  try {
    const id = window.location.hash.slice(1);

    //if (!id) return;
    recipeView.loader();

    //highlight selected menu item
    menuView.update(model.pagination());

    //1. Loading recipe
    await model.loadRecipe(id); // no return
    // const { recipe } = model.state;

    //2. Render the recipe full dom reflow and repaint happens here
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);

    //updating the dom just with actual changes text and attributes
    //recipeView.update(model.state.recipe);

    console.log(id);
    //render the data onto the site
    //document.querySelector('.recipe').innerHTML = recipe.id;
  } catch (error) {
    recipeView.rendererror(); // this is coming by throwing the error frolm the View page
  }
};

// for the search bar
const SearchResults = async function () {
  try {
    //display the loader
    menuView.loader();
    // console.log(menuView);

    // get the user input
    const query = searchView.getQuery();
    //3. clear the search form
    searchView.clear();

    if (!query) return;
    //3. get search results

    // //sending the data to the menuView
    // menuView.render(model.state);

    await model.loadSearchResults(query);

    //console.log(model.pagination(1));

    //render display page
    //menuView.render(model.state.search.results);
    menuView.render(model.pagination());

    // render the pangination buttons
    paginationView.render(model.state.search); // state carries all the info we will need
  } catch (error) {
    console.log(error);
  }
};

// this is the function that will be excuted whne ever we click on the pagination button
const controlPagination = function (goToPage) {
  model.state.search.currentPage = goToPage; // will update the page number

  // render new pangination buttons
  paginationView.render(model.state.search);

  //render new page
  menuView.render(model.pagination(goToPage));

  console.log(goToPage);
};

const serveringController = function (newServings) {
  // will increase or decrease the servering number and recipe needed
  // listen to user click and add or subtract the amount
  // update the recipe serving in the state
  model.updateServings(newServings); // prefer to run this func in the model

  //update the view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.publisher_subscriber(controlRecipes);
  recipeView.addHandlerUpdateServings(serveringController); // conn the recView and controller
  searchView.addHandlerSearch(SearchResults);
  paginationView.addHandClick(controlPagination);
};

init();
