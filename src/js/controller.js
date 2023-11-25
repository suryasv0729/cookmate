//cookmate
import 'core-js/stage';
import 'regenerator-runtime/runtime';
/////////
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import AddRecipeView from './view/addRecipeView.js';
import { async } from 'regenerator-runtime';
import addRecipeView from './view/addRecipeView.js';

// if(module.hot){
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

const controlRecipe= async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return
    recipeView.renderSpinner();

//update recipe seach view to marked when selected
resultsView.update(model.getSearchResultsPerPage());
bookmarksView.update(model.state.bookmarks);

//1:loading recipe
   await  model.loadRecipe(id);
   //2:rendering recipe
recipeView.render(model.state.recipe);
// controlServings();
}
  catch(err){
recipeView.renderError();
  }
}
//gettingsearchRecipeData

const controlSearchResults = async function(){
try{
resultsView.renderSpinner();
  //1) get search query
  const query = searchView.getSearchInputValue();
if(!query) return;
  await model.loadSearchRecipe(query);
  //console.log(model.state.search.results);
  resultsView.render(model.getSearchResultsPerPage());
  paginationView.render(model.state.search);
  
}catch(err){
  console.log(err);
}
}
const controlPagination= function(gotoPage){
//1) render new search results
  resultsView.render(model.getSearchResultsPerPage(gotoPage));
  //2) render pagination buttons
  paginationView.render(model.state.search);
}
const controlServings = function(newServings){
  // update recipe servings in state
  model.updateServings(newServings);
  //render updated recipe
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //updating the bookmarks list
  bookmarksView.render(model.state.bookmarks);
}
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlUpload= async function(newRecipe){
  try{
    //show loading spinner
    //addRecipeView.renderSpinner();
  //console.log(newRecipe);
  await model.uploadRecipe(newRecipe)
  recipeView.render(model.state.recipe);

//SUCCESS MESSAGE
//addRecipeView.renderMessage();


// render bookmarks view
bookmarksView.render(model.state.bookmarks);
//change ID in URL
window.history.pushState(null, '' , `#${model.state.recipe.id}`);


  //close form window

  setTimeout(function(){
    addRecipeView.toggleWindow()
  },MODAL_CLOSE_SEC * 500)
  }
  catch(err){
    console.log('@',err);
    addRecipeView.renderError(err.message);
  }
}

const newFeature = function(){
  console.log('welcome to the application');
}


const init= function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); 
  paginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlUpload)
newFeature();
}
init();
console.log(BUG);