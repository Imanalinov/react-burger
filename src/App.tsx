import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className={styles.main_countainer} style={{maxHeight: '100vh'}}>
      <AppHeader />
      <div style={{display: 'flex', gap: '40px'}}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
