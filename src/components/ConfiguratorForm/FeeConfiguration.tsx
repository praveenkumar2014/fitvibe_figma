import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { NumberInput } from '../widget/ui/NumberInput';

interface FeeConfigurationProps {
  config: WidgetConfig;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FeeConfiguration({ config, onChange }: FeeConfigurationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fees</h3>
      
      <NumberInput
        label="Limited Company / LLP Base Fee (£)"
        name="baseFees.limited-company"
        value={config.baseFees['limited-company'].toString()}
        onChange={onChange}
        placeholder="30.99"
      />

      <NumberInput
        label="Partnership Base Fee (£)"
        name="baseFees.partnership"
        value={config.baseFees['partnership'].toString()}
        onChange={onChange}
        placeholder="30.99"
      />

      <NumberInput
        label="Sole Trader/Landlord Base Fee (£)"
        name="baseFees.sole-trader"
        value={config.baseFees['sole-trader'].toString()}
        onChange={onChange}
        placeholder="25.00"
      />

      <NumberInput
        label="Self Assessment Base Fee (£)"
        name="baseFees.self-assessment"
        value={config.baseFees['self-assessment'].toString()}
        onChange={onChange}
        placeholder="12.00"
      />

      <NumberInput
        label="Per Employee Fee (£)"
        name="employeeFee"
        value={config.employeeFee.toString()}
        onChange={onChange}
        placeholder="6.99"
      />

      <NumberInput
        label="VAT Registration Fee (£)"
        name="vatFee"
        value={config.vatFee.toString()}
        onChange={onChange}
        placeholder="15.00"
      />
    </div>
  );
}