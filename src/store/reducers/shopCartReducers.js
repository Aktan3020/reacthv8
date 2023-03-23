// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   cartTotal: 0,
// };

// const shopCartSlice = createSlice({
//   name: "shopCart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       state.cartItems = action.payload;
//     },
//     removeFromCart(state, action) {
//       state.cartItems = action.payload;
//     },
//     deleteFromCart(state, action) {
//       state.cartItems = action.payload;
//     },
//     addTotal(state,action){
//       state.cartTotal = action.payload
//     }
//   },
// });
// const { actions, reducer } = shopCartSlice;

// export { actions as shopCartActions };
// export default reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {
    triggerCartItems: (state, action) => {
      state.cartItems = action.payload
    }
  },
});
const { actions, reducer } = shopCartSlice;

export { actions as shopCartActions };
export default reducer;