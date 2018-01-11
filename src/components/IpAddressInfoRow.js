import React from 'react';


class IpAddressInfoRow extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {

        return (
            <tr key={this.props.item.key}>
                <td>{this.props.item.ip}</td>
                <td>{this.props.item.city || '[City]'}, {this.props.item.region_code || '[Region Code]'} {this.props.item.zip_code || '[Zip Code]'}<br />
                    {this.props.item.country_name} ({this.props.item.country_code})
                </td>
                <td>{this.props.item.latitude}, {this.props.item.longitude}</td>
                <td><button className="btn btn-danger" onClick={this.props.delete}>Delete</button></td>
            </tr>


        );


    }


}


export default IpAddressInfoRow;