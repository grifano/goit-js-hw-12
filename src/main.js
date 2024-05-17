import './js/pixabay-api';
import { fetchImageData } from './js/pixabay-api';
import './js/render-functions';
import {
  getUserValue,
  updateUi,
  showLoader,
  showLoadMoreButton,
  showNotification,
  createMarkup,
  addLightbox,
} from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.search-bar-form'),
  searchInput: document.querySelector('#search-bar'),
  searchButton: document.querySelector('button'),
  loadMoreButton: document.querySelector('.load-more-button'),
  galleryList: document.querySelector('.gallery-list'),
};

// Search params
let userSearchRequestValue = '';
const searchParams = {
  pageCounter: 1,
  per_page: 110,
};
let totalPages = 0;

// Smooth Scroll to the top of the result list
const smoothScroll = () => {
  const imageCard = refs.galleryList.querySelector(
    '.image-card-details-list-item'
  );
  if (imageCard) {
    window.scrollTo({
      top: refs.galleryList.offsetTop - 20, // Scroll to the top of the gallery list
      left: 0,
      behavior: 'smooth',
    });
  }

  console.log(refs.galleryList.offsetTop);
};
// Get search query from user input
refs.searchInput.addEventListener('input', event => {
  userSearchRequestValue = getUserValue(event);
});

// Submit form to fetch data from server and render result
async function onSearchFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  searchParams.pageCounter = 1;

  try {
    showLoader(true, refs.searchForm);

    const response = await fetchImageData(userSearchRequestValue, searchParams);
    const images = response.hits;
    const totalImages = response.totalHits;

    // Get total pages
    totalPages = Math.ceil(totalImages / searchParams.per_page);

    // Render images, hide loader, and show load more button
    updateUi(images);
    showLoader(false, refs.searchForm);
    showLoadMoreButton(true);
  } catch (error) {
    showNotification(error.message);
    showLoader(false, refs.searchForm);
  }

  form.reset();
}
// Load more images when user click "load more" button
async function onLoadMoreButtonClick() {
  showLoader(true, refs.loadMoreButton);

  try {
    searchParams.pageCounter += 1;

    const response = await fetchImageData(userSearchRequestValue, searchParams);
    const images = response.hits;
    refs.galleryList.insertAdjacentHTML('afterbegin', createMarkup(images));
    // Fire function that create lightbox after image-cards was rendered
    addLightbox();

    // Hide button when rich end of collection
    if (searchParams.pageCounter >= totalPages) {
      showLoadMoreButton(false);
      loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
    }

    // Run smooth scroll function to scroll smooth on top of the list result
    smoothScroll();

    // Remove loader from DOM
    showLoader(false, refs.loadMoreButton);
  } catch (error) {
    showNotification(error.message);
  }
}

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
