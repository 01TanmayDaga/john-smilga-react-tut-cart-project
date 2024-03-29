import {
  CLEAR_CART,
  DECREASE,
  DISPLAY,
  INCREASE,
  LOADING,
  REMOVE,
} from "./action";

const reducer = (state, action) => {
  let newCart;
  let item;
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: new Map() };
    case REMOVE:
      newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    case INCREASE:
      newCart = new Map(state.cart);
      item = newCart.get(action.payload.id);
      newCart.set(action.payload.id, { ...item, amount: item["amount"] + 1 });
      return { ...state, cart: newCart };

    case DECREASE:
      newCart = new Map(state.cart);
      item = newCart.get(action.payload.id);
      if (item["amount"] == 1) {
        return reducer(state, { ...action, type: REMOVE });
      }
      newCart.set(action.payload.id, { ...item, amount: item["amount"] - 1 });
      return { ...state, cart: newCart };
    case LOADING:
      return { ...state, loading: true };
    case DISPLAY:
  
      const newCart = action.payload.cart;

      return {
        ...state,
        loading: false,
        cart: new Map(newCart.map((item) => [item.id, item])),
      };
    default:
      throw new Error(`No action type found of type - ${action.type}`);
  }
};

export default reducer;
