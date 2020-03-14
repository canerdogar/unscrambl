import * as React from "react";
import {Col} from "react-bootstrap";
import "./Map.css";
import {BusStop} from "../entityStore/BusStopService";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface MapProps {
    busStop: BusStop;
    closePanel: () => void;
}

interface MapState {

}

export class Map extends React.Component<MapProps, MapState> {

    constructor(props: MapProps) {
        super(props);
    }

    componentDidMount() {
        let position = {lat: this.props.busStop.lat, lng: this.props.busStop.lng};

        let map = new google.maps.Map(document.getElementById('map') as Element, {
            center: position,
            zoom: 11
        });
        new google.maps.Marker({
            position: position,
            map: map,
            title: this.props.busStop.name
        });
    }

    render() {
        return (
            <Col xs={12} md={8} className="map-container d-flex flex-column align-items-center h-100 w-100">
                <div
                    className="d-flex flex-row justify-content-start w-100 pt-3 align-items-center back-button"
                    onClick={this.props.closePanel}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-1"
                    />
                    <span>Go Back</span>
                </div>
                <div id="map"/>
            </Col>
        );
    }

}