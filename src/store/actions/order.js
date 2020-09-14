import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//Asunc Action creator
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    //here protected resource is order and we are passing our token to backend a token for authentication :"Auth" is define in rules in firebase api for read and write rule
    axios
      .post('/orders.json?auth='+ token , orderData) //orders.JSON because firebase endpoint accepts like this, for other REst API we can only use /orders
      .then((response) => {
        
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(actionTypes.PURCHASE_BURGER_FAIL(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

//here we are getting token from the container but we can also use getState as second argument after dispatch to the token.
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    //authetication - sending token to the protected resource at the backend
     //orderBy and equalTo is understand by firbase to order the data and using equalTO we can filter the data with key given in this case userID
     const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="'+ userId +'"';
    axios
      .get('/orders.json' + queryParams) 
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
