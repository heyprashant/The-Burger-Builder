import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props)=> (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div/> 
        <div/>
        <div/>
    </div>
);
//above we are using empty dv or self closing div because the attached css file style them
export default drawerToggle;