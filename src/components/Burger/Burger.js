import React from 'react';
import classes from './Burger.css';
import Ingredient from './BurgerIngredient/BurgerIngredient';
const burger = (props)=>{

    //Object is the javascript Object which has key method which will return an array of keys of ingredients
    //then map this array .. Array(3) is the javascript method to create an array of three empty undefined spaces. we use this approach to get the count of object key
    //then execute another map in to this , _ shows that we dont care about the value of element, but we need index to make unique key.
    // then return Ingredient component
    let transformedIngredient = Object.keys(props.ingredients).map( igKey =>{  
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <Ingredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    // console.log(transformedIngredient);
    //before using reduce(), transformedIngredient is filled with different empty array for no ingredients used
    //here reduce method concat all element of transformedIngredient array to arr one by one with inital value []
    //it helps us to flattening the the array
    // we can also use .flat() method here for same
    //now if there is no ingredient used then it will show empty transformedIngredient array 
    // we can use this to display add ingredients

    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients!</p>
    }
    return( 
        <div className={classes.Burger}>
            
            <Ingredient type ='bread-top'/>
            {transformedIngredient}
            <Ingredient type ="bread-bottom"/> 
        </div>
    );
}
export default burger;