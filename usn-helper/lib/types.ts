export interface IPData {
  inn: string;
  lastName: string;
  firstName: string;
  hasEmployees: boolean;
}

export interface QuarterlyIncome {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface InsuranceContributions {
  fixed: number;
  percentageAmount: number;
}

export interface Deductions {
  education: number; // Вычет за обучение работников
  sickLeavePayments: number; // Больничные выплаты сотрудникам (первые 3 дня)
  rd: number; // Научные исследования и разработки
  charity: number; // Благотворительность
}

export interface TaxCalculation {
  totalIncome: number;
  q1Income: number;
  q2Income: number;
  q3Income: number;
  q4Income: number;
  q1Tax: number;
  q2Tax: number;
  q3Tax: number;
  q4Tax: number;
  totalTax: number;
  fixedContributions: number;
  percentageContributions: number;
  totalContributions: number;
  totalDeductions: number; // Сумма всех вычетов
  maxTaxReduction: number;
  actualTaxReduction: number;
  finalTax: number;
}

export interface FormData extends IPData {
  quarterlyIncome: QuarterlyIncome;
  insuranceContributions: InsuranceContributions;
  deductions: Deductions;
}
