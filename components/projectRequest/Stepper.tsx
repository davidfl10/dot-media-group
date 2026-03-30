import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import Image from 'next/image';
// icons
import arrowBack from "@/public/icons/arrow-back.svg";
import arrowRight from "@/public/icons/arrow-right.svg";
import arrowRightDarker from "@/public/icons/arrow-right-darker.svg";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void | boolean | Promise<void | boolean>;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
  onNextStepRef?: (fn: () => void) => void;
}

interface StepperExtendedProps extends StepperProps {
  isEmailValid?: boolean;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => { },
  onFinalStepCompleted = () => { },
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  onNextStepRef,
  isEmailValid = true,
  ...rest
}: StepperExtendedProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep <= totalSteps) {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  // Expose handleNext to parent
  React.useEffect(() => {
    if (onNextStepRef) {
      onNextStepRef(handleNext);
    }
  }, [onNextStepRef, handleNext]);

  const handleComplete = async () => {
    if (isCompleting) return;

    setIsCompleting(true);
    setDirection(1);

    try {
      const result = await onFinalStepCompleted();
      if (result === false) return;

      updateStep(totalSteps + 1);
    } finally {
      setIsCompleting(false);
    }
  };

  const nextButtonDisabledByProps = Boolean(nextButtonProps.disabled);
  const isNextDisabled = (isLastStep && !isEmailValid) || isCompleting || nextButtonDisabledByProps;

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center sm:aspect-4/3 md:aspect-2/1"
      {...rest}
    >
      <div
        className={`mx-auto w-full rounded-[20px] shadow-xl ${stepCircleContainerClassName}`}
      >
        <div className={`${stepContainerClassName} flex w-full lg:w-[80%] mx-auto items-center mb-10`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={` ${footerClassName}`}>
            <div className={`flex w-full ${currentStep !== 1 ? 'justify-center gap-2' : 'justify-center'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`flex items-center justify-center duration-350 w-1/2 lg:w-fit bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] rounded-full border border-[#E2E8F02E] p-2 lg:px-3 transition ${currentStep === 1
                    ? 'pointer-events-none opacity-50 text-neutral-400'
                    : 'text-neutral-400'
                    }`}
                    {...backButtonProps}
                    >
                    <Image src={arrowBack} alt="Back" width={14} height={14} />
                    <p className="font-jakarta ml-2 text-xs leading-3 font-normal uppercase tracking-[1.2px]">{backButtonText}</p>
                </button>
              )}
              {currentStep >= 4 && (
                <button
                  onClick={isLastStep ? handleComplete : handleNext}
                  className={
                    "duration-350 w-1/2 lg:w-fit flex items-center justify-center gap-2 rounded-full bg-[#F6E9DA] text-neutral-900 border border-[#FFFFFF14] p-2 lg:px-3 font-medium tracking-tight transition hover:bg-[#F6E9DA] hover:text-neutral-800" +
                    (isNextDisabled ? " opacity-50 pointer-events-none" : "")
                  }
                  {...nextButtonProps}
                  disabled={isNextDisabled}
                >
                  <p className="font-jakarta ml-2 text-xs leading-3 font-normal uppercase tracking-[1.2px]">{nextButtonText}</p>
                  <Image src={arrowRightDarker} alt="Next" width={14} height={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = ''
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="center"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="w-full">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.00)', border: '1px solid rgba(226, 232, 240, 0.16)', backdropFilter: 'blur(6px)' },
          active: { scale: 1, backgroundColor: '#FFF', boxShadow: '0 0 8px 0 rgba(255, 255, 255, 0.24)' },
          complete: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(226, 232, 240, 0.32)', boxShadow: '0 0 8px 0 rgba(255, 255, 255, 0.24)', backdropFilter: 'blur(6px)' }
        }}
        transition={{ duration: 0.3 }}
        className="flex h-7 w-7 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <span className="text-sm font-jakarta font-extrabold leading-100% tracking-[-0.24px] text-neutral-400">{step}</span>
        ) : status === 'active' ? (
          <span className="text-sm font-jakarta font-extrabold leading-100% tracking-[-0.24px] text-neutral-900">{step}</span>
        ) : (
          <span className="text-sm font-jakarta font-extrabold leading-100% tracking-[-0.24px] text-neutral-400">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: '#262626' },
    complete: { width: '100%', backgroundColor: '#525252' }
  };

  return (
    <div className={`relative h-0.5 flex-1 overflow-hidden ${isComplete ? 'bg-neutral-600' : 'bg-neutral-900'}`}>
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> { }

function CheckIcon(props: CheckIconProps) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
