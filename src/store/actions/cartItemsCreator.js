import { shopCartActions } from "../reducers/shopCartReducers";
const { addToCart, removeFromCart,addTotal } = shopCartActions;
const { triggerCartItems } = shopCartActions;
export const Total=(items)=>{
console.log(items);
let count = 0
for(let key in items){
  count += items[key].total
}

return count
}
// export const cartAddBook = (id) => (dispatch, getState) => {

//   const { books } = getState().BookListReducer;
//   const { cartItems } = getState().ShopCartReducer;
//   console.log(getState());
//   const booksItem = books.find((el) => el.id === id);
//   const cartItemIdx = cartItems.findIndex((el) => el.id === id);


//   if (cartItemIdx >= 0) {
//     const oldItems = cartItems.map((el) => {
//       return {
//         ...el,
//       };
//     });
//     console.log(oldItems[cartItemIdx].count);
//     const count = oldItems[cartItemIdx].count;
//     oldItems[cartItemIdx].count = count + 1;
//     oldItems[cartItemIdx].total = (count + 1) * booksItem.price;
    
//     return dispatch(addToCart(oldItems));
//   }
//   const newCartItem = [...cartItems];

//   const newItem = {
//     total: booksItem.price,
//     count: 1,
//     title: booksItem.title,
//     id: booksItem.id,
//   };

//   newCartItem.push(newItem);
//   dispatch(addToCart(newCartItem));

//   console.log(booksItem);

 
// };



// export const cartRemoveBook = (id) => (dispatch, getState) => {
//   const { books } = getState().BookListReducer;
//   const { cartItems } = getState().ShopCartReducer;
//   console.log(getState());
//   const booksItem = books.find((el) => el.id === id);
//   const cartItemIdx = cartItems.findIndex((el) => el.id === id);

//   if (cartItems[cartItemIdx].count > 1) {
//     const oldItems = cartItems.map((el) => {
//       return {
//         ...el,
//       };
//     });
//     console.log(oldItems[cartItemIdx].count);
//     const count = oldItems[cartItemIdx].count;
//     oldItems[cartItemIdx].count = count - 1;
//     oldItems[cartItemIdx].total = (count - 1) * booksItem.price;
 
//     return dispatch(removeFromCart(oldItems));
//   }

//   const removedItems = cartItems.filter((el) => el.id !== id);
//   dispatch(removeFromCart(removedItems));
// };

// export const cartDeleteBook = (id) => (dispatch, getState) => {
//   const { cartItems } = getState().ShopCartReducer;
//   const removedItems = cartItems.filter((el) => el.id !== id);
//   dispatch(removeFromCart(removedItems));
// };
const createItem = (book, cartBook = {}, quantity) => {
  const { count = 0, total = 0, id = book.id, title = book.title } = cartBook;

  return {
    id,
    title,
    count: count + quantity,
    total: total + book.price * quantity,
  };
};

const updateItem = (cartItems, item, idx) => {
  if (item.count === 0) {
    return cartItems.filter((el) => el.id !== item.id);
  }
  if (idx > -1) {
    const before = cartItems.slice(0, idx);
    const after = cartItems.slice(idx + 1);
    return [...before, item, ...after];
  }

  return [...cartItems, item];
};

const updateOrder = (state, id, quantity) => {
  const { books } = state.BookListReducer;
  const { cartItems } = state.ShopCartReducer;

  const booksItem = books.find((el) => el.id === id);
  const idx = cartItems.findIndex((el) => el.id === id);
  const cartItem = cartItems[idx];

  const item = createItem(booksItem, cartItem, quantity);
  return updateItem(cartItems, item, idx);
};

export const cartAddBook = (id) => (dispatch, getState) => {
  const state = getState();
  const items = updateOrder(state, id, 1);
  dispatch(triggerCartItems(items));
};

export const cartRemoveBook = (id) => (dispatch, getState) => {
  const state = getState();
  const items = updateOrder(state, id, -1);
  dispatch(triggerCartItems(items));
};

export const cartDeleteBook = (id) => (dispatch, getState) => {
  const { cartItems } = getState().ShopCartReducer;
  const items = cartItems.filter((el) => el.id !== id)
  dispatch(triggerCartItems(items));
};