import { refs } from './refs';


export function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.searchQuery.value;

    console.log(searchQuery);

    const API_KEY = '36972286-06949545b2231b5580740924b';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&page=1&per_page=15`;

    fetch(url)
        .then(r => r.json())
        .catch(error => {
        Notify.failure(`❌ Sorry, there are no images matching your search query. Please try again.`)    })
}