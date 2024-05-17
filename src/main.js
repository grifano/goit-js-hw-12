import './js/pixabay-api';
import { fetchImageData } from './js/pixabay-api';
import './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  updateUi,
  showLoader,
  showLoadMoreButton,
  showNotification,
  createMarkup,
} from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.search-bar-form'),
  searchInput: document.querySelector('#search-bar'),
  searchButton: document.querySelector('button'),
  loadMoreButton: document.querySelector('.load-more-button'),
  galleryList: document.querySelector('.gallery-list'),
};

const lightbox = new SimpleLightbox('.image-card-link', {
  caption: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

// Search params
let userSearchRequestValue = '';
const searchParams = {
  pageCounter: 1,
  per_page: 15,
};
let totalPages = 0;

// Add EventListners
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.searchInput.addEventListener('change', onSearchInputChange);

// *** Functions ***
// When user provide query, set submit button active
function onSearchInputChange(event) {
  const value = event.target.value.trim();
  if (value !== '') {
    refs.searchButton.classList.remove('is-disable');
  } else {
    refs.searchButton.classList.add('is-disable');
  }
}
// Submit form to fetch data from server and render result
async function onSearchFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  // Reset page counter and clear result list
  searchParams.pageCounter = 1;
  refs.galleryList.innerHTML = '';

  // Get user query from input
  userSearchRequestValue = event.target.elements.searchQuery.value.trim();

  if (userSearchRequestValue === '') {
    showNotification('Search query can not be empty!');
    return;
  }

  try {
    showLoader(true, refs.searchForm);

    const { hits, totalHits } = await fetchImageData(
      userSearchRequestValue,
      searchParams
    );

    // Get total pages
    totalPages = Math.ceil(totalHits / searchParams.per_page);

    // Hide button when rich end of collection
    if (searchParams.pageCounter >= totalPages) {
      showLoadMoreButton(false);
      refs.loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
    } else {
      showLoadMoreButton(true);
    }
    // Render images, hide loader, and show load more button
    updateUi(hits);
    showLoader(false, refs.searchForm);
    lightbox.refresh();
  } catch (error) {
    showNotification(error.message);
    showLoader(false, refs.searchForm);
  }

  // Make submit button disable after form submit
  refs.searchButton.classList.add('is-disable');
  form.reset();
}
// Load more images when user click "load more" button
async function onLoadMoreButtonClick() {
  showLoader(true, refs.loadMoreButton);

  try {
    searchParams.pageCounter += 1;

    const response = await fetchImageData(userSearchRequestValue, searchParams);
    const images = response.hits;
    refs.galleryList.insertAdjacentHTML('beforeend', createMarkup(images));
    lightbox.refresh();

    // Hide button when rich end of collection
    if (searchParams.pageCounter >= totalPages) {
      showLoadMoreButton(false);
      refs.loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
      showNotification(
        `We're sorry, but you've reached the end of search results.`
      );
    }

    // Run smooth scroll function to scroll smooth on top of the list result
    smoothScroll();

    // Remove loader from DOM
    showLoader(false, refs.loadMoreButton);
  } catch (error) {
    showNotification(error.message);
  }
}
// Smooth Scroll to the top of the result list
function smoothScroll() {
  const imageCard = refs.galleryList.querySelector(
    '.image-card-details-list-item'
  );
  const imageCardHeight = imageCard.getBoundingClientRect().height;
  const viewportHeight = window.viewportHeight;
  const scrollHeight = imageCardHeight * 20;
  console.log(scrollHeight);

  if (imageCard) {
    window.scrollBy({
      top: scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}
