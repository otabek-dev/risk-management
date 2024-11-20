import { Headline, Text } from '@telegram-apps/telegram-ui';
import React from 'react';

interface ResultDisplayProps {
  positionSize: number;
  percentToStopLoss: number;
  potentialProfit: number | null;
  potentialLoss: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  positionSize,
  percentToStopLoss,
  potentialProfit,
  potentialLoss,
}) => {
  return (
    <div>
      <Headline weight="1">Результаты расчета:</Headline>
      <div className="flex flex-col">
        <Text weight="3" className="text-yellow-500">
          Объем позиции: ${positionSize.toFixed(2)}
        </Text>
        <Text weight="3">Процент до стоп-лосса: {percentToStopLoss.toFixed(2)}%</Text>
        {potentialLoss !== null && (
          <Text weight="3" className="text-red-500">
            Потенциальный убыток: ${potentialLoss.toFixed(2)}
          </Text>
        )}
        {potentialProfit !== null && (
          <Text weight="3" className="text-green-500">
            Потенциальная прибыль: ${potentialProfit.toFixed(2)}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
