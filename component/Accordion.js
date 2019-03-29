import React, { Component } from 'react';
import {ListGroup } from 'react-bootstrap';
import AccordionItem from './AccordionItem';
import styles from '../styles/Accordion.module.css';

export default class Accordion extends Component {
    renderItems = () => {
        return this.props.children.map((item) =>{
            return <AccordionItem key={item.props.title} title={item.props.title}>
                {item.props.children}
            </AccordionItem>

        })
    }

    render() {
        return (
            <>
                <h4>{this.props.heading}</h4>
                <ListGroup className={styles.noBorders} variant="flush">
                    {this.renderItems()}
                </ListGroup>
            </>
            
        );
    }
 }