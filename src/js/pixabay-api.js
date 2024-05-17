import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchImageData = async (
  serachRequest,
  { pageCounter, per_page }
) => {
  const searchParams = {
    key: '20858658-55430aeeed6a37ac1f56d3c0c',
    q: serachRequest,
    page: pageCounter,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  const response = await axios('/api/', {
    params: searchParams,
  });

  if (response.status === 'error') {
    throw new Error(response.code);
  }

  return response.data;
};
