import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RiskCalculatorFieldsState {
  accountSize: string;
  riskPercent: string;
  entryPrice: string;
  stopLossPrice: string;
  takeProfitPrice: string;
  leverage: string;
  setAccountSize: (params: string) => void;
  setRiskPercent: (params: string) => void;
  setEntryPrice: (params: string) => void;
  setStopLossPrice: (params: string) => void;
  setTakeProfitPrice: (params: string) => void;
  setLeverage: (params: string) => void;
}

export const useRiskCalculatorFieldsStore = create<RiskCalculatorFieldsState>()(
  persist(
    (set) => ({
      accountSize: '',
      riskPercent: '2',
      entryPrice: '',
      stopLossPrice: '',
      takeProfitPrice: '',
      leverage: '1',
      setAccountSize: (param) => set({ accountSize: param }),
      setRiskPercent: (param) => set({ riskPercent: param }),
      setEntryPrice: (param) => set({ entryPrice: param }),
      setStopLossPrice: (param) => set({ stopLossPrice: param }),
      setTakeProfitPrice: (param) => set({ takeProfitPrice: param }),
      setLeverage: (param) => set({ leverage: param }),
    }),
    { name: 'riskCalculatorFieldsState' },
  ),
);
