import { useEffect, useState } from 'react';
import css from './MileageFilter.module.css';

const MAX_VALUE = 999_999;

interface MileageFilterProps {
  from?: number | null;
  to?: number | null;
  onChangeFrom: (value: number | null) => void;
  onChangeTo: (value: number | null) => void;
}

// форматирование для отображения "10000" → "10,000"
const formatNumber = (value: string) => {
  if (!value) return '';
  const num = Number(value.replace(/\D/g, ''));
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US');
};

// парсинг в число (ограничение сверху)
const parseNumber = (value: string): number | null => {
  const cleaned = value.replace(/,/g, '');
  if (!cleaned) return null;
  const num = Number(cleaned);
  return num > MAX_VALUE ? MAX_VALUE : num;
};

const MileageFilter = ({
  from,
  to,
  onChangeFrom,
  onChangeTo,
}: MileageFilterProps) => {
  const [fromInput, setFromInput] = useState(from?.toString() ?? '');
  const [toInput, setToInput] = useState(to?.toString() ?? '');

  useEffect(() => {
    setFromInput(from?.toString() ?? '');
  }, [from]);

  useEffect(() => {
    setToInput(to?.toString() ?? '');
  }, [to]);

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Car mileage / km</label>
      <div className={css.inputs}>
        <div className={css.inputWrapperLeft}>
          <span className={css.prefix}>From&nbsp;</span>
          <input
            type="text"
            className={css.input}
            value={formatNumber(fromInput)}
            maxLength={7}
            onChange={(e) => {
              const parsed = parseNumber(e.target.value);
              setFromInput(parsed?.toString() ?? '');
              onChangeFrom(parsed);
            }}
          />
        </div>

        <div className={css.inputWrapperRight}>
          <span className={css.prefix}>To&nbsp;</span>
          <input
            type="text"
            className={css.input}
            value={formatNumber(toInput)}
            maxLength={7}
            onChange={(e) => {
              const parsed = parseNumber(e.target.value);
              setToInput(parsed?.toString() ?? '');
              onChangeTo(parsed);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MileageFilter;
