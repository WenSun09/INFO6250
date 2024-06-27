import state from './state';
import render from './render'


const mainEl = document.querySelector('.main');
render(mainEl, state);

mainEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-cart')) {
    const index = Number(e.target.dataset.index);
    let found = false;
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].index === index) {
        found = true;
        state.cart[i].quantity++;
      }
    }
    if (!found) {
      state.cart.push({ index: index, quantity: 1 });
    }
  }
  if (e.target.classList.contains('reduce-quantity')) {
    const index = Number(e.target.dataset.index);
    state.cart[index].quantity--;
    if (state.cart[index].quantity === 0) {
      state.cart.splice(index, 1);
    }
  }
  if (e.target.classList.contains('add-quantity')) {
    const index = Number(e.target.dataset.index);
    state.cart[index].quantity++;
  }
  if (e.target.classList.contains('view-cart')) {
    state.viewCart = true;
  }
  if (e.target.classList.contains('hide-cart')) {
    state.viewCart = false;
  }
  if (e.target.classList.contains('checkout')) {
    state.cart = [];
    state.viewCart = false;
  }
  render(mainEl, state);
})