import * as React from "react";
import {Alert, Button, Modal} from "react-bootstrap";

interface InformationModalProps {
    show: boolean;
    errorMessage: string | null;
    close: () => void;
}

interface InformationModalState {

}

export class InformationModal extends React.Component<InformationModalProps, InformationModalState> {

    constructor(props: InformationModalProps) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Body>
                    <Alert variant={this.props.errorMessage === null ? "success" : "danger"}>
                        {this.props.errorMessage === null ?
                            <p>Transaction succeeded! You are being directed to list page</p> :
                            <p>{this.props.errorMessage}</p>
                        }
                    </Alert>
                </Modal.Body>
                {this.props.errorMessage !== null &&
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={this.props.close}>Try Again</Button>
                </Modal.Footer>
                }
            </Modal>
        );
    }

}