import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js/pixabay-api';
import LoadMoreBtn from './js/load-more';


Notify.init({
  width: '320px',
  clickToClose: true,
  fontSize: '16px',
  useIcon: false,
});

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  clearArticleContainer();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;

  if (pixabayApiService.query === '') {
    return Notify.failure('Пошукайте хоча б щось');
  }

  loadMoreBtn.show();
  pixabayApiService.resetPage();
  clearArticleContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  pixabayApiService.fetchArticle().then(hits => {
    appendArticleMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendArticleMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', createMarkup(hits));
}

function clearArticleContainer() {
  refs.articlesContainer.innerHTML = '';
}

function createMarkup(hits) {
  const markup = hits
    .map(
      hit =>
        `<li class="gallery-item">
            <a href="${hit.largeImageURL}" class="photo-card">
              <div class="img-thumb">
                <img src="${hit.webformatURL}" alt="${hit.tags}" class="card-img" /></div>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${hit.likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${hit.views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${hit.comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${hit.downloads}
                </p>
              </div>
            </a>
          </li>                 
        `
    )
    .join('');
  return markup;
}
