export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    //Calculate items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    //Calculate shipping price (order is over $10000, free, else $100)
    state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 100);
    //Calculate tax price(15%tax)
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
    //Calculate total price

    state.totalPrice = addDecimals(
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
    );
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
};
