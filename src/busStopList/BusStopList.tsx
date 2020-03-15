import * as React from "react";
import {Button, Col, FormControl, InputGroup, Table} from "react-bootstrap";
import {BusStop, busStopService} from "../entityStore/BusStopService";
import {BusStopListRow} from "./BusStopListRow";
import "./BusStopList.css";
import {ErrorDisplayer} from "./ErrorDisplayer";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface BusStopListProps {
    onDonationClick: (busStop: BusStop) => void;
    onMapClick: (busStop: BusStop) => void;
    transparent: boolean;
}

interface BusStopListState {
    busStops: BusStop[];
    errorOccurred: boolean;
    ascending: boolean;
    searchKey: string;
}

export class BusStopList extends React.Component<BusStopListProps, BusStopListState> {

    constructor(props: BusStopListProps) {
        super(props);
        this.state = {
            busStops: [],
            errorOccurred: false,
            ascending: true,
            searchKey: "",
        };
    }

    /**
     * gets stop lists and renders the component with it
     */
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

    /**
     * callback to filter bus stop list with search key
     * @param {BusStop} busStop
     * @returns {any}
     */
    private filterCallback = (busStop: BusStop) =>
        busStop.name.toLowerCase().includes(this.state.searchKey.toLowerCase());

    /**
     * callback to sort bus stop list according to ascending state
     * @param {BusStop} busStop1
     * @param {BusStop} busStop2
     * @returns {number}
     */
    private sortCallback = (busStop1: BusStop, busStop2: BusStop) => {
        return this.state.ascending ? (busStop1.donationsRaisedInDollars - busStop2.donationsRaisedInDollars) :
            (busStop2.donationsRaisedInDollars - busStop1.donationsRaisedInDollars);

    }

    /**
     * sets search key
     * @param event
     */
    private onSearchKeyChange = (event: any) => {
        this.setState({
            searchKey: event.target.value,
        })
    }

    /**
     * sets ascending
     */
    private sort = () => {
        this.setState({
            ascending: !this.state.ascending,
        });
    }

    render() {
        const transparent: string = this.props.transparent ? " transparent-list" : "";
        const rows: JSX.Element[] = this.state.busStops
            .sort(this.sortCallback).filter(this.filterCallback).map((busStop: BusStop) =>
            <BusStopListRow
                busStop={busStop}
                key={busStop.name}
                onDonationClick={this.props.onDonationClick}
                onMapClick={this.props.onMapClick}
            />
        );
        return (
            <Col xs={12} md={6} className={"d-flex align-items-center bus-stop-list flex-column" + transparent}>
                {this.state.errorOccurred ?
                    <ErrorDisplayer
                        refresh={this.refresh}
                    />
                    :
                    <div>
                        <div className="d-flex justify-content-between w-100 m-1">
                            <InputGroup className="w-50">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Search by Name"
                                    type="text"
                                    onChange={this.onSearchKeyChange}
                                />
                            </InputGroup>
                            <Button className="mr-1"
                                variant={this.state.ascending ? "outline-secondary" : "outline-info"}
                                onClick={this.sort}
                            >
                                {this.state.ascending ? "Ascending" : "Descending"}
                            </Button>
                        </div>
                        <div className={"panel panel-default w-100" +
                        (rows.length === 0 ? " d-flex justify-content-center align-items-center" : "")}>
                            {rows.length === 0 ?
                                <h5 className="text-muted">No matched bus stop found</h5>
                                : <div className="panel-body">
                                    <Table className="table-container"><tbody>{rows}</tbody></Table>
                                </div>
                            }
                        </div>
                    </div>
                }
            </Col>
        );
    }

}
