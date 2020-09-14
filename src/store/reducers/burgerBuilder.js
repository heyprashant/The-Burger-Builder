import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    building : false
  };
  
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const setIngredient = (state,action) =>{
    return updateObject(state, 
        {ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat},
        totalPrice: 4,
        error :  false,
        building: false
         })
}
const fetchIngredientsFailed = (state, action)=>{
    return updateObject(state,{error: true })

}

const reducer = (state = initialState, action)=>{
    switch (action.type) { 
        //returning state in clean way using utilit funciton this will help us leanin reducers fucntion
        case actionTypes.ADD_INGREDIENT: 
            const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] +1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {ingredients: updatedIngredients, 
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
                }
            return updateObject(state, updatedState)
        //this is the typical way of returning state
        case actionTypes.REMOVE_INGREDIENT : 
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
            
        };
        case actionTypes.SET_INGREDIENTS : return setIngredient(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action)        
        
        default:
            return state;
    }
}
//similarly we can outsource the code from switch statement which makes it more lean and help us see all the cases in same screen as in order reducer.

export default reducer;