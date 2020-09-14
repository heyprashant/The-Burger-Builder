import React from 'react';
import classes from './Button.css';

const button = (props)=>(
    <button 
        className = {[classes.Button , classes[props.btnType]].join(' ')} //className takes string as an input
        disabled ={props.disabled}
        onClick = {props.clicked}>{props.children}</button>
);

export default button;