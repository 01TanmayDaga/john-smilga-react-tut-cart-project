import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY,
} from "./action";
import cartItems from "./data";
import { getTotal } from "./utils";

import fetchData from "./fetchdata";

const url = "https://www.course-api.com/react-useReducer-cart-project";
const AppContext = createContext();

const initialState = {
  loading: true,
  cart: new Map([]),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotal(state.cart);

  useEffect(() => {
    async function fetchCart() {
      const { loading, data } = await fetchData(url);
      if (!loading && data != null) {
        dispatch({ type: DISPLAY, payload: { cart: data } });
      } else {
        dispatch({ type: LOADING });
      }
    }
    fetchCart();
  }, []);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
