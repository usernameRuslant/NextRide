import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import CatalogCars from './page/CatalogCars/CatalogCars';
import css from './App.module.css';
import CarDetails from './components/CarDetails/CarDetails';

function App() {
  return (
    <div>
      <nav className={css.header}>
        <div className={css.navigation}>
          <Link to="/">RentalCar</Link>
          <ul className={css.listMenu}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? css.itemLinkActive : css.itemLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? css.itemLinkActive : css.itemLink
                }
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogCars />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
      </Routes>
    </div>
  );
}

export default App;
