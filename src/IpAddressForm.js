import React, {Component} from 'react';

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
        this.setState({ ipAddress: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.add({
            ip: this.state.ip,
            latitude: 25,
            longitude: 25
        });
    }

    render() {
        return (
            <form className="ipAddressForm" onSubmit={this.handleSubmit}>
                <label>
                    IP Address:
                    <input type="text" value={this.state.ip} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default IpAddressForm;