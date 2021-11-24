import axios from 'axios';
const BASE_URl = 'https://pixabay.com/api/';
const API_KEY = "key=11289051-48d12590e82ce4f1f9b0e3f91";

export default class NewsApiServise{

    constructor() {
        this.searchQuery = '';
      this.page = 1;
      this.pageSize = 40;
    }

  async feachImage() {

    const url = `${BASE_URl}?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.pageSize}&page=${this.page}`;
    const response = await axios.get(url)
    this.incrementPage();
   return  response;
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
    this.searchQuery = newQuery;
  }
}