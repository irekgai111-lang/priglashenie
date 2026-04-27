import { FormData, TaxCalculation } from './types';

const TAX_RATE = 0.06;
const MAX_TAX_REDUCTION_WITH_EMPLOYEES = 0.5;
// Фиксированные взносы за 2025 год (по данным ФНС)
const FIXED_CONTRIBUTION_2025 = 53658; // ПФР: 44 172 + ФОМС: 9 486

export function calculateTax(data: FormData): TaxCalculation {
  const q1 = data.quarterlyIncome.q1;
  const q2 = data.quarterlyIncome.q2;
  const q3 = data.quarterlyIncome.q3;
  const q4 = data.quarterlyIncome.q4;

  const totalIncome = q1 + q2 + q3 + q4;

  // Расчет налога по кварталам
  const q1Tax = Math.round(q1 * TAX_RATE);
  const q2Tax = Math.round(q2 * TAX_RATE);
  const q3Tax = Math.round(q3 * TAX_RATE);
  const q4Tax = Math.round(q4 * TAX_RATE);

  const totalTax = q1Tax + q2Tax + q3Tax + q4Tax;

  // Страховые взносы
  const fixedContributions = FIXED_CONTRIBUTION_2025;
  let percentageContributions = 0;

  // 1% от дохода свыше 300k рублей
  if (totalIncome > 300000) {
    percentageContributions = Math.round((totalIncome - 300000) * 0.01);
  }

  const totalContributions = fixedContributions + percentageContributions;

  // Вычеты (для УСН 6% они уменьшают налог)
  const totalDeductions =
    (data.deductions?.education || 0) +
    (data.deductions?.sickLeavePayments || 0) +
    (data.deductions?.rd || 0) +
    (data.deductions?.charity || 0);

  // Уменьшение налога на страховые взносы и вычеты
  let maxTaxReduction = totalTax;
  if (data.hasEmployees) {
    maxTaxReduction = Math.round(totalTax * MAX_TAX_REDUCTION_WITH_EMPLOYEES);
  }

  // Сначала вычитаем взносы, затем вычеты (если остается налог)
  const afterContributionsReduction = Math.max(0, totalTax - Math.min(totalContributions, maxTaxReduction));
  const actualTaxReduction = Math.min(totalContributions + totalDeductions, totalTax);
  const finalTax = Math.max(0, totalTax - actualTaxReduction);

  return {
    totalIncome,
    q1Income: q1,
    q2Income: q2,
    q3Income: q3,
    q4Income: q4,
    q1Tax,
    q2Tax,
    q3Tax,
    q4Tax,
    totalTax,
    fixedContributions,
    percentageContributions,
    totalContributions,
    totalDeductions,
    maxTaxReduction,
    actualTaxReduction,
    finalTax,
  };
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatRubles(amount: number): string {
  return `${formatMoney(amount)} ₽`;
}

export const FIXED_CONTRIBUTION_INFO = {
  year: 2025,
  total: FIXED_CONTRIBUTION_2025,
  pfr: 44172,
  foms: 9486,
  deadline: '28 декабря 2025',
};
