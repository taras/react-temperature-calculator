import React from "react";
import ReactDOM from "react-dom";
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict';
import { tryConvert, toCelsius, toFahrenheit } from './constants';
import State from '@microstates/react';

class Converter {
  scale = String
  temperature = String

  initialize() {
    return this.scale.set('c');
  }

  get isCelcius() {
    return this.scale.state === 'c';
  }

  get celcius() {
    return this.isCelcius ? this.temperature.state : tryConvert(this.temperature.state, toCelsius);
  }

  get fahrenheit() {
    return this.isCelcius ? tryConvert(this.temperature.state, toFahrenheit) : this.temperature.state;
  }

  changeCelcius(temperature) {
    return this.scale.set('c').temperature.set(temperature);
  }

  changeFahrenheit(temperature) {
    return this.scale.set('f').temperature.set(temperature);
  }
}

function App() {
  return (<State type={Converter}>
  {app => {
      return (
        <div>
          <TemperatureInput
            scale="c"
            temperature={app.celcius}
            onTemperatureChange={t => app.changeCelcius(t)} />
          <TemperatureInput
            scale="f"
            temperature={app.fahrenheit}
            onTemperatureChange={t => app.changeFahrenheit(t)} />
          <BoilingVerdict
            celsius={parseFloat(app.celcius)} />
        </div>
      )
  }}
  </State>)
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
