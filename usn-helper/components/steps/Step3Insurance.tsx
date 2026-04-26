import { FormData } from '@/lib/types';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export default function Step3Insurance({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💰 Шаг 3: Страховые взносы за 2025 год
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-gray-800 mb-2">📍 Фиксированные взносы ИП без сотрудников:</h3>
          <p className="text-sm text-gray-700 mb-4">
            На 2025 год размер фиксированного взноса ИП за себя составляет <strong>29 354 рублей</strong>
            (в т.ч. в ПФР - 25 202 ₽, в ФОМС - 4 152 ₽)
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Размер фиксированного взноса (₽)
          </label>
          <div className="relative">
            <input
              type="number"
              value={data.insuranceContributions.fixed}
              onChange={(e) =>
                onChange({
                  insuranceContributions: {
                    ...data.insuranceContributions,
                    fixed: parseFloat(e.target.value) || 0,
                  },
                })
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              min="0"
            />
            <span className="absolute right-4 top-3 text-gray-500">₽</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            По умолчанию установлено 29 354 ₽ (стандартный размер на 2025)
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">ℹ️ Взнос 1% от дохода свыше 300 тыс. ₽</p>
          <p className="text-sm text-gray-700">
            Если ваш доход в 2025 году превышит 300 000 рублей, нужно дополнительно оплатить 1% от суммы,
            превышающей 300 тыс. рублей. Пример: при доходе 500 тыс. ₽ = 500 - 300 = 200 тыс. × 1% = 2000 ₽
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">⚠️ Подводные камни:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Фиксированные взносы платятся независимо от дохода</li>
            <li>✓ 1% от дохода свыше 300k - обязательный платеж</li>
            <li>✓ Можно вычесть 100% взносов без сотрудников</li>
            <li>⚠️ С сотрудниками - максимум 50% от налога</li>
            <li>✓ Взносы платят в течение года, не только в декларации</li>
          </ul>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">📋 Сроки уплаты взносов в 2025 году:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Фиксированные взносы: до 31 декабря 2025</li>
            <li>• Взнос 1% от дохода свыше 300k: до 01 апреля 2026</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
