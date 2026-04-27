import { FormData, TaxCalculation } from './types';

export function generateDeclarationHTML(formData: FormData, calculation: TaxCalculation | null): string {
  if (!calculation) return '';

  const pfrContribution = 44172;
  const fomsContribution = 9486;
  const q1q3Advance = calculation.q1Tax + calculation.q2Tax + calculation.q3Tax;
  const finalPayment = calculation.finalTax;

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Декларация УСН 6% - 2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 210mm; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #999; }
        .section-title { font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid black; padding: 8px; }
        th { background-color: #e0e0e0; }
        .right { text-align: right; }
        .total { background-color: #fff4cc; font-weight: bold; }
        .info { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
        @media print { .print-button { display: none; } }
        .print-button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; margin-bottom: 20px; }
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">🖨️ Печать</button>
    <div class="container">
        <div class="header">
            <h2>ДЕКЛАРАЦИЯ ПО УСН 6% (ДОХОДЫ)</h2>
            <p>Налоговый период: 2025 год</p>
        </div>

        <div class="section">
            <div class="section-title">ТИТУЛЬНЫЙ ЛИСТ</div>
            <div class="info"><span>ИНН:</span><span>${formData.inn}</span></div>
            <div class="info"><span>ФИО:</span><span>${formData.lastName} ${formData.firstName}</span></div>
            <div class="info"><span>Объект налогообложения:</span><span>Доходы (6%)</span></div>
            <div class="info"><span>Статус:</span><span>${formData.hasEmployees ? 'С сотрудниками' : 'Без сотрудников'}</span></div>
        </div>

        <div class="section">
            <div class="section-title">РАЗДЕЛ 2.1.1 – Расчет налога</div>
            <table>
                <tr><th>Квартал</th><th class="right">Доход</th><th class="right">Налог 6%</th></tr>
                <tr><td>I (01-03)</td><td class="right">${calculation.q1Income.toLocaleString('ru-RU')}</td><td class="right">${calculation.q1Tax.toLocaleString('ru-RU')}</td></tr>
                <tr><td>II (04-06)</td><td class="right">${calculation.q2Income.toLocaleString('ru-RU')}</td><td class="right">${calculation.q2Tax.toLocaleString('ru-RU')}</td></tr>
                <tr><td>III (07-09)</td><td class="right">${calculation.q3Income.toLocaleString('ru-RU')}</td><td class="right">${calculation.q3Tax.toLocaleString('ru-RU')}</td></tr>
                <tr><td>IV (10-12)</td><td class="right">${calculation.q4Income.toLocaleString('ru-RU')}</td><td class="right">${calculation.q4Tax.toLocaleString('ru-RU')}</td></tr>
                <tr class="total"><td>ИТОГО</td><td class="right">${calculation.totalIncome.toLocaleString('ru-RU')}</td><td class="right">${calculation.totalTax.toLocaleString('ru-RU')}</td></tr>
            </table>

            <h4>Страховые взносы:</h4>
            <div class="info"><span>ПФР (пенсионный):</span><span>${pfrContribution.toLocaleString('ru-RU')} ₽</span></div>
            <div class="info"><span>ФОМС (медицинский):</span><span>${fomsContribution.toLocaleString('ru-RU')} ₽</span></div>
            ${calculation.percentageContributions > 0 ? `<div class="info"><span>1% от дохода >300k:</span><span>${calculation.percentageContributions.toLocaleString('ru-RU')} ₽</span></div>` : ''}
            <div class="info"><span><b>Итого взносы:</b></span><span><b>${calculation.totalContributions.toLocaleString('ru-RU')} ₽</b></span></div>

            <h4>Налог к уплате:</h4>
            <div class="info"><span>Налог:</span><span>${calculation.totalTax.toLocaleString('ru-RU')} ₽</span></div>
            <div class="info"><span>Вычет на взносы:</span><span>-${calculation.actualTaxReduction.toLocaleString('ru-RU')} ₽</span></div>
            <div class="info" style="border-top: 2px solid black; padding-top: 10px; font-weight: bold; font-size: 14px;">
                <span>К УПЛАТЕ:</span>
                <span style="color: red;">${calculation.finalTax.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">РАЗДЕЛ 1.1 – Итоговые обязательства</div>
            <table>
                <tr><th>ОКТМО</th><th class="right">Налог</th><th class="right">Авансы</th><th class="right">К уплате</th></tr>
                <tr class="total">
                    <td style="font-size: 11px;">________________<br/>(Код ОКТМО вашего города)</td>
                    <td class="right">${calculation.totalTax.toLocaleString('ru-RU')}</td>
                    <td class="right">${q1q3Advance.toLocaleString('ru-RU')}</td>
                    <td class="right" style="color: red;"><b>${finalPayment.toLocaleString('ru-RU')}</b></td>
                </tr>
            </table>
        </div>

        <div class="section" style="background-color: #ffe6e6;">
            <p><strong>⚠️ Важно:</strong> Это справочный документ. Используйте официальный бланк ФНС при личной подаче.</p>
            <p><strong>Сроки:</strong> Подача до 27 апреля 2026, взносы до 28.12.2025</p>
        </div>
    </div>
</body>
</html>`;
}

export function downloadDeclaration(html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'deklaracia_usn_2025.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
