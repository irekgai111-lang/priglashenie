import { FormData, TaxCalculation } from '@/lib/types';
import { formatRubles } from '@/lib/calculations';

interface Props {
  formData: FormData | null;
  calculation: TaxCalculation | null;
}

export default function Step7Export({ formData, calculation }: Props) {
  const exportToText = () => {
    if (!formData || !calculation) return;

    const text = `
ДЕКЛАРАЦИЯ ПО УСН 6% ЗА 2025 ГОД
═══════════════════════════════════════════════════════════════

ИНФОРМАЦИЯ НАЛОГОПЛАТЕЛЬЩИКА
─────────────────────────────
ИНН: ${formData.inn}
ФИО: ${formData.lastName} ${formData.firstName}
Статус: ИП
Объект налогообложения: Доходы (6%)

РАСЧЕТ НАЛОГА
─────────────
I квартал (01-03):      ${formatRubles(calculation.q1Income)}
II квартал (04-06):     ${formatRubles(calculation.q2Income)}
III квартал (07-09):    ${formatRubles(calculation.q3Income)}
IV квартал (10-12):     ${formatRubles(calculation.q4Income)}
─────────────────────────────
ИТОГО доход за год:     ${formatRubles(calculation.totalIncome)}

Налог по ставке 6%:     ${formatRubles(calculation.totalTax)}

Фиксированные взносы:   ${formatRubles(calculation.fixedContributions)}
1% от дохода свыше 300k: ${formatRubles(calculation.percentageContributions)}
─────────────────────────────
ИТОГО взносы:           ${formatRubles(calculation.totalContributions)}

Уменьшение налога на взносы: ${formatRubles(calculation.actualTaxReduction)}

═════════════════════════════════════════════════════════════════
НАЛОГ К УПЛАТЕ:         ${formatRubles(calculation.finalTax)}
═════════════════════════════════════════════════════════════════

НЕОБХОДИМЫЕ ДОКУМЕНТЫ ДЛЯ ПОДАЧИ
─────────────────────────────────
✓ Сама заполненная декларация
✓ Свидетельство о регистрации ИП
✓ Паспорт (копия)
✓ Квитанции об уплате страховых взносов
✓ Кассовые чеки/счета (подтверждение доходов)
${formData.hasEmployees ? '✓ Справки о взносах за сотрудников' : ''}

СРОК ПОДАЧИ
───────────
Не позднее 27 апреля 2026 года

СПОСОБЫ ПОДАЧИ
───────────────
1. Через Личный кабинет ФНС (lk.nalog.gov.ru)
2. В ИФНС лично
3. Через МФЦ
4. По почте (заказное письмо)

═══════════════════════════════════════════════════════════════
Документ сформирован: ${new Date().toLocaleDateString('ru-RU')}
═══════════════════════════════════════════════════════════════
    `;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'deklaracia_usn_2025.txt');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💾 Шаг 7: Экспорт результатов
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📥 Сохранить результаты</h3>
          <p className="text-sm text-gray-700 mb-4">
            Экспортируйте полученные данные для дальнейшего использования при подаче декларации.
          </p>
          <button
            onClick={exportToText}
            className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg"
          >
            📄 Скачать текстовый файл с результатами
          </button>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">✅ Что дальше?</h3>
          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
            <li>Сохраните полученные данные в файл</li>
            <li>Сделайте скриншот всех расчетов для подстраховки</li>
            <li>Подготовьте все необходимые документы</li>
            <li>Перейдите на сайт lk.nalog.gov.ru для подачи</li>
            <li>Заполните форму в личном кабинете ФНС</li>
            <li>Подпишите электронной подписью</li>
            <li>Отправьте декларацию</li>
          </ol>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-sm font-bold text-gray-800 mb-2">✓ Контрольный список перед подачей:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>☐ Все суммы проверены и верны</li>
            <li>☐ ИНН указан правильно</li>
            <li>☐ Все квартальные доходы учтены</li>
            <li>☐ Страховые взносы уплачены</li>
            <li>☐ Код ОКТМО найден</li>
            <li>☐ ЭЦП подготовлена или доступна</li>
            <li>☐ Резервная копия результатов сохранена</li>
          </ul>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-bold text-gray-800 mb-2">⚠️ Помните о сроках!</p>
          <p className="text-sm text-gray-700">
            Декларация по УСН за 2025 год должна быть подана не позднее <strong>27 апреля 2026 года</strong>.
            При опоздании грозит штраф от 5% до 30% от налога, но не менее 1 000 рублей.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm font-bold text-gray-800 mb-2">📞 Если у вас есть вопросы:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Звоните в ИФНС: 8 800 222 22 22 (горячая линия)</li>
            <li>• Пишите в ЛК ФНС через "Обращение"</li>
            <li>• Посетите ИФНС лично со своими вопросами</li>
            <li>• Консультируйтесь с бухгалтером или налоговым консультантом</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg text-center">
          <p className="text-lg font-bold text-green-800 mb-2">🎉 Вы готовы к подаче декларации!</p>
          <p className="text-sm text-green-700">
            Следуйте пошаговой инструкции на шаге 6 и успешно подайте вашу декларацию.
          </p>
        </div>
      </div>
    </div>
  );
}
