import React from 'react';
import {BusStopList} from "./busStopList/BusStopList";
import {Container, Row} from "react-bootstrap";
import {PaymentForm} from "./payment/PaymentForm";
import {Map} from "./map/Map";
import {BusStop} from "./entityStore/BusStopService";

interface AppProps {

}

interface AppState {
  openedPanel: PanelType | null;
  busStop: BusStop | null;
}

enum PanelType {
  PAYMENT,
  MAP,
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
        openedPanel: null,
        busStop: null,
    };
  }

  private showPaymentForm = (busStop: BusStop) => {
    this.setState({
        openedPanel: PanelType.PAYMENT,
        busStop
    })
  }

  private showMap = (busStop: BusStop) => {
      this.setState({
          openedPanel: PanelType.MAP,
          busStop
      })
  }

  render() {
      return (
          <Container fluid className="d-flex h-100 flex-column">
              <Row className="flex-fill d-flex justify-content-center align-items-center">
                  <BusStopList
                      onMapClick={this.showMap}
                      onDonationClick={this.showPaymentForm}
                      transparent={this.state.openedPanel !== null}
                  />
                  {this.state.openedPanel === PanelType.PAYMENT &&
                    <PaymentForm
                        busStop={this.state.busStop}
                    />
                  }
                  {this.state.openedPanel === PanelType.MAP &&
                  <Map
                    busStop={this.state.busStop}
                  />
                  }
              </Row>
          </Container>
      );
  }

}

export default App;
