import { classNames } from "~/utilities/classNames";

export const StepperIndicator = ({ steps, activeIndex }) => (
  <div className="flex flex-wrap items-end mb-4">
    {steps.map((item, index) => (
      <div className={"flex-1 font-medium cursor-default h-full"} key={index}>
        <h4
          className={classNames(
            "text-base font-semibold text-center m-2 max-h-12 line-clamp-2",
            activeIndex >= index ? "text-primary" : "text-gray"
          )}
        >
          {item?.label || item}
        </h4>
        <div className="flex items-center gap-1.5">
          <hr
            className={classNames(
              "border-2 flex-1 transition-all duration-300",
              activeIndex >= index ? "border-primary" : "border-gray-light"
            )}
          />
          <span
            className={classNames(
              "inline-flex items-center justify-center h-8 w-8 rounded-full text-sm p-1 border font-medium",
              activeIndex >= index ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"
            )}
          >
            {index < activeIndex ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            ) : (
              index + 1
            )}
          </span>
          <hr
            className={classNames("border-2 flex-1", activeIndex >= index ? "border-primary" : "border-gray-light")}
          />
        </div>
      </div>
    ))}
  </div>
);

const StepperWizard = ({ steps = [], activeIndex = 0, setActiveIndex }) => {
  const handleNext = () => {
    if (activeIndex === steps.length - 1) return;
    setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activeIndex === 0) return;
    setActiveIndex((prev) => prev - 1);
  };

  const RenderComponent = ({ component }) => {
    const MyComponent = component;
    return (
      <div className={classNames("animate-slidein")}>
        <MyComponent onNext={handleNext} onPrev={handlePrev} />
      </div>
    );
  };

  return (
    <div>
      {/* indicators */}
      <StepperIndicator steps={steps} activeIndex={activeIndex} />
      {/* content */}
      <div className="overflow-x-hidden">
        <RenderComponent component={steps[activeIndex]?.component || steps[activeIndex]} />
      </div>
    </div>
  );
};

export default StepperWizard;
