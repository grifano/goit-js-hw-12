import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const button = document.querySelector('button');
const gallery = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');

// Function addLightbox
export function addLightbox() {
  const lightbox = new SimpleLightbox('.image-card-link', {
    caption: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}

// Function: show notification
export function showNotification(msg) {
  iziToast.settings({
    timeout: 5000,
    titleColor: '#fff',
    position: 'topRight',
    messageColor: '#fff',
    icon: '',
    close: false,
  });

  iziToast.error({
    message: msg,
    class: 'error-notification',
    timeout: 5000,
    iconUrl: '/img/octagon.svg',
    titleColor: '#fff',
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    progressBarColor: '#B51B1B',
    close: true,
  });
}

// Update UI
export function updateUi(arrayImages) {
  if (arrayImages.length <= 0) {
    showNotification(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
  const markup = arrayImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-card">
              <a href="${largeImageURL}" class="image-card-link"><img src="${webformatURL}" width="360" height="200" class="image-card-thumb" alt="${tags}">
                <ul class="image-card-details-list">
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Likes</p>
                      <p class="image-card-details-text">${likes}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Views</p>
                      <p class="image-card-details-text">${views}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Comments</p>
                      <p class="image-card-details-text">${comments}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Downloads</p>
                      <p class="image-card-details-text">${downloads}</p>
                  </li>
                </ul>
              </a>
          </li>`;
      }
    )
    .join('');
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('afterbegin', markup);

  // Fire function that create lightbox after image-cards was rendered
  addLightbox();
}

// Check user input
export function getUserValue(event) {
  const value = event.target.value;

  if (value && value.trim().length > 0) {
    button.classList.remove('is-disable');
    button.removeAttribute('disabled', '');
    return value;
  } else {
    button.classList.add('is-disable');
    button.setAttribute('disabled', '');
  }
  return;
}

// Show Loader
export function showLoader(status) {
  if (status) {
    loader.classList.add('is-active');
  } else {
    loader.classList.remove('is-active');
  }
}
