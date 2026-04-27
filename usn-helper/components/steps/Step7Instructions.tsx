export default function Step7Instructions() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📤 Шаг 7: Пошаговая инструкция по подаче
      </h2>
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⏰ СРОКИ ПОДАЧИ</h3>
          <p className="text-sm text-gray-700">
            Декларация по УСН за 2025 год должна быть подана не позднее <strong>27 апреля 2026 года</strong>
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💻 Подача через Личный кабинет ФНС (lk.nalog.gov.ru)</h3>
          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
            <li>Перейти на сайт <strong>lk.nalog.gov.ru</strong></li>
            <li>Авторизоваться через Госуслуги или по ИНН/паролю</li>
            <li>Выбрать раздел "Мои обязательства" → "Декларации"</li>
            <li>Нажать "Создать" и выбрать "УСН"</li>
            <li>Выбрать "Доходы (6%)" и год 2025</li>
            <li>Заполнить все разделы согласно расчетам:
              <ul className="ml-6 mt-1 space-y-1 list-disc">
                <li>Раздел 2.1.1 - Расчет налога по кварталам</li>
                <li>Раздел 1.1 - Итоговые обязательства</li>
                <li>Указать сумму к уплате</li>
              </ul>
            </li>
            <li>Проверить все суммы в предпросмотре</li>
            <li>Подписать электронной подписью (ЭЦП)</li>
            <li>Отправить на обработку</li>
          </ol>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏛️ Подача в ИФНС лично или почтой</h3>
          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
            <li>Скачайте печатный бланк с помощью кнопки на следующем шаге</li>
            <li>Распечатайте декларацию (2 листа + титульный лист)</li>
            <li>Заполните вручную или используйте печатные данные (программу заполнения)</li>
            <li>Подпишите оригинал синей или чёрной ручкой</li>
            <li>Отнесите в ИФНС при себе паспорт и свидетельство о регистрации ИП</li>
            <li>Получите входящий реестр или отправьте по почте с уведомлением</li>
          </ol>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
          <h3 className="text-lg font-bold text-gray-800 mb-2">⚠️ Важные моменты:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ <strong>Статус проверки:</strong> можно отслеживать в ЛК через 5-10 минут</li>
            <li>✓ <strong>Без ЭЦП:</strong> распечатайте, подпишите и отнесите в ИФНС лично</li>
            <li>✓ <strong>Сроки обработки:</strong> ФНС рассматривает 3-5 рабочих дней</li>
            <li>✓ <strong>При ошибках:</strong> заполните уточняющую декларацию (приложение к основной)</li>
            <li>✓ <strong>Все документы сохраняйте:</strong> могут потребоваться при камеральной проверке</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔗 Полезные ссылки:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• ЛК ФНС: <strong>lk.nalog.gov.ru</strong></li>
            <li>• Информация о УСН: <strong>nalog.gov.ru</strong></li>
            <li>• Загрузить бланки деклараций: <strong>nalog.gov.ru → Бланки</strong></li>
            <li>• Проверить взносы: <strong>soglav.pfr.gov.ru</strong> (ПФР), <strong>foms.gov.ru</strong> (ФОМС)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
