
//import { async } from "regenerator-runtime";
import { API_URL, RESULT_PER_PAGE ,KEY} from "./config";
//import { getJSON, sentJSON } from "./helper";
import { AJAX } from "./helper";


export const state = {
    recipe:{},
    search:{
        query: '',
        results: [],
       page : 1,
        ResultPerPage: RESULT_PER_PAGE,
    }, 
    bookmarks: [],
}
const createRecipeObject = function(data){
    const {recipe} = data.data;
    return{
 id: recipe.id,   
 title:recipe.title,
 publisher: recipe.publisher,
sourceUrl: recipe.source_url,
imageUrl: recipe.image_url,
servings: recipe.servings,
ingredients: recipe.ingredients,
cookingTime: recipe.cooking_time,
...(recipe.key && {key: recipe.key}),
} 
}
export const loadRecipe= async function(id){
    try{
  const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
  state.recipe = createRecipeObject(data);
    //console.log(data);
      
if(state.bookmarks.some(bookmarks=> bookmarks.id === id))
state.recipe.bookmarked = true 
else
state.recipe.bookmarked = false

   // console.log(recipe);
}catch(err){
    throw err
}
}

export const loadSearchRecipe = async function(query){
    try{
        state.search.query= query;
const data = await AJAX(`${API_URL}?search=${query}?key=${KEY}`);
   state.search.results= data.data.recipes.map(res =>{ return {
        id: res.id,   
 title:res.title,
 publisher: res.publisher,
imageUrl: res.image_url,
...(res.key && {key: res.key}),
     }
    })
    //console.log(state.search.results);
    state.search.page = 1;
    }
    catch(err){
        throw err
    }

}

export const getSearchResultsPerPage= function(page =state.search.page){
    state.search.page = page;
    const start =  (page-1)*10; // 0;
    const end =  page*10; //9;

    return state.search.results.slice(start,end);

}

export const updateServings = function(newServings){

    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity*newServings)/state.recipe.servings;
    });
state.recipe.servings = newServings; 

}
export const persistBookmarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}




export const addBookmark = function(recipe){
//add bookmark
    state.bookmarks.push(recipe);
// mark current recipe as bookmark
if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

persistBookmarks();
}
 
export const deleteBookmark = function(id){
    //delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index,1);
    // mark current recipe as not book marked
    if(id === state.recipe.id) state.recipe.bookmarked = false;
persistBookmarks();
}

const init= function(){
const storage = localStorage.getItem('bookmarks');
if(storage) state.bookmarks = JSON.parse(storage);

}
init();
const clearBookmarks  = function(){
    localStorage.clear('bookmarks');
};
//clearBookmarks();

export const uploadRecipe =async function(newRecipe){
    try{
 const ingredients = Object.entries(newRecipe).
 filter(entry=> entry[0].startsWith('ingredient') && entry[1] !== '')
 .map(ing => {
   const ingArr = ing[1].split(',').map(el => el.trim());
   if(ingArr.length !== 3)
   throw new Error("Wrong ingredients format! please use the correct format")
   const [quantity, unit , description] = ingArr;
   return {quantity: quantity ? +quantity : null, unit ,description};
  
 })
const recipe ={
    title: newRecipe.title,
    source_url:newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
}
//console.log();
//console.log(recipe);
const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
state.recipe = createRecipeObject(data);
addBookmark(state.recipe);
    }
    catch(err){
throw err;
    }
    


}