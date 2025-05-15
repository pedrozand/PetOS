import "./ProgressBar.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progressbar-container">
      <div className="progressbar-line-background">
        <div
          className="progressbar-line-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
