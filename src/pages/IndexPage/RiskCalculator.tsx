import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay'

const RiskCalculator: React.FC = () => {
  const [accountSize, setAccountSize] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [entryPrice, setEntryPrice] = useState<number>(100);
  const [stopLossPrice, setStopLossPrice] = useState<number>(90);
  const [leverage, setLeverage] = useState<number>(1);

  const calculatePositionSize = () => {
    const riskAmount = (accountSize * (riskPercent / 100)) / leverage;
    const priceDifference = Math.abs(entryPrice - stopLossPrice);
    const percentToStopLoss = (priceDifference / entryPrice) * 100;
    const positionSize = riskAmount / (percentToStopLoss / 100);

    return {
      positionSize: positionSize,
      percentToStopLoss: percentToStopLoss,
    };
  };

  const results = calculatePositionSize();

  return (
    <div>
      <div>
        <label>Размер депозита ($):</label>
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Риск на сделку (%):</label>
        <input
          type="number"
          value={riskPercent}
          onChange={(e) => setRiskPercent(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Цена входа ($):</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Цена стоп-лосса ($):</label>
        <input
          type="number"
          value={stopLossPrice}
          onChange={(e) => setStopLossPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Плечо:</label>
        <input
          type="number"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
        />
      </div>
      <ResultDisplay
        positionSize={results.positionSize}
        percentToStopLoss={results.percentToStopLoss}
      />
    </div>
  );
};

export default RiskCalculator;
