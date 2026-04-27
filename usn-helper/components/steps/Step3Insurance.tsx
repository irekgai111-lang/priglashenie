import { FormData } from '@/lib/types';
import { FIXED_CONTRIBUTION_INFO } from '@/lib/calculations';

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
          <h3 className="font-bold text-gray-800 mb-3">📍 Фиксированные взносы ИП на 2025 год (по ФНС):</h3>
          <div className="bg-white p-4 rounded border-2 border-green-300 mb-3">
            <p className="text-sm text-gray-600 mb-2">Разбор по фондам:</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">ПФР (пенсионный фонд):</span>
                <span className="font-bold text-green-600">44 172 ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">ФОМС (медицинский фонд):</span>
                <span className="font-bold text-green-600">9 486 ₽</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>ИТОГО:</span>
                <span className="text-green-600">{FIXED_CONTRIBUTION_INFO.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Источник: Федеральная налоговая служба (ФНС России)
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">ℹ️ Взнос 1% от дохода свыше 300 тыс. ₽</p>
          <p className="text-sm text-gray-700">
            Если ваш доход в 2025 году превышит 300 000 рублей, нужно дополнительно оплатить 1% от суммы,
            превышающей 300 тыс. рублей. Пример: при доходе 500 тыс. ₽ = 500 - 300 = 200 тыс. × 1% = 2000 ₽
          </p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">📋 Сроки уплаты взносов в 2025 году:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ <strong>Фиксированные взносы</strong>: до <strong>28 декабря 2025</strong></li>
            <li>✓ <strong>Взнос 1% от дохода</strong> (если есть): до <strong>01 апреля 2026</strong></li>
          </ul>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">⚠️ Подводные камни:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Фиксированные взносы платятся независимо от дохода</li>
            <li>✓ 1% от дохода свыше 300k - обязательный платеж</li>
            <li>✓ Можно вычесть 100% взносов без сотрудников</li>
            <li>⚠️ С сотрудниками - максимум 50% от налога</li>
            <li>📌 СРОК ИЗМЕНЕН: вместо 31.12 теперь 28.12.2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
