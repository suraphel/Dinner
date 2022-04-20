// Data goes in here for the recipe, search and the bookmarks
// Data center

import { GET_JSON } from './helper'; // the function to call the  api
import { API_CONN_STRING, NUMBEROFPAGESPERWINDOW } from './config';

export const state = {
  // this is an object
  recipe: {},
  search: {
    query: {},
    results: [],
    resultsPerPage: NUMBEROFPAGESPERWINDOW,
    currentPage: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await GET_JSON(`${API_CONN_STRING}/${id}`); // the api + the id
    // console.log(data.data.recipe.servings);
    console.log('coming from the loadRecipe function');
    const recipe = data.data.recipe; //like this we can store in an obj
    state.recipe = {
      id: recipe.id,
      url: recipe.image_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      image: recipe.url,
      cookingtime: recipe.cooking_time,
      servings: recipe.social_rank,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    };
    console.log(state.recipe);
    // const id = window.location.hash;
  } catch (error) {
    console.log(error); // this is coming from the helper funciton
    throw error;
    // model and view are connectoed through the "controller"
  }
};

// this is going to be called my the controller
// The search bar user input goes in here
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // the parameter
    const data = await GET_JSON(`${API_CONN_STRING}?search=${query}`);
    console.log(data.data.recipes);
    state.search.results = data.data.recipes.map(ele => {
      return {
        id: ele.id,
        image: ele.image_url,
        publisher: ele.publisher,
        title: ele.title,
      };
    });
    // console.log(state.search.results);
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
  //   console.log();
};

// const query = loadSearchResults(''); // user input == query

// Page indexing
export const pagination = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0 -9 per page ...
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    // if serving double so does quantity
    ing.quantity = quantity * 2;

    console.log(ele);
  });
  state.recipe.servings = newServing;
};
// for the rendering the menu

// export const menurenderController = async function () {
//   try {
//     // const data = await GET_JSON(`${API_CONN_STRING}/${query}`);
//     console.log(data);
//   } catch (error) {}
// };
// menurenderController();
// for the post
// fetch(API_CONN_STRING, {
//   method: 'GET',
//   headers: {
//     'Context-Type': 'Application/json',
//   },
//   body: JSON.stringify(data),
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success ', data);
//   });
