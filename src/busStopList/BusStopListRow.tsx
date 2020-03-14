import * as React from "react";
import {BusStop} from "../entityStore/BusStopService";
import {Badge, OverlayTrigger} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDonate, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import "./BusStopListRow.css";

interface BusStopListRowProps {
    busStop: BusStop;
    onDonationClick: (busStop: BusStop) => void;
    onMapClick: (busStop: BusStop) => void;
}

interface BusStopListRowState {

}

export class BusStopListRow extends React.Component<BusStopListRowProps, BusStopListRowState> {

    constructor(props: BusStopListRowProps) {
        super(props);
    }

    private clicked = () => {
        console.warn("clicked");
    }

    render() {
        const { busStop, onDonationClick, onMapClick } = this.props;
        return (
            <tr>
                <td>{busStop.name}</td>
                <td>
                        <p className="d-flex flex-row justify-content-start">
                            <Badge
                                pill
                                variant={busStop.donationsRaisedInDollars < 700 ? "warning" : "success"}
                                className="mr-1"
                            >
                                {busStop.donationsRaisedInDollars}
                            </Badge>
                            Collected
                        </p>
                </td>
                <td>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={
                            <span className="bus-stop-icon-tooltip">Make donation</span>
                        }
                    >
                        <FontAwesomeIcon
                            icon={faDonate}
                            className="busStopListRowIcons m-1"
                            onClick={() => onDonationClick(busStop)}
                        />
                    </OverlayTrigger>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={
                            <span className="bus-stop-icon-tooltip">Show on map</span>
                        }
                    >
                        <FontAwesomeIcon
                            icon={faLocationArrow}
                            className="busStopListRowIcons m-1"
                            onClick={() =>onMapClick(busStop)}
                        />
                    </OverlayTrigger>
                </td>
            </tr>
        );
    }

}
