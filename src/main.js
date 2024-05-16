import './js/pixabay-api';
import { fetchImageData } from './js/pixabay-api';
import './js/render-functions';
import { getUserValue, updateUi, showLoader } from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.search-bar-form'),
  searchInput: document.querySelector('#search-bar'),
  searchButton: document.querySelector('button'),
  galleryList: document.querySelector('.gallery-list'),
};
let userSearchRequestValue = '';

refs.searchInput.addEventListener('input', event => {
  userSearchRequestValue = getUserValue(event);
});
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  showLoader(true);
  setTimeout(() => {
    fetchImageData(userSearchRequestValue)
      .then(data => {
        const images = data.hits;
        updateUi(images);
        showLoader(false);
      })
      .catch(error => console.log(error));
  }, 1000);
});
