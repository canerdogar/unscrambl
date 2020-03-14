import * as React from "react";
import {Col} from "react-bootstrap";
import "./Map.css";
import {BusStop} from "../entityStore/BusStopService";

interface MapProps {
    busStop: BusStop;
}

interface MapState {

}

export class Map extends React.Component<MapProps, MapState> {

    constructor(props: MapProps) {
        super(props);
    }

    componentDidMount() {
        new google.maps.Map(document.getElementById('map') as Element, {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }

    render() {
        return (
            <Col xs={12} md={8} className="map-container d-flex justify-content-center align-items-center h-100 w-100">
                <div id="map"/>
            </Col>
        );
    }

}