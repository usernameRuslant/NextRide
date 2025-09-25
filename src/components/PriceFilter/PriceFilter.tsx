import { useState } from 'react';
import css from './PriceFilter.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface PriceFilterProps {
  selected: number | null;
  onChange: (price: number | null) => void;
}

const PriceFilter = ({ selected, onChange }: PriceFilterProps) => {
  const [open, setOpen] = useState(false);
  const priceOptions = [30, 40, 50, 60, 70, 80];

  return (
    <div className={css.dropdown}>
      <label className={css.label}>Price/ 1 hour</label>
      <div className={css.control} onClick={() => setOpen((prev) => !prev)}>
        <span>{selected ? `To $${selected}` : 'Choose a price'}</span>
        <span className={css.arrow}>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <div className={css.menu}>
          <ul className={css.menuList}>
            {priceOptions.map((price) => (
              <li
                key={price}
                className={css.item}
                onClick={() => {
                  onChange(price);
                  setOpen(false);
                }}
              >
                {price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
