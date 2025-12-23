import { timeRanges } from '../utils/api';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  return (
    <div className="time-range-selector">
      {Object.keys(timeRanges).map((range) => (
        <button
          key={range}
          className={selectedRange === range ? 'active' : ''}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
