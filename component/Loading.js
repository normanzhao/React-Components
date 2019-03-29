import React, { Component } from 'react';
import styles from '../styles/Loading.module.css';
import { ReactComponent as LoadingIcon } from '../assets/loading_icon.svg';


export default class Loading extends Component {
    render() {
        return (
        <div className={styles.iconParent}>
            <LoadingIcon className={styles.icon}/>
        </div>
        );
    };
}