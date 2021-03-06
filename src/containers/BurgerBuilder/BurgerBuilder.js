import React, { Component } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"; //not using this component in JSX that's why starts with Small letter
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

//exproting for testing purpose because of redux used default exports
export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  //this lifecyscle hook is the best place to fetch data
  componentDidMount (){
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      
      return sum > 0;
  };

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
    this.setState({
      purchasing: true,
    });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
  }

  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({pathname : '/checkout'}); // still need to rout to Checkout page
   //Below is the code for passing information VIA query parameter from This component to Check out component, but after using Redux it become more easier
    // const queryParams = [];

    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURI(i) + '=' + encodeURI(this.state.ingredients[i]))
    // }
    // queryParams.push('price='+ this.state.totalPrice );
    // const queryString = queryParams.join('&');
    //  this.props.history.push({
    //   pathname : '/checkout',
    //   search : '?' + queryString
    //  });
  };


  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    let burger = this.props.error? <p>ingredients can't be loaded </p> : <Spinner />
    let orderSummary = null

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth= {this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //We have applied React lifecycle hooks(componentShouldUpdate) in Modal component for optimization to prevent unneccessary rendering of modal component
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return {
    ings : state.burgerBuilder.ingredients,
    price : state.burgerBuilder.totalPrice,
    error : state.burgerBuilder.error,
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients :  () => dispatch (actions.initIngredients()),
    onInitPurchase : ()=> dispatch (actions.purchaseInit()),
    onSetAuthRedirectPath: (path)=> dispatch (actions.setAuthRedirectPath(path)) 
    
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); //HOC component
