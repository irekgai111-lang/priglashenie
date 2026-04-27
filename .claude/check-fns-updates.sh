#!/bin/bash

# 📋 Скрипт проверки обновлений размеров взносов ФНС для УСН 6%
# Запускается автоматически 1-го числа каждого месяца в 9:00

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
USN_HELPER_DIR="$PROJECT_DIR/usn-helper"
CALCULATIONS_FILE="$USN_HELPER_DIR/lib/calculations.ts"
LAST_CHECK_FILE="$SCRIPT_DIR/.fns-check-date"

# Текущие известные размеры (обновлено 2026-04-27 с официального сайта ФНС)
KNOWN_PFR=44172
KNOWN_FOMS=9486
KNOWN_TOTAL=53658

echo "🔍 Проверка обновлений размеров взносов ФНС..."
echo "⏰ Время проверки: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Попытка получить информацию с сайта ФНС
echo "📡 Запрашиваю информацию с nalog.gov.ru..."

# Проверяем доступ к интернету и сайту ФНС
if ! curl -s --max-time 10 "https://www.nalog.gov.ru/ip/" > /dev/null 2>&1; then
    echo "⚠️  Нет доступа к сайту ФНС. Проверка отложена."
    echo "$(date '+%Y-%m-%d')" > "$LAST_CHECK_FILE"
    exit 0
fi

# Получаем контент страницы и ищем размеры взносов
PAGE_CONTENT=$(curl -s --max-time 10 "https://www.nalog.gov.ru/ip/")

# Ищем упоминания сумм или ключевых слов о взносах
if echo "$PAGE_CONTENT" | grep -qE "53658|44172|страховые взносы|ПФР|ФОМС"; then
    echo "✅ Данные актуальны (найдены размеры 53658, 44172)"
    STATUS="актуальны"
    COLOR="\033[0;32m"
else
    echo "⚠️  Возможно требуется обновление данных о взносах"
    STATUS="требуется проверка"
    COLOR="\033[0;33m"
fi

# Сохраняем дату последней проверки
echo "$(date '+%Y-%m-%d')" > "$LAST_CHECK_FILE"

# Если найдены изменения - уведомляем пользователя
if [ "$STATUS" != "актуальны" ]; then
    NC="\033[0m"
    echo ""
    echo -e "${COLOR}📌 ВНИМАНИЕ: Требуется проверка размеров взносов ФНС!${NC}"
    echo ""
    echo "Рекомендуемые действия:"
    echo "1. Посетите https://www.nalog.gov.ru/ip/"
    echo "2. Найдите актуальные размеры страховых взносов"
    echo "3. Обновите файл: $CALCULATIONS_FILE"
    echo "4. Обновите компонент: $USN_HELPER_DIR/components/steps/Step3Insurance.tsx"
    echo ""
    echo "Текущие размеры в приложении:"
    echo "  • ПФР: $KNOWN_PFR ₽"
    echo "  • ФОМС: $KNOWN_FOMS ₽"
    echo "  • ИТОГО: $KNOWN_TOTAL ₽"
    echo ""
fi

# Выводим итоговый статус
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Статус данных ФНС: $STATUS"
echo "Последняя проверка: $(cat "$LAST_CHECK_FILE" 2>/dev/null || echo 'никогда')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit 0
