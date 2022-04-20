import view from './view';

class MenuView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipe found, Please try again later';
  _successMessage = 'Task completed successfully';

  // addHandlerMenu(handler) {
  // this._parentEl.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   handler();
  // });

  // these two fnctions will iterate on every ele and add it to the
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    // if the result id is the same as the current id highlightit

    //currentID
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
        <a class="preview__link" ${
          result.id === id ? 'preview__link--active' : ' '
        }href="#${result.id}">
            <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">T${result.publisher}</p>  
        </a>
        </li>  
        `;
  }
}

export default new MenuView();
