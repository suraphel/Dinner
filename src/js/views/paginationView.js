import view from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentEl = document.querySelector('.pagination'); // where it will be rendereda

  addHandClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      // event deligation
      const btn = e.target.closest('.btn--inline');
      //if (!btn) return;

      //custom data attributes to connect the dom and our code
      const goToPage = +btn.dataset.goto; // dataset = html value for w/r data
      console.log(goToPage);

      handler(goToPage); // pass the page number to the handler
    });
  }

  _generateMarkup() {
    // which data to insert into the placeholders
    const curpage = this._data.currentPage;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // First page
    if (this._data.currentPage === 1 && numPages > 1) {
      return `
      <button data-goto= "${curpage + 1}"
      class="btn--inline pagination__btn--next">
        <span>Page ${curpage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>          
          })          
        </svg>
      </button>`;
      // document.addEventListner('.next')('click', function(){
      //       console.log("clikced");
    }

    // Last page
    if (this._data.curpage === numPages) {
      return `
        <button data-goto= "${
          curpage - 1
        }"class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curpage - 1}/span>  // our destination
        </button>
    `;
    }
    //Only pagge

    if (this._data.curpage === 1) {
      return;
    }

    //Middle of the pages
    if (this._data.curpage < numPages) {
      return `
      <button data-goto= "${
        curpage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${curpage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      
        <button 
        data go-to = "${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curpage - 1}</span>
        </button>`;
    }
  }
}

export default new PaginationView(); // send an object

/*
    return `
    // Page 1 and there are other pages
     // if array.lenght > 10 ?
        
            
          
    
    // Page 1 and there no other pages
         // if array.lenght < 10 ?



    // Page 1ast
         // if pageNumber === array.length ?


        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
        </button>

    // Page  in the middle
    
        // if array.lenght > 10  && array.length < last?

         <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button> -->
          
          `;
  }
  */

// concept
// export const pagination = function (page = state.search.currentPage) {
//   state.search.currentPage = page;
//   const start = (page - 1) * state.search.resultsPerPage; // 0 -9 per page ...
//   const end = page * state.search.resultsPerPage;
//   return state.search.results.slice(start, end);
// };
// let button  = buton;

// if(WebGL2RenderingContext() < 10 ){
//    " show no button"
// }else{
//     show right GamepadButton;
// }if("right button.value == !hide"){
//     "activate the left button"
