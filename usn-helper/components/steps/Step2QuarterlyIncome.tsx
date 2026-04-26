import { FormData, TaxCalculation } from '@/lib/types';
import { formatRubles } from '@/lib/calculations';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  calculation: TaxCalculation | null;
}

export default function Step2QuarterlyIncome({
  data,
  onChange,
  calculation,
}: Props) {
  const handleQuarterChange = (quarter: 'q1' | 'q2' | 'q3' | 'q4', value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({
      quarterlyIncome: {
        ...data.quarterlyIncome,
        [quarter]: numValue,
      },
    });
  };

  const quarters = [
    { key: 'q1' as const, label: 'I квартал (01-03)', placeholder: 'Доход за январь-март' },
    { key: 'q2' as const, label: 'II квартал (04-06)', placeholder: 'Доход за апрель-июнь' },
    { key: 'q3' as const, label: 'III квартал (07-09)', placeholder: 'Доход за июль-сентябрь' },
    { key: 'q4' as const, label: 'IV квартал (10-12)', placeholder: 'Доход за октябрь-декабрь' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Шаг 2: Доходы по кварталам за 2025 год
      </h2>

      <div className="space-y-4 mb-6">
        {quarters.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {label}
            </label>
            <div className="relative">
              <input
                type="number"
                value={data.quarterlyIncome[key]}
                onChange={(e) => handleQuarterChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
                min="0"
              />
              <span className="absolute right-4 top-3 text-gray-500">₽</span>
            </div>
          </div>
        ))}
      </div>

      {calculation && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Расчет налога</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Общий доход за год</p>
              <p className="text-xl font-bold text-purple-600">
                {formatRubles(calculation.totalIncome)}
              </p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Налог 6%</p>
              <p className="text-xl font-bold text-purple-600">
                {formatRubles(calculation.totalTax)}
              </p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Q1 налог</p>
              <p className="text-lg font-semibold">{formatRubles(calculation.q1Tax)}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Q2 налог</p>
              <p className="text-lg font-semibold">{formatRubles(calculation.q2Tax)}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Q3 налог</p>
              <p className="text-lg font-semibold">{formatRubles(calculation.q3Tax)}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Q4 налог</p>
              <p className="text-lg font-semibold">{formatRubles(calculation.q4Tax)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>⚠️ Подводные камни:</strong>
        </p>
        <ul className="text-sm text-gray-700 mt-2 list-disc list-inside space-y-1">
          <li>Указывайте только доходы от деятельности по УСН 6%</li>
          <li>Доход считается по кассовому методу (когда деньги поступили)</li>
          <li>При доходе свыше 300 тыс. рублей потребуется оплатить 1% дополнительно</li>
        </ul>
      </div>
    </div>
  );
}
