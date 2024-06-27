function renderCats(cats) {
    return `<ul class="cats">` + cats.map((cat, index) => `
      <li>
        <img src="${cat.img}" alt="${cat.name}" class="cat-img">
        <span>
          Name: ${cat.name} Price: $${cat.price}
        </span>
        <button data-index="${index}" class="add-cart" type="button">
          Add to Cart
        </button>
      </li>
      `).join('') +
        `</ul>`;
}

function renderViewCart(state) {
    if (state.viewCart) {
        return `<button class="hide-cart">Hide Cart</button>`;
    } else {
        let itemsCnt = 0;
        for (let item of state.cart) {
            itemsCnt += item.quantity;
        }
        return `<button class="view-cart">View Cart (${itemsCnt})</button>`;
    }
}

function renderCart(state) {
    if (state.viewCart) {
        let totalCost = 0;
        for (let item of state.cart) {
            totalCost += item.quantity * state.cats[item.index].price;
        }
        let content = ``;
        if (state.cart.length === 0) {
            content = `<p>Nothing in the cart</p>`;
        } else {
            content = `<ul> ` + state.cart.map((item, index) => `
        <li>
          <img src="${state.cats[item.index].thumbImg}" alt="${state.cats[item.index].name}" class="cat-img">
          <span>
            Name: ${state.cats[item.index].name} Quantity: ${item.quantity}
          </span>
          <button data-index="${index}" class="reduce-quantity" type="button">
            -
          </button>
          <button data-index="${index}" class="add-quantity" type="button">
            +
          </button>
          <span>
            Total Price: $${Number.parseFloat(item.quantity * state.cats[item.index].price).toFixed(2)}
          </span>
        </li>
        `).join('') + `
        </ul>`
        }
        return `
      <p>Your Cart</p>
      ` + content + `
      <p>Total cost of all cats: $${Number.parseFloat(totalCost).toFixed(2)}<p>
      <button class="checkout" type="button">Checkout</button>
      `;
    } else {
        return ``;
    }
}

function render(mainEl, state) {
    mainEl.innerHTML = renderCats(state.cats) + renderViewCart(state) + renderCart(state);
}

export default render;