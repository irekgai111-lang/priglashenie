interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  'Основная информация',
  'Доходы по кварталам',
  'Страховые взносы',
  'Необходимые документы',
  'Предпросмотр декларации',
  'Инструкция по подаче',
  'Экспорт результатов',
];

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${
                    isActive
                      ? 'bg-purple-600 text-white scale-110'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }
                  transition transform
                `}
              >
                {isCompleted ? '✓' : step}
              </div>
              <div
                className={`
                  text-xs mt-2 text-center font-medium
                  ${isActive ? 'text-purple-600' : 'text-gray-600'}
                `}
              >
                {stepTitles[i]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
