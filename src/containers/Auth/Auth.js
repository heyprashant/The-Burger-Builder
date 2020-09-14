import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from "react-router";
import {updateObject,checkValidity} from '../../shared/utility';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';


class Auth extends Component {
  //Using local storage/state to store token and form details.
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup : true
  }
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName )=>{
      const updatedControls = updateObject(this.state.controls,{
        [controlName] :  updateObject(this.state.controls[controlName],{
          value : event.target.value,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        })});
      this.setState({controls : updatedControls});

  }
 submitHandler = (event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup )
  }
  switchAuthModeHandler =()=>{
    this.setState((prevState=>({isSignup : !prevState.isSignup})))
  }

  render() {
    const formElementArray = [];

    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation} //this is prevent validation check on the input which we dont want to like dropdown
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    if(this.props.loading){
        form = <Spinner/>
    }
    let errorMessage = null;
    if(this.props.error){
      errorMessage = (<p> {this.props.error.message} </p>)
    }
    let authRedirect = null;

    if(this.props.isAuth){  
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className ={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignup ? "Sign Up" : "Sign In"}</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType ="Danger">SWITCH TO {this.state.isSignup? "SIGN-IN" : "SIGN-UP"}</Button>

      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    loading : state.auth.loading,
    error : state.auth.error,
    isAuth : state.auth.token !== null,
    buildingBurger : state.burgerBuilder.building,
    authRedirectPath : state.auth.authRedirectPath
    
  }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password, isSignup ) => dispatch (actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath : ()=> dispatch (actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Auth,axios));
