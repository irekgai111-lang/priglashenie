import { FormData, TaxCalculation } from './types';

export function validateFormData(formData: FormData): string[] {
  const errors: string[] = [];

  if (!formData.inn || formData.inn.length !== 12 || !/^\d{12}$/.test(formData.inn)) {
    errors.push('ИНН должен быть 12 цифр');
  }

  if (!formData.lastName.trim()) {
    errors.push('Фамилия не заполнена');
  }

  if (!formData.firstName.trim()) {
    errors.push('Имя не заполнено');
  }

  const totalIncome = formData.quarterlyIncome.q1 + formData.quarterlyIncome.q2 + formData.quarterlyIncome.q3 + formData.quarterlyIncome.q4;
  if (totalIncome === 0) {
    errors.push('Укажите доход за хотя бы один квартал');
  }

  return errors;
}

export function generateDeclarationHTML(formData: FormData, calculation: TaxCalculation | null): string {
  if (!calculation) return '';

  const pfrContribution = 44172;
  const fomsContribution = 9486;
  const q1q3Advance = calculation.q1Tax + calculation.q2Tax + calculation.q3Tax;
  const finalPayment = calculation.finalTax;

  const hasDeductions = calculation.totalDeductions > 0;
  const deductionsSummary = hasDeductions
    ? `
    <h4>Применённые вычеты:</h4>
    <div class="info"><span>Обучение:</span><span>${(formData.deductions?.education || 0).toLocaleString('ru-RU')} ₽</span></div>
    <div class="info"><span>Больничные (первые 3 дня):</span><span>${(formData.deductions?.sickLeavePayments || 0).toLocaleString('ru-RU')} ₽</span></div>
    <div class="info"><span>НИОКР (исследования):</span><span>${(formData.deductions?.rd || 0).toLocaleString('ru-RU')} ₽</span></div>
    <div class="info"><span>Благотворительность:</span><span>${(formData.deductions?.charity || 0).toLocaleString('ru-RU')} ₽</span></div>
    <div class="info"><span><b>Итого вычеты:</b></span><span><b>${calculation.totalDeductions.toLocaleString('ru-RU')} ₽</b></span></div>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Декларация УСН 6% - 2025</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: 'Times New Roman', Times, serif; margin: 0; padding: 15px; background: #f5f5f5; }
        .page-break { page-break-before: always; }
        .container { background: white; max-width: 210mm; height: 297mm; margin: 0 auto; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .no-print { margin-bottom: 20px; }
        .print-button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; font-size: 14px; border-radius: 4px; }
        .print-button:hover { background: #45a049; }
        @media print { .no-print { display: none; } body { margin: 0; padding: 0; background: white; } .container { max-width: 100%; height: auto; margin: 0; padding: 0; box-shadow: none; } }

        .header { text-align: center; border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 15px; }
        .header h1 { margin: 0 0 5px 0; font-size: 14px; font-weight: bold; }
        .header p { margin: 0; font-size: 12px; }

        .section { margin: 15px 0; padding: 10px; border: 1px solid #666; }
        .section-title { font-weight: bold; background-color: #e6e6e6; padding: 5px; margin-bottom: 10px; font-size: 12px; }

        .form-row { display: flex; margin: 5px 0; font-size: 11px; }
        .form-label { flex: 0 0 40%; }
        .form-value { flex: 1; border-bottom: 1px solid black; padding: 2px 4px; }

        table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
        th, td { border: 1px solid black; padding: 4px; }
        th { background-color: #e0e0e0; font-weight: bold; }
        td.right { text-align: right; }
        .total { background-color: #fff4cc; font-weight: bold; }

        .info { display: flex; justify-content: space-between; margin: 3px 0; font-size: 11px; padding: 2px; }
        .info-label { flex: 0 0 50%; }
        .info-value { flex: 1; text-align: right; border-bottom: 1px dotted #999; }

        h4 { margin: 8px 0 5px 0; font-size: 11px; font-weight: bold; }

        .warning { background-color: #ffe6e6; padding: 8px; border-left: 4px solid red; font-size: 10px; margin-top: 10px; }
        .warning strong { color: red; }

        .signature-block { margin-top: 20px; font-size: 10px; }
        .signature-line { border-top: 1px solid black; width: 100px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="no-print">
        <button class="print-button" onclick="window.print()">🖨️ Печать / Сохранить как PDF</button>
    </div>

    <div class="container">
        <div class="header">
            <h1>ДЕКЛАРАЦИЯ О НАЛОГОВОЙ БАЗЕ И НАЛОГЕ, УПЛАЧИВАЕМОМ</h1>
            <h1>В СООТВЕТСТВИИ С УПРОЩЁННОЙ СИСТЕМОЙ НАЛОГООБЛОЖЕНИЯ</h1>
            <p>Налоговый период: 2025 (полный год)</p>
        </div>

        <div class="section">
            <div class="section-title">ТИТУЛЬНЫЙ ЛИСТ</div>

            <div class="form-row">
                <div class="form-label">ИНН:</div>
                <div class="form-value">${formData.inn}</div>
            </div>

            <div class="form-row">
                <div class="form-label">Фамилия:</div>
                <div class="form-value">${formData.lastName}</div>
            </div>

            <div class="form-row">
                <div class="form-label">Имя:</div>
                <div class="form-value">${formData.firstName}</div>
            </div>

            <div class="form-row">
                <div class="form-label">Объект налогообложения:</div>
                <div class="form-value">Доходы (6%)</div>
            </div>

            <div class="form-row">
                <div class="form-label">Статус:</div>
                <div class="form-value">${formData.hasEmployees ? 'Индивидуальный предприниматель с сотрудниками' : 'Индивидуальный предприниматель без сотрудников'}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">РАЗДЕЛ 2.1.1 – РАСЧЁТ НАЛОГА</div>

            <h4>Доход и налог по кварталам:</h4>
            <table>
                <tr>
                    <th>Период</th>
                    <th class="right">Доход (₽)</th>
                    <th class="right">Налог 6% (₽)</th>
                </tr>
                <tr>
                    <td>I квартал (янв-март)</td>
                    <td class="right">${calculation.q1Income.toLocaleString('ru-RU')}</td>
                    <td class="right">${calculation.q1Tax.toLocaleString('ru-RU')}</td>
                </tr>
                <tr>
                    <td>II квартал (апр-июн)</td>
                    <td class="right">${calculation.q2Income.toLocaleString('ru-RU')}</td>
                    <td class="right">${calculation.q2Tax.toLocaleString('ru-RU')}</td>
                </tr>
                <tr>
                    <td>III квартал (июл-сент)</td>
                    <td class="right">${calculation.q3Income.toLocaleString('ru-RU')}</td>
                    <td class="right">${calculation.q3Tax.toLocaleString('ru-RU')}</td>
                </tr>
                <tr>
                    <td>IV квартал (окт-дек)</td>
                    <td class="right">${calculation.q4Income.toLocaleString('ru-RU')}</td>
                    <td class="right">${calculation.q4Tax.toLocaleString('ru-RU')}</td>
                </tr>
                <tr class="total">
                    <td>ИТОГО ЗА ГОД</td>
                    <td class="right">${calculation.totalIncome.toLocaleString('ru-RU')}</td>
                    <td class="right">${calculation.totalTax.toLocaleString('ru-RU')}</td>
                </tr>
            </table>

            <h4>Страховые взносы за 2025 год:</h4>
            <div class="info">
                <div class="info-label">ПФР (пенсионный фонд):</div>
                <div class="info-value">${pfrContribution.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div class="info">
                <div class="info-label">ФОМС (фонд обязательного медицинского страхования):</div>
                <div class="info-value">${fomsContribution.toLocaleString('ru-RU')} ₽</div>
            </div>
            ${calculation.percentageContributions > 0 ? `
            <div class="info">
                <div class="info-label">1% от дохода свыше 300 000 ₽:</div>
                <div class="info-value">${calculation.percentageContributions.toLocaleString('ru-RU')} ₽</div>
            </div>
            ` : ''}
            <div class="info" style="font-weight: bold; margin-top: 5px; padding-top: 5px; border-top: 1px solid #999;">
                <div class="info-label">ИТОГО ВЗНОСЫ:</div>
                <div class="info-value">${calculation.totalContributions.toLocaleString('ru-RU')} ₽</div>
            </div>

            ${deductionsSummary}

            <h4>Расчёт налога к уплате:</h4>
            <div class="info">
                <div class="info-label">Налог:</div>
                <div class="info-value">${calculation.totalTax.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div class="info">
                <div class="info-label">Минус: Вычет на взносы:</div>
                <div class="info-value">-${Math.min(calculation.totalContributions, formData.hasEmployees ? Math.round(calculation.totalTax * 0.5) : calculation.totalTax).toLocaleString('ru-RU')} ₽</div>
            </div>
            ${calculation.totalDeductions > 0 ? `
            <div class="info">
                <div class="info-label">Минус: Вычеты:</div>
                <div class="info-value">-${Math.min(calculation.totalDeductions, Math.max(0, calculation.totalTax - Math.min(calculation.totalContributions, formData.hasEmployees ? Math.round(calculation.totalTax * 0.5) : calculation.totalTax))).toLocaleString('ru-RU')} ₽</div>
            </div>
            ` : ''}
            <div class="info" style="font-weight: bold; font-size: 12px; margin-top: 8px; padding-top: 8px; border-top: 2px solid black;">
                <div class="info-label">К УПЛАТЕ ПО ДЕКЛАРАЦИИ:</div>
                <div class="info-value" style="border: none; color: red; font-size: 12px;">${calculation.finalTax.toLocaleString('ru-RU')} ₽</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">РАЗДЕЛ 1.1 – ИТОГОВЫЕ ОБЯЗАТЕЛЬСТВА НАЛОГОПЛАТЕЛЬЩИКА</div>
            <table>
                <tr>
                    <th>ОКТМО</th>
                    <th class="right">Налог</th>
                    <th class="right">Авансовые платежи</th>
                    <th class="right">К уплате</th>
                </tr>
                <tr class="total">
                    <td style="font-size: 10px;">________<br/>(Код ОКТМО)</td>
                    <td class="right">${calculation.totalTax.toLocaleString('ru-RU')}</td>
                    <td class="right">${q1q3Advance.toLocaleString('ru-RU')}</td>
                    <td class="right" style="color: red;"><b>${finalPayment.toLocaleString('ru-RU')}</b></td>
                </tr>
            </table>
            <p style="font-size: 10px; margin: 5px 0;">
                <strong>ОКТМО</strong> – это код Общероссийского классификатора территорий муниципальных образований.<br/>
                Узнайте его на сайте ФНС (nalog.gov.ru) или у налоговой инспекции вашего города.
            </p>
        </div>

        <div class="section">
            <h4>Сроки уплаты налога и взносов:</h4>
            <ul style="font-size: 11px; margin: 5px 0; padding-left: 20px;">
                <li><strong>Подача декларации:</strong> до 27 апреля 2026 года</li>
                <li><strong>Авансовые платежи:</strong> до 25-26 числа каждого квартала (апреля, июля, октября)</li>
                <li><strong>Налог к уплате:</strong> до 27 апреля 2026 года</li>
                <li><strong>Фиксированные взносы:</strong> до 28 декабря 2025 года</li>
                <li><strong>1% взнос (если доход > 300k):</strong> до 01 апреля 2026 года</li>
            </ul>
        </div>

        <div class="warning">
            <strong>⚠️ ВАЖНО:</strong> Это справочный материал для ознакомления. При подаче в налоговую используйте официальный бланк формы 3-УСН с сайта ФНС (nalog.gov.ru). Убедитесь что все данные заполнены корректно и подписаны. При наличии сомнений обратитесь в налоговую инспекцию.
        </div>

        <div class="signature-block">
            <p><strong>Подпись налогоплательщика:</strong></p>
            <div class="signature-line"></div>
            <p style="font-size: 10px;">Фамилия И.О. ______________________ Дата ______________</p>
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
  link.download = 'Deklaracia_USN_2025.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
