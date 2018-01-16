export const getCartIds = (cart) => {
    let cartIds = Object.keys(cart);
    return cartIds;
}

export const getCartFromSessionStorage = () => {
    const cart = {}
    return cart
}
