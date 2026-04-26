'use client';

import { useState } from 'react';
import { FormData, TaxCalculation } from '@/lib/types';
import { calculateTax, formatRubles, formatMoney } from '@/lib/calculations';
import StepIndicator from '@/components/StepIndicator';
import Step1BasicInfo from '@/components/steps/Step1BasicInfo';
import Step2QuarterlyIncome from '@/components/steps/Step2QuarterlyIncome';
import Step3Insurance from '@/components/steps/Step3Insurance';
import Step4Documents from '@/components/steps/Step4Documents';
import Step5Declaration from '@/components/steps/Step5Declaration';
import Step6Instructions from '@/components/steps/Step6Instructions';
import Step7Export from '@/components/steps/Step7Export';

const TOTAL_STEPS = 7;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    inn: '',
    lastName: '',
    firstName: '',
    hasEmployees: false,
    quarterlyIncome: { q1: 0, q2: 0, q3: 0, q4: 0 },
    insuranceContributions: { fixed: 29354, percentageAmount: 0 },
  });

  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      if (currentStep === 2) {
        const calc = calculateTax(formData);
        setTaxCalculation(calc);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            📋 Помощник по подаче декларации УСН 6%
          </h1>
          <p className="text-purple-100">За налоговый год 2025</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {currentStep === 1 && (
            <Step1BasicInfo
              data={formData}
              onChange={handleFormDataChange}
            />
          )}
          {currentStep === 2 && (
            <Step2QuarterlyIncome
              data={formData}
              onChange={handleFormDataChange}
              calculation={taxCalculation}
            />
          )}
          {currentStep === 3 && (
            <Step3Insurance
              data={formData}
              onChange={handleFormDataChange}
            />
          )}
          {currentStep === 4 && (
            <Step4Documents
              hasEmployees={formData.hasEmployees}
            />
          )}
          {currentStep === 5 && taxCalculation && (
            <Step5Declaration
              formData={formData}
              calculation={taxCalculation}
            />
          )}
          {currentStep === 6 && (
            <Step6Instructions />
          )}
          {currentStep === 7 && (
            <Step7Export
              formData={formData}
              calculation={taxCalculation}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Назад
          </button>

          <div className="text-white font-semibold">
            Шаг {currentStep} из {TOTAL_STEPS}
          </div>

          <button
            onClick={handleNext}
            disabled={currentStep === TOTAL_STEPS}
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Далее →
          </button>
        </div>
      </div>
    </main>
  );
}
