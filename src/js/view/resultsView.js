import icons from '../../img/icons.svg';
import View from './View';
import previewView from './previewView';



class resultsView extends View{
_parentElement = document.querySelector('.results');
_ErrorMessage = '😕 couldn\'t find your recipe. \n  please try another one';
 _message='';

 _generateMarkup(){
  return this._data.map(results => previewView.render(results, false)).join('');

}
}

export default new resultsView();