import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose ,combineReducers} from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk'; //thunk is middleware, use to execute Async code in Action creators

const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;    
//compose is use to combine multiple enhancer, applymiddleware is also a enhance like this redux devtool

const rootReducer = combineReducers({
      burgerBuilder : burgerBuilderReducer,
      order : orderReducer,
      auth: authReducer
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store ={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
