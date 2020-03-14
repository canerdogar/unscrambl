export interface BusStop {
    stopId: number;
    lat: number;
    lng: number;
    donationsRaisedInDollars: number;
    name: string;
}

type cloneObject = {[key: string]: cloneTypes};
type cloneTypes = Date | Array<any> | cloneObject | number | string | boolean | null | undefined;

function randomlyFailWith(errorMessage: string)
{
    if ((Math.random() * 100) > 80.0)
    {
        throw new Error(errorMessage);
    }
}

// thanks to http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj: cloneTypes): cloneTypes {

    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        let copy: Date = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        let copy: Array<any> = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy.push(clone(obj[i]));
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy: cloneObject = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy obj! Its type is not supported.');
}

class BusStopService {

    private stops: BusStop[] = [
        { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
        { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' },
        { stopId: 3, lat: 33.757355, lng: -84.386423, donationsRaisedInDollars: 0, name: 'Georgia Pacific' },
        { stopId: 4, lat: 33.758648, lng: -84.382754, donationsRaisedInDollars: 0, name: 'Sheraton Atlanta' },
        { stopId: 5, lat: 33.755365, lng: -84.384921, donationsRaisedInDollars: 0, name: 'Loudermilk Center' },
        { stopId: 6, lat: 33.756887, lng: -84.389417, donationsRaisedInDollars: 100, name: 'Rialto Arts Center' },
        { stopId: 7, lat: 33.759215, lng: -84.391719, donationsRaisedInDollars: 800, name: 'Sky View Atlanta' },
        { stopId: 8, lat: 33.762046, lng: -84.391708, donationsRaisedInDollars: 50, name: 'Centennial Park' },
        { stopId: 9, lat: 33.763004, lng: -84.387041, donationsRaisedInDollars: 0, name: 'Suntrust Plaza' },
        { stopId: 10, lat: 33.754661, lng: -84.390101, donationsRaisedInDollars: 0, name: 'Sweet Auburn Market' },
        { stopId: 11, lat: 33.754661, lng: -84.380201, donationsRaisedInDollars: 0, name: 'Kizilay' },
        { stopId: 12, lat: 33.754661, lng: -84.380301, donationsRaisedInDollars: 0, name: 'Necatibey' },
        { stopId: 13, lat: 33.754661, lng: -84.380401, donationsRaisedInDollars: 0, name: 'Milli Kutuphane' },
        { stopId: 14, lat: 33.754661, lng: -84.380501, donationsRaisedInDollars: 0, name: 'Sogutozu' },
    ];

    /**
     * returns an array of all stops on success
     * on failure, throws Error
     */
    public getAllStops = (): BusStop[] => {

        randomlyFailWith('Unable to read database');

        return clone(this.stops) as BusStop[];
    }

    /**
     * returns nothing on success
     * on failure, throws Error
     */
    public addDonation = (stopId: number, donationAmountInDollars: number) => {

        randomlyFailWith('Unable to connect to database');

        let stop: BusStop | undefined = this.stops.find(function (s)
        {
            return s.stopId === stopId;
        });

        if (!stop)
        {
            throw new Error('Stop with stop id ' + stopId + ' not found.');
        }

        stop.donationsRaisedInDollars += donationAmountInDollars;
    }

}

export const busStopService: BusStopService = new BusStopService();
