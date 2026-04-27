'use client';

import { useState } from 'react';
import { FormData, TaxCalculation } from '@/lib/types';
import { formatRubles } from '@/lib/calculations';
import { generateDeclarationHTML, downloadDeclaration, validateFormData } from '@/lib/declaration-generator';

interface Props {
  formData: FormData | null;
  calculation: TaxCalculation | null;
}

export default function Step8Export({ formData, calculation }: Props) {
  const [exported, setExported] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleDownloadDeclaration = () => {
    if (!formData || !calculation) return;

    const errors = validateFormData(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    const html = generateDeclarationHTML(formData, calculation);
    downloadDeclaration(html);
    setExported(true);
  };

  const exportToText = () => {
    if (!formData || !calculation) return;

    const text = `
Декларация по УСН 6% за 2025 год (справочный материал)

ИНФОРМАЦИЯ НАЛОГОПЛАТЕЛЬЩИКА
─────────────────────────────────────────────────────────────────────────────
ИНН: ${formData.inn}
ФИО: ${formData.lastName} ${formData.firstName}
Статус: ${formData.hasEmployees ? 'ИП с сотрудниками' : 'ИП без сотрудников'}

РАСЧЕТ НАЛОГА ПО КВАРТАЛАМ
─────────────────────────────────────────────────────────────────────────────
I квартал:   Доход ${formatRubles(calculation.q1Income)} → Налог ${formatRubles(calculation.q1Tax)}
II квартал:  Доход ${formatRubles(calculation.q2Income)} → Налог ${formatRubles(calculation.q2Tax)}
III квартал: Доход ${formatRubles(calculation.q3Income)} → Налог ${formatRubles(calculation.q3Tax)}
IV квартал:  Доход ${formatRubles(calculation.q4Income)} → Налог ${formatRubles(calculation.q4Tax)}
─────────────────────────────────────────────────────────────────────────────
ИТОГО ЗА ГОД: Доход ${formatRubles(calculation.totalIncome)} → Налог ${formatRubles(calculation.totalTax)}

СТРАХОВЫЕ ВЗНОСЫ
─────────────────────────────────────────────────────────────────────────────
ПФР (пенсионный):   44 172 рублей
ФОМС (медицинский):  9 486 рублей
${calculation.percentageContributions > 0 ? `1% от дохода свыше 300k: ${formatRubles(calculation.percentageContributions)}\n` : ''}ИТОГО ВЗНОСЫ:       ${formatRubles(calculation.totalContributions)}

${
  calculation.totalDeductions > 0
    ? `ПРИМЕНЁННЫЕ ВЫЧЕТЫ
─────────────────────────────────────────────────────────────────────────────
${formData.deductions?.education > 0 ? `Вычет за обучение:          ${formatRubles(formData.deductions.education)}\n` : ''}${formData.deductions?.sickLeavePayments > 0 ? `Больничные выплаты (3 дня):  ${formatRubles(formData.deductions.sickLeavePayments)}\n` : ''}${formData.deductions?.rd > 0 ? `НИОКР (исследования):       ${formatRubles(formData.deductions.rd)}\n` : ''}${formData.deductions?.charity > 0 ? `Благотворительность:        ${formatRubles(formData.deductions.charity)}\n` : ''}ИТОГО ВЫЧЕТЫ:               ${formatRubles(calculation.totalDeductions)}

`
    : ''
}НАЛОГ К УПЛАТЕ
─────────────────────────────────────────────────────────────────────────────
Налог:               ${formatRubles(calculation.totalTax)}
Вычет на взносы:     -${formatRubles(Math.min(calculation.totalContributions, formData.hasEmployees ? Math.round(calculation.totalTax * 0.5) : calculation.totalTax))}
${calculation.totalDeductions > 0 ? `Вычеты:              -${formatRubles(Math.min(calculation.totalDeductions, Math.max(0, calculation.totalTax - Math.min(calculation.totalContributions, formData.hasEmployees ? Math.round(calculation.totalTax * 0.5) : calculation.totalTax))))}` : ''}
─────────────────────────────────────────────────────────────────────────────
К УПЛАТЕ:            ${formatRubles(calculation.finalTax)}

СРОКИ УПЛАТЫ
─────────────────────────────────────────────────────────────────────────────
Подача декларации:        27 апреля 2026
Фиксированные взносы:     28 декабря 2025
1% от дохода (если >300k): 01 апреля 2026

СПОСОБЫ ПОДАЧИ
─────────────────────────────────────────────────────────────────────────────
1. Лично в ИФНС (с паспортом и распечатанным бланком)
2. Через ЛК ФНС (lk.nalog.gov.ru) с электронной подписью
3. Через МФЦ
4. По почте (заказное письмо)

КОНТАКТЫ
─────────────────────────────────────────────────────────────────────────────
ФНС горячая линия: 8 800 222 22 22
ЛК ФНС: lk.nalog.gov.ru
Сайт: nalog.gov.ru
Проверить взносы ПФР: soglav.pfr.gov.ru
Проверить взносы ФОМС: foms.gov.ru
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deklaracia_usn_2025.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💾 Шаг 8: Экспорт результатов и печать
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📥 Скачать готовые документы</h3>

          {validationErrors.length > 0 && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 rounded">
              <p className="text-sm font-bold text-red-700 mb-2">❌ Ошибки валидации:</p>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
              <p className="text-xs text-red-600 mt-3">Пожалуйста исправьте ошибки на предыдущих шагах и попробуйте снова.</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleDownloadDeclaration}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={validationErrors.length > 0 && exported === false}
            >
              🖨️ Скачать печатный бланк декларации (HTML для печати)
            </button>

            <button
              onClick={exportToText}
              className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-lg"
            >
              📄 Скачать текстовый отчет (TXT)
            </button>
          </div>

          {exported && (
            <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 rounded">
              <p className="text-sm font-bold text-green-700 mb-2">✅ Файл успешно скачан!</p>
              <p className="text-xs text-green-700">
                <strong>Инструкции:</strong>
              </p>
              <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside mt-2">
                <li>Откройте HTML файл в браузере (Chrome, Firefox, Edge)</li>
                <li>Проверьте все данные на корректность</li>
                <li>Нажмите Ctrl+P или выберите "Печать" → "Сохранить как PDF"</li>
                <li>Сохраните PDF или распечатайте на бумаге</li>
                <li>Подпишите синей или чёрной ручкой</li>
                <li>Подайте в налоговую до 27 апреля 2026</li>
              </ol>
            </div>
          )}
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Что дальше?</h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Распечатайте бланк и проверьте все суммы</li>
            <li>Соберите необходимые документы (квитанции о взносах, паспорт, свидетельство)</li>
            <li>Подпишите декларацию синей или чёрной ручкой</li>
            <li>Подайте в ИФНС до <strong>27 апреля 2026 года</strong></li>
            <li>Уплатите налог в установленный срок</li>
          </ol>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
          <h3 className="text-lg font-bold text-gray-800 mb-2">⚠️ Важные сроки:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>📅 <strong>Подача декларации:</strong> до 27 апреля 2026</li>
            <li>💳 <strong>Фиксированные взносы:</strong> до 28 декабря 2025</li>
            <li>💳 <strong>Дополнительный 1% взнос:</strong> до 01 апреля 2026 (если доход {`>`} 300k)</li>
            <li>💳 <strong>Налог к уплате:</strong> до 27 апреля 2026</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">🔗 Полезные ссылки:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>📌 ЛК ФНС: <strong>lk.nalog.gov.ru</strong></li>
            <li>📌 Информация о УСН: <strong>nalog.gov.ru/ip</strong></li>
            <li>📌 Бланки и формы: <strong>nalog.gov.ru</strong> → Форма декларации</li>
            <li>📌 Проверить взносы ПФР: <strong>soglav.pfr.gov.ru</strong></li>
            <li>📌 Проверить взносы ФОМС: <strong>foms.gov.ru</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
