import * as React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {CCValidationEnum, CreditCardType, checkCreditCard} from "./CreditCardValidator";
import "./PaymentForm.css";
import {BusStop} from "../entityStore/BusStopService";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from "lodash";

interface PaymentFormProps {
    busStop: BusStop;
    closePanel: () => void;
}

interface PaymentFormState {

}

export class PaymentForm extends React.Component<PaymentFormProps, PaymentFormState> {

    private mask: string = "____ ____ ____ ____";
    private oldCardNumberValue: string = "____ ____ ____ ____";

    constructor(props: PaymentFormProps) {
        super(props);

    }

    // Strip everything which are not numbers
    private strip = (maskedData: string): string[] => {
        function isDigit(char: string) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }

    // Replace `_` characters with characters from `data`
    private applyMask = (data: string[]): string => {
        return this.mask.split('').map(function(char) {
            if (char !== '_') return char;
            if (data.length === 0) return char;
            return data.shift();
        }).join('')
    }

    private reapplyMask = (data: string): string => {
        return this.applyMask(this.strip(data));
    }

    private creditCardListener = (event: any): void => {
        let field: HTMLInputElement = event.target as HTMLInputElement;

        let maskedInput: string = this.reapplyMask(field.value);
        let i;
        for (i = maskedInput.length - 1; i >= 0; i--) {
            if (maskedInput[i] !== this.oldCardNumberValue[i]) break;
        }


        field.value = maskedInput;
        this.oldCardNumberValue = maskedInput;
        field.setSelectionRange(i+1, i+1);
    }

    render() {
        const year: number = new Date().getFullYear() % 2000;
        return (
            <Col xs={12} md={4} className="payment-form">
                <div
                    className="d-flex flex-row justify-content-start w-100 mb-1 align-items-center back-button"
                    onClick={this.props.closePanel}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-1"
                    />
                    <span>Go Back</span>
                </div>
                <Form>
                    <Form.Group controlId="formBasicFullname">
                        <Form.Label>Name of the donator</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCardNumber">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={this.mask}
                            defaultValue={this.mask}
                            pattern="\b\d{4} \d{4} \d{4} \d{4}\b"
                            onChange={this.creditCardListener}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={8} lg={8}>
                                <Form.Label>Expiry Date</Form.Label>
                                <Row>
                                    <Col xs={6} lg={6}>
                                        <Form.Control as="select">
                                            {_.range(1,13).map((option: number) =>
                                                <option>{option}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={6} lg={6}>
                                        <Form.Control as="select">
                                            {_.range(year,year + 11).map((option: number) =>
                                                <option>{option}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} lg={4}>
                                <Form.Label>CV Code</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="CV Code"
                                    minLength={3}
                                    maxLength={3}
                                    min={20}
                                    max={99}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicFullname">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email (Optional)" />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg" block>
                        Pay
                    </Button>
                </Form>
            </Col>
        );
    }

}
