import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId)=>{
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout =()=> {
    //removing local storage before logout
     localStorage.removeItem('token');
     localStorage.removeItem('expirationDate');
     localStorage.removeItem('userId');

    return {
        type : actionTypes.AUTH_LOGOUT
    } 
}

//performing Async operations - timeout- it will logout automatically when token expires and AUTH_LOGOUT will clear the data from the state(token, userid)
export const checkAuthTimeout = (expirationTime)=>{
    return dispatch => {
        setTimeout(() => {
        dispatch(logout())
        },expirationTime*1000);
    }
}

export const auth = (email, password, isSignup) =>{

    return dispatch=>{
        dispatch(authStart());
        const authData ={
            email : email,
            password : password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNgT1J7eJzjEy8z8acju3kyh3maz4wGdw';
        if(!isSignup){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNgT1J7eJzjEy8z8acju3kyh3maz4wGdw';
        }

        axios.post(url,authData)
             .then(response =>{
                 
                 //Setting local storage for session
                //javascript sotre times in ms sec that why multiply by 1000
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
                 localStorage.setItem('token', response.data.idToken);
                 localStorage.setItem('expirationDate', expirationDate);
                 localStorage.setItem('userId',response.data.localId);
                 //you can find these fileds in browser's devloper mode->application tab->local storage

                 dispatch(authSuccess(response.data.idToken, response.data.localId));
                 dispatch(checkAuthTimeout(response.data.expiresIn));
             } )
             .catch( err =>{
                dispatch(authFail(err.response.data.error))})
    } 
}

export const setAuthRedirectPath = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

//action for auto signin used in app.js | utility action creators to disptach other actions
export const authCheckState = ()=>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));//converting it string date in to date object
            const userId = localStorage.getItem('userId');
            
            if(expirationDate > new Date()){
                const expirationTime = (expirationDate.getTime() - new Date().getTime())/1000; //converting date to seconds
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout(expirationTime))
            }
            else{
                dispatch(logout());
            }

        }
    }
}