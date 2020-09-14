import React, { Component } from "react";
import classes from './Modal.css';
import Backdrop  from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx/Auxx';
class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
   

    render(){
    
    return(<Aux>
        <Backdrop show ={this.props.show} clicked = {this.props.modalClosed}/>
        <div 
            className ={classes.Modal}
            style={{
                transform : this.props.show ? 'translateY(0)': 'translateY(-100vh)', //thisis CSS transofrmed property for animation
                opacity : this.props.show ? '1' : '0' 
             }}>
            {this.props.children} 
        </div>
        </Aux>); 
    }
}
export default Modal;
