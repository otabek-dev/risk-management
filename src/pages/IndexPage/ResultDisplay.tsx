import React from 'react';

interface ResultDisplayProps {
  positionSize: number;
  percentToStopLoss: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  positionSize,
  percentToStopLoss,
}) => {
  return (
    <div>
      <h2>Результаты расчета:</h2>
      <p>Рекомендуемый объем позиции: ${positionSize.toFixed(2)}</p>
      <p>Процент до стоп-лосса: {percentToStopLoss.toFixed(2)}%</p>
    </div>
  );
};

export default ResultDisplay;
