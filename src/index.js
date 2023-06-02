import { onSearch } from "./js/pixabay-api";
import { refs } from "./js/refs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '320px',
  clickToClose: true,
  fontSize: '16px',
  useIcon: false,
});

refs.form.addEventListener('submit', onSearch);
