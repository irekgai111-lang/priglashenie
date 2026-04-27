'use client';

import { useState } from 'react';
import { FormData, TaxCalculation } from '@/lib/types';
import { formatRubles } from '@/lib/calculations';
import { generateDeclarationHTML, downloadDeclaration } from '@/lib/declaration-generator';

interface Props {
  formData: FormData | null;
  calculation: TaxCalculation | null;
}

export default function Step7Export({ formData, calculation }: Props) {
  const [exported, setExported] = useState(false);

  const handleDownloadDeclaration = () => {
    if (!formData || !calculation) return;
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

НАЛОГ К УПЛАТЕ
─────────────────────────────────────────────────────────────────────────────
Налог:               ${formatRubles(calculation.totalTax)}
Вычет на взносы:     -${formatRubles(calculation.actualTaxReduction)}
────────────────────────────────────────────────────────────────────────────── 
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
        💾 Шаг 7: Экспорт результатов и печать
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📥 Скачать готовые документы</h3>
          
          <div className="space-y-3">
            <button
              onClick={handleDownloadDeclaration}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg"
            >
              🖨️ Скачать печатный бланк декларации
            </button>

            <button
              onClick={exportToText}
              className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-lg"
            >
              📄 Скачать текстовый отчет
            </button>
          </div>

          {exported && (
            <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 rounded">
              <p className="text-sm text-green-700">✅ Файл скачан! Откройте в браузере и напечатайте.</p>
            </div>
          )}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-bold text-gray-800 mb-2">⚠️ Важные сроки:</p>
          <p className="text-sm text-gray-700">Подача до <strong>27 апреля 2026</strong> | Взносы до <strong>28 декабря 2025</strong></p>
        </div>
      </div>
    </div>
  );
}
