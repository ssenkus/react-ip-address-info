import React, {Component} from 'react';
import uuid from 'uuid';
import './App.css';
import NavBar from './components/NavBar';
import IpAddressForm from './components/IpAddressForm';
import IpAddressInfo from './models/IpAddressInfo';
import 'whatwg-fetch';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locations: []
        };


        this.onAdd = this.onAdd.bind(this);
        this.addValidIpAddresses = this.addValidIpAddresses.bind(this);
    }

    addValidIpAddresses() {
        let locations = this.state.locations;
        let validIpAddresses = [
            '50.43.90.82',
            '107.170.178.153',
            '71.193.202.188',
            '209.68.11.55',
            '14.21.124.55',
            '22.54.76.202',
            '24.4.76.202',
            '24.24.24.24',
            '84.45.22.12'
        ];

        var self = this;
        validIpAddresses.forEach((ipAddress) => {

            fetch('http://localhost:8080/api/v1/ipaddress/' + ipAddress)
                .then(resp => resp.json())
                .then(resp => {
                    console.log('resp', resp);
                    locations.push(new IpAddressInfo(resp));
                    self.setState({locations: locations});
                });
        });
    }


    onAdd(location) {
        let locations = this.state.locations;
        location.key = uuid.v4();
        locations.push(location);
        this.setState({locations: locations});
    }

    render() {

        const listItems = this.state.locations.map((item) => {
            return (
                <tr key={item.key}>
                    <td>{item.ip}</td>
                    <td>{item.city || '[City]'}, {item.region_code || '[Region Code]'} {item.zip_code || '[Zip Code]'}<br />
                        {item.country_name} ({item.country_code})
                    </td>
                    <td>{item.latitude}, {item.longitude}</td>
                    <td>ACTIONS</td>
                </tr>
            )
        });

        return (
            <div className="App">
                <NavBar/>
                <main role="main" className="container">
                    <div className="container">
                        <div className="row">
                            <IpAddressForm add={this.onAdd}/>
                            <button id="add-valid-ips-button" className="btn btn-success" onClick={this.addValidIpAddresses}>Add Valid IPs
                            </button>
                        </div>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>
                                <th>IP Address</th>
                                <th>Location info</th>
                                <th>Coordinates (Lat, Long)</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listItems}
                            </tbody>
                        </table>

                    </div>
                </main>
            </div>
        );
    }
}

export default App;
