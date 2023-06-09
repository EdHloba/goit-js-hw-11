export default class LoadMoreBtn {
    constructor({selector, hidden = false} ) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = document.querySelector('.label');

    return refs;
  }

  enable() {
    this.refs.button.disable = false;
    this.refs.label.textContent = 'Показати ще';
  }

  disable() {
    this.refs.button.disable = true;
    this.refs.label.textContent = 'Загружаємо...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
