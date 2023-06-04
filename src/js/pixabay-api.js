const axios = require('axios').default;

const API_KEY = '36972286-06949545b2231b5580740924b';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticle() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&page=${this.page}&per_page=40`;

    const response = await axios.get(url);
    const { data } = await response;
    this.incrementPage();

    return data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
