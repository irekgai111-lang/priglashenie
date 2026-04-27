'use client';

import { FormData } from '@/lib/types';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export default function Step4Deductions({ data, onChange }: Props) {
  const handleDeductionChange = (field: keyof typeof data.deductions, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    onChange({
      deductions: {
        ...data.deductions,
        [field]: numValue,
      },
    });
  };

  const totalDeductions =
    (data.deductions?.education || 0) +
    (data.deductions?.sickLeavePayments || 0) +
    (data.deductions?.rd || 0) +
    (data.deductions?.charity || 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💳 Шаг 4: Вычеты на УСН 6%
      </h2>

      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            ℹ️ На УСН 6% вы можете уменьшить налог на суммы некоторых расходов. Указывайте только подтвержденные документами суммы.
          </p>
        </div>

        {/* Вычет за обучение */}
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎓</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Вычет за обучение работников</h3>
              <p className="text-sm text-gray-600 mb-4">
                Обучение сотрудников профессиональным навыкам или переквалифицирование. Максимум 120,000 ₽ в год на одного работника (при наличии).
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={data.deductions?.education || 0}
                  onChange={(e) => handleDeductionChange('education', e.target.value)}
                  placeholder="Сумма в рублях"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <span className="text-gray-600 whitespace-nowrap">₽</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Требуется: договор с учебным учреждением, счета, расходные документы</p>
            </div>
          </div>
        </div>

        {/* Больничные выплаты */}
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🏥</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Больничные выплаты сотрудникам (первые 3 дня)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Выплаты сотрудникам в период болезни за счет работодателя (первые 3 дня болезни).
                С 4-го дня платит ФСС. Уменьшает налог на УСН 6%.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={data.deductions?.sickLeavePayments || 0}
                  onChange={(e) => handleDeductionChange('sickLeavePayments', e.target.value)}
                  placeholder="Сумма в рублях"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <span className="text-gray-600 whitespace-nowrap">₽</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Требуется: листы нетрудоспособности, платежные ведомости</p>
            </div>
          </div>
        </div>

        {/* НИОКР - научные исследования */}
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔬</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">НИОКР (научные исследования и разработки)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Затраты на проведение научных исследований и разработок собственными силами.
                Максимум 50% от суммы затрат.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={data.deductions?.rd || 0}
                  onChange={(e) => handleDeductionChange('rd', e.target.value)}
                  placeholder="Сумма в рублях"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <span className="text-gray-600 whitespace-nowrap">₽</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Требуется: планы НИОКР, отчеты, счета поставщиков</p>
            </div>
          </div>
        </div>

        {/* Благотворительность */}
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-2xl">❤️</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Благотворительные взносы</h3>
              <p className="text-sm text-gray-600 mb-4">
                Взносы благотворительным организациям. Максимум 25% от полученного дохода.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={data.deductions?.charity || 0}
                  onChange={(e) => handleDeductionChange('charity', e.target.value)}
                  placeholder="Сумма в рублях"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <span className="text-gray-600 whitespace-nowrap">₽</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Требуется: договоры пожертвования, расписки благотворительных организаций</p>
            </div>
          </div>
        </div>

        {/* Итого вычеты */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-gray-800">Всего вычетов:</span>
            <span className="text-2xl font-bold text-purple-600">
              {totalDeductions.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Эти суммы будут вычтены из налога. Полный размер вычета ограничен размером самого налога.
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-2">⚠️ Важно!</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Указывайте только подтвержденные документами суммы</li>
            <li>✓ Сохраняйте все квитанции, договоры и расходные документы</li>
            <li>✓ Некоторые вычеты ограничены максимальным размером</li>
            <li>✓ Вычеты работают только если есть налоговое обязательство</li>
            <li>📌 При отсутствии документов налоговая может отклонить вычет</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
