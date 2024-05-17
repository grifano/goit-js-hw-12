import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonLoadMore = document.querySelector('.load-more-button');
const gallery = document.querySelector('.gallery-list');

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
    iconUrl: './img/octagon.svg',
    titleColor: '#fff',
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    progressBarColor: '#B51B1B',
    close: true,
  });
}

// Create markup from array
export function createMarkup(array) {
  return array
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
}

// Update UI
export function updateUi(arrayImages) {
  if (arrayImages.length <= 0) {
    showNotification(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
  gallery.insertAdjacentHTML('afterbegin', createMarkup(arrayImages));
}

// Show Loader
export function showLoader(status, siblingElement) {
  const loaderMarkup = '<div class="loader"></div>';

  if (status && !document.querySelector('.loader')) {
    siblingElement.insertAdjacentHTML('afterend', loaderMarkup);
  } else {
    document.querySelector('.loader').remove();
  }
}

// Show button load-more
export function showLoadMoreButton(status) {
  if (status) {
    buttonLoadMore.classList.remove('is-hidden');
  } else {
    buttonLoadMore.classList.add('is-hidden');
  }
}
