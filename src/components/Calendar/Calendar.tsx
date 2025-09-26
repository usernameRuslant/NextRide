import DatePicker from 'react-datepicker';
import type { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type CalendarProps = Partial<DatePickerProps> & {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
  className?: string;
};

function Calendar({
  selected,
  onChange,
  dateFormat = 'dd.MM.yyyy',
  placeholderText = 'Booking date',
  className,
}: CalendarProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      className={`${className || ''}`}
    />
  );
}

export default Calendar;
