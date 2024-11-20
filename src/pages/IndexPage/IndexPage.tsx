import { Headline } from '@telegram-apps/telegram-ui'
import RiskCalculator from './RiskCalculator'


export  const IndexPage  = () => {
  return (
    <div>
      <Headline>Risk management calculator</Headline>
      <RiskCalculator />
    </div>
  );
};
