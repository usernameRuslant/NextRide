import { useEffect, useState } from 'react';
import { fetchBrands } from '../../services/carServices';
import css from './BrandFilter.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface BrandFilterProps {
  selected: string;
  onChange: (brand: string) => void;
}

const BrandFilter = ({ selected, onChange }: BrandFilterProps) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data));
  }, []);

  return (
    <div className={css.dropdown}>
      <label className={css.label}>Car brand</label>
      <div className={css.control} onClick={() => setOpen((prev) => !prev)}>
        <span>{selected || 'Choose a brand'}</span>
        <span className={css.arrow}>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <div className={css.menu}>
          <ul className={css.menuList}>
            {brands.map((brand) => (
              <li
                key={brand}
                className={css.item}
                onClick={() => {
                  onChange(brand);
                  setOpen(false);
                }}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrandFilter;
