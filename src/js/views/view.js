// A parent class for all the other child view class to inhereate from

import icons from 'url:../../img/icons.svg';

export default class View {
  //private ele
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.rendererror();
    //data ? _successMessage : _errorMessage;
    this._data = data; // this data bings in info the class
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  loader() {
    const markup = `     
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.rendererror();

    this._data = data; // this data bings in info the class
    const newMarkup = this._generateMarkup(); // _gen is a string needs converting
    // make a newMarkup and compare it to the old html before redndering it

    const newDom = document.createRange().createContextualFragment(newMarkup); // conv string to real dom node objects that lives in memory
    const newElements = Array.from(newDom.querySelector('*')); // select all the elements from virtual mem
    //select only elements that are on the page
    const curElements = Array.from(this._parentEl.querySelector('*')); //node to array conversion
    // element comparison if it has been updated or not
    newElements.forEach((newEl, i) => {
      //array comparison
      const curEl = curElements[i]; // same index position
      if (
        !newEl.isEqualNode(curEl && newEl.firstChild?.nodeValue.trim() !== '') //optional chaining
      ) {
        curEl.textContent = newEl.textContent;
      } // comparing the containet is the same???
      // newEl[i] === curEl[i];
      console.log(curEl, curEl.isEqualNode(newEl));
      console.log('what');

      // update chamged Attributes
      if (newEl.isEqualNode(curEl)) {
        // newEl.attributes; // displays all the attributs element that has changed
        Array.from(newEl.attribues).forEach(attEle =>
          setAttribute(attEle.name, attEle.value)
        );
      }
      //highlighter
    });

    console.log(newElements, curElements);
  }

  // rendering the error for the user
  rendererror(message = this._errorMessage) {
    const markup = `  
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._clear._successMessage) {
    const markup = `  
      <div class="Message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
