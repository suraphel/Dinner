import View from './view';

class SearchView extends View {
  // will have properties and mehtods
  // _data; // connects it to the conroller
  _parentEl = document.querySelector('.search'); // think this will connect it to the html seach class!!

  // to select the sub class in the search class
  getQuery() {
    // form value
    return this._parentEl.querySelector('.search__field').value; // gets value of user input
  }

  // needs to be called and where to call it from
  clear() {
    return (this._parentEl.querySelector('.search__field').value = '');
  }

  // listen for an event in the view   //   addhandler = is publisher       //   subscriber = SearchResults()
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  //   #generateMarkup(query) {
  //     return `
  //     <form class="search">
  //           <input
  //             type="text"
  //             class=${query}
  //             placeholder="Search over 1,000,000 recipes..."
  //           />
  //           <button class="btn search__btn">
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-search"></use>
  //             </svg>
  //             <span>Search</span>
  //           </button>
  //         </form>
  //       `;
  //   }
}

//we will export an object of this class

export default new SearchView();

// this is unnamed object thought.
