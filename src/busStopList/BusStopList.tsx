import * as React from "react";
import {Col, Table} from "react-bootstrap";
import {BusStop, busStopService} from "../entityStore/BusStopService";
import {BusStopListRow} from "./BusStopListRow";
import "./BusStopList.css";
import {ErrorDisplayer} from "./ErrorDisplayer";

interface BusStopListProps {
    onDonationClick: (busStop: BusStop) => void;
    onMapClick: (busStop: BusStop) => void;
    transparent: boolean;
}

interface BusStopListState {
    busStops: BusStop[];
    errorOccurred: boolean;
}

export class BusStopList extends React.Component<BusStopListProps, BusStopListState> {

    constructor(props: BusStopListProps) {
        super(props);
        this.state = {
            busStops: [],
            errorOccurred: false,
        };
    }

    public refresh = () => {
        try {
            const busStops: BusStop[] = busStopService.getAllStops();
            this.setState({
                busStops,
                errorOccurred: false,
            });
        } catch (e) {
            this.setState({
                errorOccurred: true,
            });
        }
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        const transparent: string = this.props.transparent ? " transparent-list" : "";
        return (
            <Col xs={12} md={6}
                 className={"d-flex justify-content-center bus-stop-list" + transparent}>
                {this.state.errorOccurred ?
                    <ErrorDisplayer
                        refresh={this.refresh}
                    />
                    :
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Table className="table-filter">
                                <tbody>
                                {this.state.busStops.map((busStop: BusStop) =>
                                    <BusStopListRow
                                        busStop={busStop}
                                        key={busStop.name}
                                        onDonationClick={this.props.onDonationClick}
                                        onMapClick={this.props.onMapClick}
                                    />
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                }
            </Col>
        );
    }

}
