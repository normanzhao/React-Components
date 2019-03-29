import React, { Component } from 'react';
import moment from 'moment';
import {Form,InputGroup } from 'react-bootstrap';

/*

the prop onChange is removed from the props of the InputGroup so the Group can still be styled independently. 
Furthermore, this allows this component to return a Moment instead of a string value

*/

export default class AddMealModal extends Component {
    months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    years = [moment().format("YYYY"), moment().add('1','year').format("YYYY")];
    hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    minutes = ["00", "15", "30", "45"];
    meridiems = ["AM", "PM"];
    constructor(props){
        super(props);
        this.state = {
            month: "",
            day: "",
            year: "",
            hour: "",
            minute: "",
            meridiem: ""
        }
        this.stateUpdater = this.stateUpdater.bind(this);
        this.renderDays = this.renderDays.bind(this);
    }

    componentDidMount(){
        let roundedMinutes = Math.ceil(this.props.value.format("mm") / 15) * 15;
        let twentyFourHours = this.props.value.format("HH");
        this.setState({
            month: this.props.value.format("MMMM"),
            day: this.props.value.format("DD"),
            year: this.props.value.format("YYYY"),
            hour: this.props.value.format("hh"),
            minute: roundedMinutes >= 60 ? "00" : roundedMinutes,
            meridiem: twentyFourHours < 12 ? "AM" : "PM"
        }, ()=>{
            this.props.onChange(this.props.name, moment(`${this.state.month}/${this.state.day}/${this.state.year} ${twentyFourHours}:${this.state.minute}`, "MMMM/DD/YYYY HH:mm"));
        });
    }

    renderDropDown(name, data){
        return (
            <Form.Control as="select" name={name} onChange={this.stateUpdater} value={this.state[name]} disabled={this.props.disabled}>
            {
                data.map((datum)=>{
                    return <option key={datum}>{datum}</option>
                })
            }
            </Form.Control>
        )
    }

    renderDays(){
        let days;
        switch(this.state.month){
            case "Feb":
                days = (this.state.year % 4 === 0 ? 28 : 29);
                break;
            case "Apr": case "Jun": case "Sep": case "Nov": 
                days = 30;
                break;
            default:
                days = 31;
                break;
        }
        return (
            <Form.Control as="select" name="day" onChange={this.stateUpdater} value={this.state.day} disabled={this.props.disabled}>
            {
                [...Array(days).keys()].map((key)=>{
                    return <option key={key+1}>{key+1}</option> 
                })
            }
            </Form.Control>
        )
    }

    stateUpdater(e) {
        this.setState({ [e.target.name]: e.target.value },()=>{
            let twentyFourHours = this.state.meridiem === "AM" ? this.state.hour : String(parseInt(this.state.hour) + 12);
            this.props.onChange(this.props.name, moment(`${this.state.month}/${this.state.day}/${this.state.year} ${twentyFourHours}:${this.state.minute}`, "MMMM/DD/YYYY HH:mm"));
        });
    }

    render() {
    let {label, value, onChange, ...others} = this.props;
      return (
        <InputGroup {...others}>
            <InputGroup.Text style={{width: '125px'}}>{this.props.label}</InputGroup.Text>
            {this.renderDropDown("month", this.months)}
            {this.renderDays()}
            {   
                //render dropdown if if's a week before a new year
                moment().add('7', 'days').isAfter(moment().startOf('year').add('1', 'year')) ? this.renderDropDown("year", this.years) : <InputGroup.Text>{this.state.year}</InputGroup.Text>
            }
            {this.renderDropDown("hour", this.hours)}
            {this.renderDropDown("minute", this.minutes)}
            {this.renderDropDown("meridiem", this.meridiems)}
        </InputGroup>
      )
    }
  }