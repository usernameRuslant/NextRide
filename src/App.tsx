import { Link, NavLink, Route, Routes } from 'react-router-dom';

import Home from './page/Home/Home';
import CatalogCars from './page/CatalogCars/CatalogCars';
import css from './App.module.css';
import CarDetails from './page/CarDetails/CarDetails';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.navigation}>
          <Link to="/" className={css.home}>
            Rental<span className={css.homeSpan}>Car</span>
          </Link>
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
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogCars />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
