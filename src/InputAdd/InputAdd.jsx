import React, { useEffect, useState } from 'react'
import './InputAdd.css'

const InputAdd = ({ categories, onAdd, handleDeleteItem }) => {

    const [inputData, setInputData] = useState({
        title: '',
        gasto: '',
        category: ''
    })

    // const [itemsAdded, setItemsAdded] = useState([])
    const [itemsAdded, setItemsAdded] = useState(() => {
        const storedGastos = localStorage.getItem('gastos');
        return storedGastos ? JSON.parse(storedGastos) : [];
    });

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(itemsAdded));
    }, [itemsAdded]);

    const [incompleteFields, setIncompleteFields] = useState({
        title: false,
        gasto: false,
        category: false
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }))
        setIncompleteFields((prevFields) => ({ ...prevFields, [name]: false }))
    }

    const handleAddClick = () => {
        if (inputData.title && inputData.gasto && inputData.category) {
            const newItem = {
                title: inputData.title,
                gasto: inputData.gasto,
                category: inputData.category,
            };

            onAdd(newItem);

            setInputData({
                title: '',
                gasto: '',
                category: '',
            });

            setItemsAdded((prevItems) => {
                const updatedItems = [...prevItems, newItem];
                localStorage.setItem('gastos', JSON.stringify(updatedItems));
                return updatedItems;
            });
        } else {
            setIncompleteFields({
                title: !inputData.title,
                gasto: !inputData.gasto,
                category: !inputData.category,
            });
        }
    }

    const eliminarItem = (index, category, gasto) => {
        const itemEliminado = itemsAdded[index]

        setItemsAdded((prevItems) => {
            const itemsActualizados = [...prevItems];
            itemsActualizados.splice(index, 1);
            return itemsActualizados;
        });
      
        handleDeleteItem(index, itemEliminado.category, itemEliminado.gasto);
    };

    return (
        <div className='todoinputs'>
            <div className='btnadd'>
                <button onClick={handleAddClick}>Add</button>
            </div>
            <div className='agregado'>
                <input
                    type="text"
                    placeholder='title'
                    name='title'
                    value={inputData.title}
                    onChange={handleInputChange}
                    className={incompleteFields.title ? 'incomplete inputsfacha' : 'inputsfacha'}
                />
                <input
                    type="number"
                    placeholder='gasto'
                    name='gasto'
                    value={inputData.gasto}
                    onChange={handleInputChange}
                    className={incompleteFields.gasto ? 'incomplete inputsfacha' : 'inputsfacha'}
                />
                <select
                    name="category"
                    id="category"
                    value={inputData.category}
                    onChange={handleInputChange}
                    className={incompleteFields.category ? 'incomplete inputsfacha' : 'inputsfacha'}
                >
                    <option value=''>Categorias</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {itemsAdded.map((item, index) => (
                    <div key={index} className='containerni'>
                        <h3 className='newitems'>{item.title} - {item.gasto}</h3>
                        <button onClick={() => eliminarItem(index, item.category, item.gasto)} className='btndel'> eliminar </button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default InputAdd