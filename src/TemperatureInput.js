import React from 'react';
import { scaleNames } from './constants';

export default function({ temperature, scale, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature}
        onChange={e => onTemperatureChange(e.target.value)} />
    </fieldset>
  )
}