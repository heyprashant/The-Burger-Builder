import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    
    // componentWillMount(){
    // //after using redux we no linger need to get the details from queryparameter, we can get it from local state
    //     const query = new URLSearchParams(this.props.location.search); //this is the java script ibject which simplify search query
    //     const ingredients = {};
    //     let price=0;
    //     //query.entries returns an iterator
    //     for(let param of query.entries()){
    //         //['salad','1']
    //         if(param[0]==='price'){
    //             price = param[1];
    //         }
    //         else{
    //         ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice : price
    //     })

    //     console.log(ingredients);
    //     this.setState({
    //         ingredients : ingredients
    //     })
    // }


    checkoutCancelledHandler =()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary = <Redirect to ="/" />
        let purchasedRedirect = this.props.purchased ?<Redirect to ="/" />: null
        if(this.props.ings){
            summary= (<div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients = {this.props.ings}  
                checkoutCancelled = {this.checkoutCancelledHandler} 
                checkoutContinued = {this.checkoutContinuedHandler} />
                
                <Route path={this.props.match.path + '/contact-data'} 
                    component ={ContactData}
                />
                 {//due to redux, we not longer need to pass props like that, we can use this props in contactdata from global state
                 /* render={(props)=><ContactData ingredients = {this.state.ingredients} price={this.state.totalPrice} {...props}/>}/> */}
                {/* contactData wont get router props due to this way rendering so passing props by ourself */}
            </div>);
        }
        return summary
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps) (Checkout);
