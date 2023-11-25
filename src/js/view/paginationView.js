import icons from '../../img/icons.svg';

import View from './View';

class PaginationView extends View {
_parentElement = document.querySelector('.pagination');

addHandlerClick(handler){
this._parentElement.addEventListener('click',function(e){
  const btn = e.target.closest('.btn--inline');
  if(!btn) return
  const gotoPage =  +btn.dataset.goto;
  handler(gotoPage);
})


}



_generateMarkup(){
  const numPage = Math.ceil(this._data.results.length / this._data.ResultPerPage);
  const currentPage = this._data.page;
    //first page and other pages
if(numPage > 1 && currentPage === 1){
return ` <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
<span>Page ${currentPage+1}</span>
<svg class="search__icon">
  <use href="src/img/icons.svg#icon-arrow-right"></use>
</svg>
</button> `
}
    //other pages
if(currentPage < numPage && currentPage!== 1){
    return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage-1}</span>
    </button>
    <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
<span>Page ${currentPage+1}</span>
<svg class="search__icon">
  <use href="src/img/icons.svg#icon-arrow-right"></use>
</svg>
</button>`;
}

    //last page
if(currentPage === numPage && numPage > 1){
return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="src/img/icons.svg#icon-arrow-left"></use>
</svg>
<span>Page ${currentPage-1}</span>
</button>`;
}
 //first page and no other pages
 return ` `



}
}
export default new PaginationView();
