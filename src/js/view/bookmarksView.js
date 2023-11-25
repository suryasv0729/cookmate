import icons from '../../img/icons.svg';
import View from './View';
import previewView from './previewView';



class bookmarksView extends View{
_parentElement = document.querySelector('.bookmarks__list');
_ErrorMessage = 'No bookmarks yet. find a nice recipe and bookmark it';
 _message='';
addHandlerRender(handler){
   window.addEventListener('load', handler)
}
_generateMarkup(){
   return this._data.map(bookmark => previewView.render(bookmark, false)).join('');

}

}

export default new bookmarksView();