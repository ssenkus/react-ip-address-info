import React, {Component} from 'react';
import uuid from 'uuid';
import './App.css';
import NavBar from './components/NavBar';
import IpAddressForm from './components/IpAddressForm';
import IpAddressInfoRow from './components/IpAddressInfoRow';
import IpAddressInfo from './models/IpAddressInfo';
import 'whatwg-fetch';


import {

    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker
} from "react-simple-maps"


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

    onDelete(location) {
        let locations = this.state.locations;
        let index = locations.indexOf(location);
        locations.splice(index, 1);
        this.setState({locations: locations});
    }

    render() {

        const listItems = this.state.locations.map((item) => {
            return (
                <IpAddressInfoRow key={item.key} item={item} delete={this.onDelete.bind(this, item)}/>
            )
        });


        const markers = this.state.locations.map((item) => {
            return (
                <Marker
                    marker={{coordinates: [ item.longitude,item.latitude]}}
                    style={{
                        default: {fill: 'rgb(40, 167, 69)'},
                        hover: {fill: "#ff0"},
                        pressed: {fill: "#007"},
                    }}>
                    <circle cx={ 0 } cy={ 0 } r={ 2 }/>
                </Marker>
            );
        });


        return (
            <div className="App">
                <NavBar/>
                <main role="main" className="container">
                    <div className="container">
                        <div className="row">
                            <div>
                                <ComposableMap>
                                    <ZoomableGroup>
                                        <Geographies
                                            geography={ "https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json" }>
                                            {(geographies, projection) => geographies.map(geography => (
                                                <Geography
                                                    style={{
                                                        default: {fill: "#000"},
                                                        hover: {fill: "#900"},
                                                        pressed: {fill: "#ccc"},
                                                    }}
                                                    key={ geography.id }
                                                    geography={ geography }
                                                    projection={ projection }
                                                />
                                            ))}
                                        </Geographies>
                                        <Markers>
                                            {markers}
                                        </Markers>
                                    </ZoomableGroup>

                                </ComposableMap>
                            </div>
                        </div>
                        <div className="row">
                            <IpAddressForm add={this.onAdd}/>
                            <button id="add-valid-ips-button" className="btn btn-success"
                                    onClick={this.addValidIpAddresses}>Add Valid IPs
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
