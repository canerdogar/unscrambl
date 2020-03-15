import React from 'react';
import { mount } from 'enzyme';
import {busStopService} from "../entityStore/BusStopService";
import {BusStopList} from "../busStopList/BusStopList";

jest.mock('../entityStore/BusStopService');

describe("Check filter and sort", () => {
    beforeAll(() => {
        (busStopService as any).getAllStops.mockImplementation(() => {
            return [
                { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
                { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 100, name: 'Peachtree Center Mall' },
                { stopId: 3, lat: 33.757355, lng: -84.386423, donationsRaisedInDollars: 200, name: 'PeachMall' },
            ];
        })
    })

    test("Check filter and sort", () => {
        let dom = mount(<BusStopList onDonationClick={() => null} onMapClick={() => null} transparent={false}/>);
        expect(dom.find("tr")).toHaveLength(3);

        // filter with peach
        dom.find("input").simulate('change', { target: { value: 'Peach' } });
        expect(dom.find("tr")).toHaveLength(2);
        expect(dom.find("tr").first().find(".badge").text()).toBe("100");

        // sort
        dom.find("button").simulate('click');
        expect(dom.find("tr").first().find(".badge").text()).toBe("200");
    })
});

describe("Check error state", () => {
    beforeAll(() => {
        (busStopService as any).getAllStops.mockImplementation(() => {
            throw Error("fetch failed")
        })
    })

    test("Check error displayer appears", () => {
        let dom = mount(<BusStopList onDonationClick={() => null} onMapClick={() => null} transparent={false}/>);
        expect(dom.find(".retry")).toBeDefined();

    })
})



