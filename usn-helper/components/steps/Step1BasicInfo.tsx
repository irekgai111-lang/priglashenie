import { FormData } from '@/lib/types';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export default function Step1BasicInfo({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📌 Шаг 1: Основная информация
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ИНН (индивидуальный номер налогоплательщика)
          </label>
          <input
            type="text"
            value={data.inn}
            onChange={(e) => onChange({ inn: e.target.value })}
            placeholder="12345678901"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            maxLength="12"
          />
          <p className="text-xs text-gray-500 mt-1">Состоит из 12 цифр</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Фамилия
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              placeholder="Иванов"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              placeholder="Иван"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Наличие сотрудников
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={!data.hasEmployees}
                onChange={() => onChange({ hasEmployees: false })}
                className="w-4 h-4"
              />
              <span className="ml-2">Нет сотрудников</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={data.hasEmployees}
                onChange={() => onChange({ hasEmployees: true })}
                className="w-4 h-4"
              />
              <span className="ml-2">Есть сотрудники</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {data.hasEmployees
              ? '⚠️ Налог не может быть уменьшен более чем на 50% на страховые взносы'
              : '✓ Налог может быть полностью уменьшен на страховые взносы'}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Помощь:</strong> ИНН можно найти в свидетельстве о регистрации ИП или на сайте ФНС.
            Информация о наличии сотрудников важна для правильного расчета уменьшения налога.
          </p>
        </div>
      </div>
    </div>
  );
}
