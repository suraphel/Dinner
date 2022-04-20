//on click  : bookmark button : listener :

// what to listen to

const bookmarkView = function () {
  const _parentEl = document.querySelector('.nam__item'); // the target destinaltion

  _parentEl.addEventListener('click', function () {
    //save the id of the page
    const id = window.location.hash;
    localStorage = id;
  });
};
