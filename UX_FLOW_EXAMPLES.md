# UX FLOW ПРИМЕРЫ: TURBOTAX vs PRIGLASHENIE VISION

---

## СЦЕНАРИЙ 1: НОВЫЙ USER, W-2 INCOME (Простой случай)

### TurboTax Flow (Benchmark)
```
Q1. "What's your filing status?"
    → Single / Married filing jointly / Head of household
    
Q2. "Did you have W-2 income last year?"
    → Yes / No
    
Q3. "How many jobs did you have?"
    → 1 / 2 / 3+ (enter details for each)
    
Q4. "Did you have any other income?"
    → Student loan interest
    → Dividend income
    → Capital gains
    → Rental income
    
Q5. [Conditional] "Do you own a home?"
    → Yes → Mortgage interest + property tax questions
    → No → Skip
    
[Result Screen]
"Your estimated refund: $2,450"
"Federal tax: $4,200"
"Effective tax rate: 12.5%"

[Upsell]
"Add state return? (only $29)"
```

**Time:** 8 minutes | **Completion rate:** 85%

### Priglashenie Vision (Telegram Bot)
```
🤖 "Привет! 👋 Я помогу вам с налогами за 2025 год.
   
   Начнем с основного:
   Какой ваш основной источник дохода?
   
   1️⃣ W-2 (зарплата от работодателя)
   2️⃣ 1099 (фриланс/контрактор)
   3️⃣ Инвестиции/дивиденды
   4️⃣ Комбо (несколько источников)"

👤 "1 (W-2)"

🤖 "Спасибо! Ваш путь будет быстрым ⚡
   
   Следующий вопрос:
   Ваш статус при подаче?"
   
   🔹 Single (один)
   🔹 Married filing jointly (женат, совместно)
   🔹 Head of household (глава семьи)"

👤 "Single"

🤖 "Понял! Теперь нужны детали о зарплате.
   
   💰 Сумма валовой зарплаты за год (из W-2 box 1)?"

👤 "$65,000"

🤖 "✅ $65,000 записал.
   
   📋 Какие налоги были удержаны?
   (Из W-2 box 2 - federal tax withheld)
   Примерно? (можно оценить)"

👤 "$7,500"

🤖 "Great! 
   
   *Ваш preliminary refund: $850-950* ✅
   (Будет уточняться)
   
   Есть еще источники дохода?"

👤 "Нет"

🤖 "Perfect! Последний вопрос:
   
   Вы владеете домом или платили ипотеку?
   (Это может увеличить ваш refund 💰)"

👤 "Нет"

🤖 "💯 Ваш итоговый refund: ~$950
   
   Это базовый расчет. Готовы к подаче?
   
   🔹 Подать (бесплатно)
   🔹 Добавить штат? (29$)
   🔹 Добавить детали (эксперт поможет)"

👤 "Подать"

🤖 "✅ E-filed! 📧
   
   Номер подтверждения: IRS-2025-04-12345
   Refund ожидается: 5-7 дней (на карту)
   
   Спасибо! 🎉"
```

**Time:** 6 minutes | **Expected completion:** 88% (Telegram is more forgiving than web) | **Cost:** FREE (vs TurboTax $149)

---

## СЦЕНАРИЙ 2: SELF-EMPLOYED (Средняя сложность)

### TurboTax Flow
```
Q1-Q3: [Same as scenario 1 - filing status, W-2 income]

Q4. "Did you have self-employment income?"
    → Yes / No
    
Q5. [Self-employed interview]
    "Tell me about your business"
    → Business name
    → Legal structure (sole proprietor, LLC, S-Corp)
    → Quarterly estimated tax payments? (yes → enter amounts)
    → Business vehicle usage? (yes → miles, expenses)
    → Home office deduction? (yes → square footage)
    → Employee wages paid? (yes → enter details)
    
Q6. "Business expenses"
    → Supplies
    → Advertising
    → Professional services
    → Travel
    → Meals & entertainment
    → etc.

[Result]
"Self-employment tax: $7,245"
"Net business income: $45,000"
"Effective tax rate: 28.5% (including SE tax)"
```

**Time:** 25-30 minutes | **Completion rate:** 60% (complex cases have higher drop-off)

### Priglashenie Vision
```
🤖 "Спасибо за ввод! 
   
   Вижу, что вы self-employed.
   Нужна информация о вашем бизнесе.
   
   📌 Название бизнеса?"

👤 "Digital Marketing Agency"

🤖 "Nice! 
   
   📊 Валовой доход в 2025?"

👤 "$120,000"

🤖 "✅ $120,000
   
   💸 Основные расходы? 
   (Обычное для маркетинга: программное обеспечение, реклама, рабочее пространство)
   
   Я могу помочь классифицировать, или вы хотите детали?
   
   1️⃣ Быстро (я помогу оценить)
   2️⃣ Детально (enter каждый расход)
   3️⃣ Загрузить документы (фото квитанций)"

👤 "1"

🤖 "Отлично! 
   
   Примерные расходы для маркетинга:
   📌 Программное обеспечение (SaaS) — сколько в год?
   (Zoom, Slack, Adobe, tools...)"

👤 "$3,600"

🤖 "✅ $3,600
   
   📌 Реклама и маркетинг расходы?"

👤 "$8,000"

🤖 "✅ $8,000
   
   📌 Рабочее пространство (аренда офиса, home office)?
   (Если дома: примерно % от вашей квартиры)"

👤 "Home office, ~300 sqft, $2,400/year"

🤖 "✅ Home office deduction: ~$600/year
   
   📌 Другие расходы? (travel, meals, equipment, insurance)
   Или достаточно?"

👤 "Есть travel $5,000 и meals $1,200"

🤖 "✅ Добавил.
   
   🧮 **ВАШ INCOME SUMMARY:**
   
   Gross income: $120,000
   Expenses: $20,400
   **Net business income: $99,600**
   
   Self-employment tax: $14,087
   Federal tax (estimated): $18,500
   **Total tax: $32,587**
   
   ⚠️ Возможно, вам нужно платить quarterly estimated taxes
   в 2026, чтобы избежать штрафа!
   
   Хотите:
   🔹 Подать (e-file)?
   🔹 Добавить more details?
   🔹 Поговорить с CPA? (Expert assist)"

👤 "Подать"

🤖 "✅ E-filed!
   
   📊 **TAX SUMMARY:**
   Income: $120,000
   Deductions: $20,400
   Net: $99,600
   Federal tax: $18,500
   SE tax: $14,087
   Estimated refund: -$5,987 (owed)
   
   💳 Вы должны $5,987.
   
   Хотите:
   🔹 Заплатить сейчас (Stripe)?
   🔹 Установить план платежей?
   🔹 Посмотреть 2026 planning?
   
   [Upsell] 🔥 PREMIUM: Quarterly tax planner ($49/year)
   - Alerts в Jan, Apr, Jul, Oct
   - Calculates estimated payments
   - Saves average $2,000 in penalties"

👤 "Посмотреть planning"

🤖 "PLAN FOR 2026:
   
   Если доход будет похож ($120K):
   Monthly tax savings needed: ~$2,715
   (To avoid underpayment penalty)
   
   Можно:
   1️⃣ Set aside cash (monthly)
   2️⃣ Quarterly payments ($10,800 в Jan, Apr, Jul, Oct)
   3️⃣ Adjust W-4 (если есть W-2 job)
   
   Добавить reminder? (Premium feature)"

👤 "Да"

🤖 "✅ Reminders set!
   
   🎉 Все готово! Спасибо за использование Priglashenie."
```

**Time:** 15 minutes | **Expected completion:** 82% | **Upsell opportunity:** $49/year (quarterly planning)

---

## СЦЕНАРИЙ 3: INVESTOR (Capital Gains)

### Priglashenie Vision
```
🤖 "Вижу инвестиции в портфолио.
   
   💹 Сколько инвестпортфолей?"

👤 "Один — Wealthfront"

🤖 "Perfect! Я знаю про Wealthfront. 
   
   Можно ли просто подключить твой аккаунт?
   (OAuth с Wealthfront для auto-import капитальных прибылей)
   
   🔹 Да, подключить
   🔹 Нет, введу вручную
   🔹 Загрузить файл (CSV)"

👤 "Да, подключить"

🤖 "Redirecting to Wealthfront...
   [User authenticates]
   
   ✅ Connected!
   📊 Importing your 2025 capital gains...
   
   [Auto-import results]
   10 stock sales detected
   Total proceeds: $45,000
   Total cost basis: $40,000
   **Capital gains: $5,000 (long-term)**
   
   Also detected: Tax-loss harvesting
   **Realized losses: $2,100**
   
   Net capital gains: $2,900
   
   Это выглядит верно? 
   🔹 Да
   🔹 Нужны детали / исправления"

👤 "Да"

🤖 "Excellent!
   
   💡 **TurboTax INTEGRATION:** 
   Хотите автоматически экспортировать в TurboTax?
   (Schedule D будет заполнена автоматически)
   
   🔹 Yes (easy)
   🔹 No (manual file)
   🔹 Just calculate my tax (no filing)"

👤 "Just calculate"

🤖 "**YOUR TAX SUMMARY:**
   
   W-2 income: $95,000
   Capital gains: $2,900 (15% rate = $435)
   Dividends: $1,200 (15% rate = $180)
   
   Federal tax: $13,900
   State tax: $5,000 (if applicable)
   
   **Tax-loss harvesting savings: $525** 💰
   (Thanks Wealthfront!)
   
   Ready to e-file?
   🔹 Submit
   🔹 Add more income
   🔹 Expert review"

👤 "Submit"

🤖 "✅ E-filed!
   
   💡 **NEXT YEAR PLANNING:**
   
   Your 2026 quarterly estimated tax: $3,200/quarter
   (Due: Apr 15, Jun 15, Sep 15, Jan 15)
   
   🔔 Want reminders?"

👤 "Yes"

🤖 "✅ Set!
   
   One more thing: 
   
   🔥 **WEALTHFRONT PARTNERSHIP**
   
   Wealthfront noticed you're paying 15% tax on gains.
   
   They have Direct Indexing (for accounts $100K+):
   - Same diversification
   - But harvest losses DAILY (not once/year)
   - Could save additional $500-1000/year
   
   Want 20% discount on Wealthfront upgrade?
   (I'll send you a link)"

👤 "Interesst! Send link"

🤖 "✅ Sent to your Telegram!
   
   Commission: Priglashenie gets 10% if you upgrade
   (Full transparency 😊)
   
   Спасибо за использование!"
```

**Time:** 8 minutes | **Completion:** 95% (auto-import magic) | **Upsells:** Quarterly planner + Wealthfront referral = $50-100 value

---

## СЦЕНАРИЙ 4: COMPLEX (Crypto + Multiple Income)

```
User: Freelancer + crypto investor + dividend income

🤖 "Wow, you're complex! 😄 (in a good way)
   
   Обнаружил:
   ✅ W-2 income
   ✅ 1099 self-employment
   ✅ Crypto (capital gains/losses)
   ✅ Dividend income
   ✅ IRA contributions
   
   Это будет tax return PREMIUM tier ($199).
   
   Рекомендую обговорить с CPA.
   
   Хотите:
   🔹 Продолжить (с гайдом)
   🔹 Консультация с CPA ($99, 30 min)
   🔹 Оба"

User: "Оба"

🤖 "Perfect! 
   
   📅 Scheduling CPA call...
   [Calendar integration]
   ✅ Call scheduled for tomorrow 2pm
   
   📧 Meanwhile, let's start gathering data:
   
   1️⃣ CRYPTO - какая биржа?
   (Coinbase, Kraken, Binance...)"

User: "Coinbase"

🤖 "Можно подключить Coinbase напрямую?
   (OAuth для auto-import всех транзакций)"

User: "Да"

🤖 "Perfect! 
   [OAuth redirect]
   ✅ Connected!
   
   🔍 Scanning your Coinbase activity...
   
   **Results:**
   - 47 buy transactions
   - 23 sell transactions
   - Net capital gains: $8,900
   - Net capital losses: $3,200
   - **Net: $5,700**
   
   Average holding period: 4.2 months (short-term, 37% tax rate)
   
   This is significant. CPA call will help optimize.
   
   2️⃣ DIVIDENDS - Какой брокер?"

User: "Vanguard"

🤖 "Можно подключить Vanguard?
   (Auto-import 1099-DIV)"

[Repeat for each data source...]

[After CPA call]
🤖 "Your CPA recommended:
   
   1️⃣ Hold crypto longer (>1 year) for long-term rate (20% vs 37%)
   2️⃣ Harvest losses more aggressively
   3️⃣ Max out IRA contribution
   
   **UPDATED ESTIMATE:**
   Federal tax: $16,200 (vs $18,900 if no optimization)
   **Savings: $2,700** 📊
   
   Ready to file?"

User: "Yes"

🤖 "✅ Filed!
   
   **YOUR 2025 TAXES:**
   - Income: $185,000
   - Deductions: $24,000
   - Capital gains: $5,700
   - Dividends: $4,200
   **Tax owed: $35,100**
   
   CPA made this decision worthwhile! 💰"
```

**Time:** 30 minutes (includes CPA call) | **Completion:** 75% (complex cases are always lower) | **CPA upsell:** $99 consultation = highly profitable

---

## KEY CONVERSATIONAL UX PATTERNS

### 1. PROGRESSIVE REVELATION
```
Don't ask: "List all your deductions"
Do ask: "Did you own a home?" → If yes → "Mortgage interest?"
```

### 2. VALIDATION & CONFIRMATION
```
User: "$120,000"
Bot: "✅ $120,000 recorded" (immediate feedback)
```

### 3. ESTIMATED RESULTS IN REAL-TIME
```
After Q5 of 10:
Bot: "*Your estimated refund so far: $950*
(Will be updated as we go)"
```

### 4. CONDITIONAL FOLLOW-UPS
```
if deductions > 10000:
    suggest_itemized_deduction()
if crypto_sales:
    suggest_tax_loss_harvesting()
if self_employed:
    suggest_quarterly_planning()
```

### 5. UPSELL AT NATURAL POINTS
```
After "owed $5,987":
Bot: "Want quarterly tax planning to avoid this next year?"
(Premium: $49/year)

After "complex crypto":
Bot: "CPA consultation? ($99, 30 min)"

After "successful filing":
Bot: "Refer a friend, get $20 credit"
```

### 6. EMOJI FOR CLARITY
```
✅ Confirmed
❌ Error
⚠️ Warning  
💰 Money/savings
📊 Data/calculation
🔔 Reminder
🔥 Hot deal/upsell
```

---

## TELEGRAM-SPECIFIC ADVANTAGES

### Over Web (TurboTax, H&R Block)
- ✅ Mobile-first (not responsive design)
- ✅ Conversational by default (fits Telegram UX)
- ✅ Push notifications (reminders for quarterly taxes)
- ✅ Ambient trust (users already in Telegram)
- ✅ No app installation (vs TurboTax app)

### Over ChatGPT/Claude
- ✅ Integrated payment (Stripe)
- ✅ IRS e-file capability (requires licensed provider)
- ✅ Multi-year history (persistent data)
- ✅ Regulatory compliance (GDPR, HIPAA if needed)

---

**Tips for Implementation:**

1. **Use inline buttons** (not just text commands)
2. **Edit messages** instead of sending new ones (less clutter)
3. **Mention estimated time** ("This will take 15 minutes")
4. **Save progress** (can resume where left off)
5. **Confirm before submission** ("Ready to e-file?")

---

**Документ подготовлен для:** Priglashenie Development Team  
**Версия:** 1.0  
**Дата:** 2026-04-27
