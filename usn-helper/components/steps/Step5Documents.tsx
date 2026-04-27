interface Props {
  hasEmployees: boolean;
}

export default function Step5Documents({ hasEmployees }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📄 Шаг 5: Необходимые документы
      </h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">✅ Обязательные документы:</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">1.</span>
              <div>
                <p className="font-semibold text-gray-800">Декларация по УСН за 2025</p>
                <p className="text-sm text-gray-600">Форма по новому приказу ФНС от 26.11.2025</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">2.</span>
              <div>
                <p className="font-semibold text-gray-800">Свидетельство о регистрации ИП</p>
                <p className="text-sm text-gray-600">Подтверждение статуса ИП и ИНН</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">3.</span>
              <div>
                <p className="font-semibold text-gray-800">Паспорт (копия или оригинал)</p>
                <p className="text-sm text-gray-600">При личной подаче - предъявить оригинал</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">4.</span>
              <div>
                <p className="font-semibold text-gray-800">Подтверждение уплаты страховых взносов</p>
                <p className="text-sm text-gray-600">Квитанции об уплате или справки из ПФР/ФОМС</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">5.</span>
              <div>
                <p className="font-semibold text-gray-800">Кассовые чеки/счета-фактуры</p>
                <p className="text-sm text-gray-600">Подтверждение доходов (если потребуется при проверке)</p>
              </div>
            </li>
          </ul>
        </div>

        {hasEmployees && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ Дополнительные документы для ИП с сотрудниками:</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">6.</span>
                <div>
                  <p className="font-semibold text-gray-800">Справки о взносах на ОМС/ОПС за сотрудников</p>
                  <p className="text-sm text-gray-600">Квитанции об уплате страховых взносов за наёмных работников</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">7.</span>
                <div>
                  <p className="font-semibold text-gray-800">Реестр застрахованных лиц</p>
                  <p className="text-sm text-gray-600">Если требуется при проверке ФНС</p>
                </div>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Где получить квитанции об уплате:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• ПФР (Пенсионный фонд): <strong>soglav.pfr.gov.ru</strong></li>
            <li>• ФОМС (Фонд ОМС): <strong>foms.gov.ru</strong></li>
            <li>• Банк, через который проводились платежи</li>
            <li>• Портал ФНС <strong>lk.nalog.gov.ru</strong></li>
          </ul>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Что нужно сделать ДО подачи декларации:</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Собрать все квитанции об уплате страховых взносов</li>
            <li>Убедиться, что взносы уплачены полностью (при потребности доплатить)</li>
            <li>Подготовить копии документов, подтверждающие доход</li>
            <li>Скачать новую форму декларации с сайта ФНС</li>
            <li>Заполнить декларацию (используя этот помощник или вручную)</li>
            <li>Подписать ЭЦП (если подаёте электронно)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
