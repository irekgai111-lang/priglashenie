export default function Step6Instructions() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Шаг 6: Пошаговая инструкция по подаче
      </h2>
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">СРОКИ ПОДАЧИ</h3>
          <p className="text-sm text-gray-700">
            Декларация по УСН за 2025 год должна быть подана не позднее 27 апреля 2026 года
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Подача через Личный кабинет ФНС</h3>
          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
            <li>Перейти на сайт lk.nalog.gov.ru</li>
            <li>Авторизоваться через Госуслуги или по ИНН/паролю</li>
            <li>Выбрать раздел "Мои обязательства" → "Декларации"</li>
            <li>Нажать "Создать" и выбрать "УСН"</li>
            <li>Выбрать "Доходы (6%)" и год 2025</li>
            <li>Заполнить все разделы согласно расчетам</li>
            <li>Подписать электронной подписью или в ЛК</li>
            <li>Отправить на обработку</li>
          </ol>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-bold text-gray-800 mb-2">Важно:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>- Статус можно проверить в ЛК через 5-10 минут</li>
            <li>- Без ЭЦП: распечатайте, подпишите и отнесите в ИФНС</li>
            <li>- При ошибках заполните уточняющую декларацию</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
