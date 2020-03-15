import React from 'react';
import { mount } from 'enzyme';
import { PaymentForm } from "../payment/PaymentForm";
import {BusStop, busStopService} from "../entityStore/BusStopService";

jest.mock('../entityStore/BusStopService');

const paymentBusStop: BusStop = {
    stopId: 1,
    lat: 33.760262,
    lng: -84.384706,
    donationsRaisedInDollars: 0,
    name: 'Hertz at Portman Blvd'
};

let validCardNumber = "5500 0000 0000 0004";
let invalidCardNumber = "1111 1111 1111 1111";

describe("Check input field restrictions", () => {

    (busStopService as any).addDonation.mockImplementation((stopId: number, donationAmountInDollars: number) => null);

    test("Name not given", () => {
        const closePanel = jest.fn(() => null);
        const closeAndRefresh = jest.fn(() => null);
        const dom = mount(<PaymentForm
            busStop={paymentBusStop}
            closePanel={closePanel}
            closeAndRefresh={closeAndRefresh}
        />);

        dom.find("#formBasicAmount").simulate('change', { target: { value: 100 } });
        let cardInput = dom.find("#formBasicCardNumber");
        (cardInput.getDOMNode() as HTMLInputElement).value = validCardNumber;
        cardInput.simulate("change");
        dom.find("#formBasicCV").simulate('change', { target: { value: 123 } });
        dom.find("button").simulate('click');

        expect(busStopService.addDonation).not.toHaveBeenCalled();

    })

    test("Amount not given", () => {
        const closePanel = jest.fn(() => null);
        const closeAndRefresh = jest.fn(() => null);
        const dom = mount(<PaymentForm
            busStop={paymentBusStop}
            closePanel={closePanel}
            closeAndRefresh={closeAndRefresh}
        />);

        dom.find("#formBasicFullname").simulate('change', {target: {value: "cerdogar"}});
        let cardInput = dom.find("#formBasicCardNumber");
        (cardInput.getDOMNode() as HTMLInputElement).value = validCardNumber;
        cardInput.simulate("change");
        dom.find("#formBasicCV").simulate('change', { target: { value: 123 } });
        dom.find("button").simulate('click');

        expect(busStopService.addDonation).not.toHaveBeenCalled();

    })

    test("CV given not in the range", () => {
        const closePanel = jest.fn(() => null);
        const closeAndRefresh = jest.fn(() => null);
        const dom = mount(<PaymentForm
            busStop={paymentBusStop}
            closePanel={closePanel}
            closeAndRefresh={closeAndRefresh}
        />);

        dom.find("#formBasicFullname").simulate('change', {target: {value: "cerdogar"}});
        dom.find("#formBasicAmount").simulate('change', { target: { value: 100 } });
        let cardInput = dom.find("#formBasicCardNumber");
        (cardInput.getDOMNode() as HTMLInputElement).value = validCardNumber;
        cardInput.simulate("change");
        dom.find("#formBasicCV").simulate('change', { target: { value: 4444 } });
        dom.find("button").simulate('click');

        expect(busStopService.addDonation).not.toHaveBeenCalled();

    })

    test("Card is not valid", () => {
        const closePanel = jest.fn(() => null);
        const closeAndRefresh = jest.fn(() => null);
        const dom = mount(<PaymentForm
            busStop={paymentBusStop}
            closePanel={closePanel}
            closeAndRefresh={closeAndRefresh}
        />);

        dom.find("#formBasicFullname").simulate('change', {target: {value: "cerdogar"}});
        dom.find("#formBasicAmount").simulate('change', { target: { value: 100 } });
        let cardInput = dom.find("#formBasicCardNumber");
        (cardInput.getDOMNode() as HTMLInputElement).value = invalidCardNumber;
        cardInput.simulate("change");
        dom.find("#formBasicCV").simulate('change', { target: { value: 444 } });
        dom.find("button").simulate('click');

        expect(busStopService.addDonation).not.toHaveBeenCalled();
        expect(dom.find(".alert-danger")).toBeDefined();

    })

})

describe("Service has been failed", () => {

    (busStopService as any).addDonation.mockImplementation((stopId: number, donationAmountInDollars: number) => {
        throw Error("Service failed");
    });

    test("Service failed", () => {
        const closePanel = jest.fn(() => null);
        const closeAndRefresh = jest.fn(() => null);
        const dom = mount(<PaymentForm
            busStop={paymentBusStop}
            closePanel={closePanel}
            closeAndRefresh={closeAndRefresh}
        />);

        dom.find("#formBasicFullname").simulate('change', {target: {value: "cerdogar"}});
        dom.find("#formBasicAmount").simulate('change', { target: { value: 100 } });
        let cardInput = dom.find("#formBasicCardNumber");
        (cardInput.getDOMNode() as HTMLInputElement).value = validCardNumber;
        cardInput.simulate("change");
        dom.find("#formBasicCV").simulate('change', { target: { value: 444 } });
        dom.find("button").simulate('click');

        expect(busStopService.addDonation).not.toHaveBeenCalled();
        expect(dom.find(".alert-danger")).toBeDefined();

    })

})