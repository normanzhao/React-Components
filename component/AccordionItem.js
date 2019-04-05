import React, { Component } from 'react';
import { ListGroup, Collapse } from 'react-bootstrap';
import styles from '../../styles/Shared/Accordion.module.css';

export default class AccordionItem extends Component {
    constructor(props){
        super(props);
        this.state = {open : false}
    }

    render() {
        return (
            <ListGroup.Item className={styles.accordionItem} onClick={()=>{this.setState({open: !this.state.open})}}>
                <h6>{this.props.title}</h6>
                <Collapse in={this.state.open} className={styles.itemText}>
                    <div> 
                        {this.props.children}
                    </div>  
                </Collapse>
            </ListGroup.Item>
        );
    }
 }