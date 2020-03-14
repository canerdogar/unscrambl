import * as React from "react";
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ErrorDisplayer.css";

interface ErrorDisplayerProps {
    refresh: () => void;
}

interface ErrorDisplayerState {

}

export class ErrorDisplayer extends React.Component<ErrorDisplayerProps, ErrorDisplayerState> {

    constructor(props: ErrorDisplayerProps) {
        super(props);
    }

    render() {
        return (
            <div className="retry d-flex align-items-start flex-column" onClick={this.props.refresh}>
                <h6>Fetching list of bus stop failed. Click to retry.</h6>
                <div className="d-flex justify-content-center w-100">
                    <FontAwesomeIcon icon={faRedo} className="iconContainer m-1"/>
                </div>
            </div>
        );
    }

}
