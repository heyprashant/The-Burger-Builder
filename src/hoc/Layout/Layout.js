import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import classes from './Layout.css'; //this is only be possible by adding CSS-Module by changing config in webpack.
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer:false
    };

    sideDrawerClosedHandler = () =>{
        this.setState ({
            showSideDrawer : false
        })
    }
    sideDrawerToggleHandler = () =>{
        //this is the clean approach usinf setSate which involves prevState
        this.setState( (prevState)=>{
            return {showSideDrawer : !prevState.SideDrawer}
        });
    } 

    /* Wrong way of setting state using prev state- because due to the async nature of the Setstate
    this may leads to unexpected outcomes 
    this.setState({
            showSideDrawer : !this.state.showSideDrawer
        })
    */

    render(){
        return (
        <Aux>
            <Toolbar 
            isAuth = {this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            isAuth = {this.props.isAuthenticated}
            open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
             {this.props.children}
            </main>
        </Aux>
        );
    }
}

const mapStateToPops = state =>{
    return {
        isAuthenticated : state.auth.token !==null
    }
}

export default connect(mapStateToPops)(Layout);

//We use Higher order componenet to bind these elements into one