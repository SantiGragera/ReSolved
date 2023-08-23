import React, { useEffect, useState } from 'react'
import './MainGastos.css'
import InputAdd from '../InputAdd/InputAdd'
import PieChart from '../PieChart/PieChart'

const MainGastos = () => {

  const [categories, setCategories] = useState([
    'Alimentos',
    'Salud',
    'Ocio',
    'Educacion',
    'Regalo',
    'Transporte',
    'Impuestos',
    'Casa',
    'Otro'
  ])

  const [items, setItems] = useState([])
  // const [categoryTotals, setCategoryTotals] = useState({})

  const [categoryTotals, setCategoryTotals] = useState(() => {
    const storedcategoryTotals = localStorage.getItem('categoryTotals');
    return storedcategoryTotals ? JSON.parse(storedcategoryTotals) : {};
  });

  useEffect(() => {
    localStorage.setItem('categoryTotals', JSON.stringify(categoryTotals));
  }, [categoryTotals]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem])

    setCategoryTotals((prevTotals) => ({
      ...prevTotals,
      [newItem.category]: (prevTotals[newItem.category] || 0) + parseFloat(newItem.gasto)
    }))
  }

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#14406B', '#7793D0', '#3664C7', '#293247', '#284B94', '#A9B1D0', '#657BC7', '#242C47', '#77A8D0'],
        hoverBackgroundColor: ['#FFFF'],
      },
    ],
  };

  const handleDeleteItem = (index, category, gasto) => {
    setItems((prevItems) => {
      const itemsActualizados = [...prevItems];
      itemsActualizados.splice(index, 1);
      return itemsActualizados;
    });
  
    setCategoryTotals((prevTotals) => ({
      ...prevTotals,
      [category]: prevTotals[category] - parseFloat(gasto)
    }));
  };

  return (
    <div className='mainGastos'>
        <div className='col2'> 
         <InputAdd categories={categories} onAdd={handleAddItem} handleDeleteItem={handleDeleteItem} />
        </div>
      <div className='col3'>
        <div className='pieclass'>
          <PieChart data={pieChartData} />
        </div>
        {Object.keys(categoryTotals).map((category, index) => (
          categoryTotals[category] !== 0 && (
            <h3 key={index} className='boxescat'>
              {category} - {categoryTotals[category]}
            </h3>
          )
        ))}
      </div>
    </div>
  )
}

export default MainGastos