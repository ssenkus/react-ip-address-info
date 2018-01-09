import React, {Component} from 'react';
import IpAddressInfo from '../models/IpAddressInfo';


class IpAddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ip: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        var self = this;

        fetch('http://localhost:8080/api/v1/ipaddress/' + this.state.ip)
            .then(resp => resp.json())
            .then(resp => {
                self.props.add(new IpAddressInfo(resp));
            });
    }

    render() {
        return (
            <form className="ipAddressForm" onSubmit={this.handleSubmit}>
                <label>
                    IP Address:
                    <input type="text" value={this.state.ip} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}


export default IpAddressForm;