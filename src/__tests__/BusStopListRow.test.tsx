import React from 'react';
import { mount } from 'enzyme';
import {BusStopListRow} from "../busStopList/BusStopListRow"
import {BusStop} from "../entityStore/BusStopService";

test("Badge is success", () => {
    const busStop: BusStop = {
            stopId: 7,
            lat: 33.759215,
            lng: -84.391719,
            donationsRaisedInDollars: 800,
            name: 'Sky View Atlanta'
        };
    const dom = mount(<table>
        <tbody>
        <BusStopListRow onDonationClick={() => null} onMapClick={() => null} busStop={busStop}/>
        </tbody>
    </table>);

    expect(dom.find(".badge-success")).toBeDefined();
});