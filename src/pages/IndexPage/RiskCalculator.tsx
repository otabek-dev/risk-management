import ResultDisplay from './ResultDisplay';
import { Caption, Input } from '@telegram-apps/telegram-ui';
import { useRiskCalculatorFieldsStore } from '@/stores/riskCalculatorFieldsStore';

const RiskCalculator: React.FC = () => {
  const {
    accountSize,
    entryPrice,
    leverage,
    riskPercent,
    stopLossPrice,
    takeProfitPrice,
    setAccountSize,
    setEntryPrice,
    setLeverage,
    setRiskPercent,
    setStopLossPrice,
    setTakeProfitPrice,
  } = useRiskCalculatorFieldsStore();

  const calculatePositionSize = () => {
    // Преобразуем строки в числа, учитывая возможные пустые строки
    const accountSizeNum = parseFloat(accountSize) || 0;
    const riskPercentNum = parseFloat(riskPercent) || 0;
    const entryPriceNum = parseFloat(entryPrice) || 0;
    const stopLossPriceNum = parseFloat(stopLossPrice) || 0;
    const takeProfitPriceNum = parseFloat(takeProfitPrice) || 0;
    const leverageNum = parseFloat(leverage) || 1;

    // Проверяем, что необходимые поля заполнены
    if (
      accountSizeNum > 0 &&
      riskPercentNum > 0 &&
      entryPriceNum > 0 &&
      stopLossPriceNum > 0 &&
      leverageNum > 0
    ) {
      const riskAmount = (accountSizeNum * (riskPercentNum / 100)) / leverageNum;
      const stopLossDifference = Math.abs(entryPriceNum - stopLossPriceNum);
      const percentToStopLoss = (stopLossDifference / entryPriceNum) * 100;
      const positionSize = riskAmount / (percentToStopLoss / 100);

      let potentialProfit = null;
      if (takeProfitPriceNum > 0) {
        const takeProfitDifference = Math.abs(takeProfitPriceNum - entryPriceNum);
        potentialProfit = (takeProfitDifference / entryPriceNum) * positionSize * leverageNum;
      }

      const potentialLoss = riskAmount; // Потенциальный убыток равен сумме риска

      return {
        positionSize: positionSize,
        percentToStopLoss: percentToStopLoss,
        potentialProfit: potentialProfit,
        potentialLoss: potentialLoss,
      };
    } else {
      return null;
    }
  };

  const results = calculatePositionSize();

  return (
    <div>
      <div>
        <Input
          header="Размер депозита ($)"
          placeholder="Введите размер депозита"
          value={accountSize}
          onChange={(e) => setAccountSize(e.target.value)}
        />
      </div>
      <div>
        <Input
          header="Риск на сделку (%)"
          placeholder="Введите риск на сделку"
          value={riskPercent}
          onChange={(e) => setRiskPercent(e.target.value)}
        />
      </div>
      <div>
        <Input
          header="Цена входа ($)"
          placeholder="Введите цену входа"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </div>
      <div>
        <Input
          header="Цена стоп-лосса ($)"
          placeholder="Введите цену стоп-лосса"
          value={stopLossPrice}
          onChange={(e) => setStopLossPrice(e.target.value)}
        />
      </div>
      <div>
        <Input
          header="Цена тейк-профита ($)"
          placeholder="Введите цену тейк-профита"
          value={takeProfitPrice}
          onChange={(e) => setTakeProfitPrice(e.target.value)}
        />
      </div>
      <div>
        <Input
          header="Плечо"
          placeholder="Введите плечо"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        />
      </div>
      {results ? (
        <div className="p-6">
          <ResultDisplay
            positionSize={results.positionSize}
            percentToStopLoss={results.percentToStopLoss}
            potentialProfit={results.potentialProfit}
            potentialLoss={results.potentialLoss}
          />
        </div>
      ) : (
        <div className="flex justify-center text-red-500 px-6">
          <Caption level="1" weight="1">
            Пожалуйста, заполните все необходимые поля для расчетов.
          </Caption>
        </div>
      )}
    </div>
  );
};

export default RiskCalculator;
