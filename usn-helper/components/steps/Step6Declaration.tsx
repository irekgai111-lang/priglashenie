import { FormData, TaxCalculation } from '@/lib/types';
import { formatRubles } from '@/lib/calculations';

interface Props {
  formData: FormData;
  calculation: TaxCalculation | null;
}

export default function Step6Declaration({ formData, calculation }: Props) {
  if (!calculation) return <div>Расчет не готов</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📋 Шаг 6: Предпросмотр заполненной декларации
      </h2>

      <div className="space-y-6">
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">ТИТУЛЬНЫЙ ЛИСТ</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">ИНН:</p>
              <p className="font-bold text-gray-900">{formData.inn || '___________'}</p>
            </div>
            <div>
              <p className="text-gray-600">ФИО:</p>
              <p className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-gray-600">Налоговый период:</p>
              <p className="font-bold text-gray-900">34 (год)</p>
            </div>
            <div>
              <p className="text-gray-600">Система налогообложения:</p>
              <p className="font-bold text-gray-900">УСН (доходы) - 6%</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-purple-300 rounded-lg p-6 bg-purple-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">РАЗДЕЛ 2.1.1 - Расчет налога</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-2 bg-white rounded">
              <span>Налог за I квартал:</span>
              <span className="font-bold">{formatRubles(calculation.q1Tax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white rounded">
              <span>Налог за II квартал:</span>
              <span className="font-bold">{formatRubles(calculation.q2Tax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white rounded">
              <span>Налог за III квартал:</span>
              <span className="font-bold">{formatRubles(calculation.q3Tax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white rounded">
              <span>Налог за IV квартал:</span>
              <span className="font-bold">{formatRubles(calculation.q4Tax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-100 rounded font-bold">
              <span>ИТОГО налог:</span>
              <span>{formatRubles(calculation.totalTax)}</span>
            </div>
            <div className="flex justify-between p-2 bg-white rounded">
              <span>Страховые взносы:</span>
              <span className="font-bold">{formatRubles(calculation.totalContributions)}</span>
            </div>
            {calculation.totalDeductions > 0 && (
              <div className="flex justify-between p-2 bg-white rounded">
                <span>Вычеты:</span>
                <span className="font-bold">{formatRubles(calculation.totalDeductions)}</span>
              </div>
            )}
            <div className="flex justify-between p-2 bg-green-100 rounded font-bold text-lg">
              <span>К УПЛАТЕ:</span>
              <span className="text-green-600">{formatRubles(calculation.finalTax)}</span>
            </div>
          </div>
        </div>

        {calculation.totalDeductions > 0 && (
          <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4">ПРИМЕНЁННЫЕ ВЫЧЕТЫ</h3>
            <div className="space-y-2 text-sm">
              {formData.deductions?.education > 0 && (
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>🎓 Вычет за обучение:</span>
                  <span className="font-bold">{formatRubles(formData.deductions.education)}</span>
                </div>
              )}
              {formData.deductions?.sickLeavePayments > 0 && (
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>🏥 Больничные выплаты (первые 3 дня):</span>
                  <span className="font-bold">{formatRubles(formData.deductions.sickLeavePayments)}</span>
                </div>
              )}
              {formData.deductions?.rd > 0 && (
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>🔬 НИОКР (научные исследования):</span>
                  <span className="font-bold">{formatRubles(formData.deductions.rd)}</span>
                </div>
              )}
              {formData.deductions?.charity > 0 && (
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>❤️ Благотворительность:</span>
                  <span className="font-bold">{formatRubles(formData.deductions.charity)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Совет:</strong> Проверьте все суммы перед подачей! При необходимости исправьте на предыдущих шагах.
          </p>
        </div>
      </div>
    </div>
  );
}
