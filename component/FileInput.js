import React, { Component } from 'react';
import { Form, Image } from 'react-bootstrap';
import styles from '../styles/FileInput.module.css';


import AddImage from '../../assets/add_image.svg';

export default class FileInput extends Component {
  constructor(props){
    super(props);
    //end time is a day ahead, fulfill time is at least 4 hours after that
    this.state = {
        file: null,
        imagePreview: this.props.value,
    }
  }

  changeImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreview: reader.result,
      }, ()=>{this.props.onChange(this.state.file);});
    }
    reader.readAsDataURL(file)
  }
  
  render() {
    return (
        <Form.Group>
            <Form.Group controlId="image_upload" className={styles.imageUploadInput} onChange={this.changeImage}>
                <Form.Control as="input" type="file" disabled={this.props.disabled}/>
            </Form.Group>
            <Form.Label htmlFor="image_upload">
                <Image src={this.state.imagePreview === null ? AddImage : this.state.imagePreview} fluid thumbnail className={styles.image}/>
            </Form.Label>
        </Form.Group>
    );
  }
}
