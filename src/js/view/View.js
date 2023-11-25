import icons from '../../img/icons.svg';

export default class View{

    _data ;
    render(data, render= true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data=data;
    const markup = this._generateMarkup();
    if(!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    
    update(data){
      // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
       this._data=data;
      const newMarkup = this._generateMarkup();
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      //console.log(newDOM);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
      //console.log(newElements,curElements);
      newElements.forEach((newEl , i) => {
       const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
       if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
            curEl.textContent = newEl.textContent;
       }
       if (!newEl.isEqualNode(curEl))
      Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    
      });
      
    }



    _clear(){
        this._parentElement.innerHTML="";
    }
    renderSpinner(){
        const markup=` <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        
}
renderError(message = this._ErrorMessage){
  const markup= `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
this._clear();
this._parentElement.insertAdjacentHTML('afterbegin',markup);
}
renderMessage(message = this._message){
  const markup= `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-simple"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
this._clear();
this._parentElement.insertAdjacentHTML('afterbegin',markup);
}    
}