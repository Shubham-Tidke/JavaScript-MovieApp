const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
//querySelector selects only button in the header tag
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMvoieButton = addMovieModal.querySelector('.btn--success');
//to get all elements under 'input'
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if(movies.length === 0){
    entryTextSection.style.display = 'block';
  }
  else {
    entryTextSection.style.display = 'none';
  }
};

const cancelMovieDeletion  =()=>{
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};
const deleteMovie =(movieId)=>{
  let movieIndex = 0; //'let' helps accessing variable globally
  for (const movie of movies){
    if(movie.id === movieId)
    {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex,1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  cancelMovieDeletion();
};
const deleteMovieHandler=(movieId)=>{
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.removeEventListener('click',deleteMovie);
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');
  //cancelDeletionBtn.removeEventListener('click',cancelMovieDeletion);
  cancelDeletionBtn.addEventListener('click',cancelMovieDeletion);
  confirmDeletionBtn.addEventListener('click',deleteMovie.bind(null,movieId));
  //deleteMovie(movieId);
};
const renderNewMovieInput = (id,title,imageUrl,rating)=>{
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML =
  `<div class ="movie-element__image">
      <img src ="${imageUrl}" alt = "${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}</p>
    </div>`
    ;
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
    cancelMovieDeletion();
    toggleBackdrop();
};

const closeMovieModal = () =>{
  addMovieModal.classList.remove('visible');
}
//function to get backdrop
const toggleBackdrop = ()=>{
  backdrop.classList.toggle('visible');
};
//function to show pop-up for 'Add Movie'
const showMovieModal = ()=>{
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};
//to flush entered input data
clearMovieInputs = () => {
  for(const usrInputs of userInputs){
    usrInputs.value = '';
  }
};
//function to close backdrop using 'cancel'button
const cancelAddMovie = () =>{
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};
const addMovieHandler = () => {

  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if(titleValue.trim() === '' ||
    imageUrlValue.trim() === ''||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
){
  alert("Please enter valid values[between 1 to 5]");
  return;

}
  const newMovie = {
    id : Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieInput(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
  updateUI();
};

//function to handle click on backdrop
const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInputs();
};

startAddMovieButton.addEventListener('click',showMovieModal);
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMvoieButton.addEventListener('click',addMovieHandler);
