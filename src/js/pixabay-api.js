export function fetchImageData(serachRequest) {
  const apiRequestURL = `https://pixabay.com/api/?key=20858658-55430aeeed6a37ac1f56d3c0c&q=${serachRequest}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(apiRequestURL).then(response => {
    if (!response.ok) {
      return;
    }
    return response.json();
  });
}
