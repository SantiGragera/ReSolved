import React, { useEffect, useState } from 'react'
import './Ingresos.css'
import PieIngresos from '../PieIngresos/PieIngresos'

const Ingresos = () => {

    const [ingresoAdded, setIngresosAdded] = useState(() => {
        const storedIngresos = localStorage.getItem('ingresos');
        return storedIngresos ? JSON.parse(storedIngresos) : [];
    });

    const [categoriasTotales, setCategoriasTotales] = useState(() => {
        const storedcategoriasTotales = localStorage.getItem('categoriasTotales');
        return storedcategoriasTotales ? JSON.parse(storedcategoriasTotales) : {};
    });

    useEffect(() => {
        localStorage.setItem('ingresos', JSON.stringify(ingresoAdded));
    }, [ingresoAdded]);
    
    useEffect(() => {
        localStorage.setItem('categoriasTotales', JSON.stringify(categoriasTotales));
    }, [categoriasTotales]);

    // const [categoriasTotales, setCategoriasTotales] = useState({})
    const [categories, setCategories] = useState([
        'Salario',
        'Regalos',
        'Prestamos',
        'Otro'
    ])

    // const [ingresoAdded, setIngresosAdded] = useState([])
    const [ingresoData, setIngresoData] = useState({
        title: '',
        ingreso: '',
        category: ''
    })

    const [incompleteFields, setIncompleteFields] = useState({
        title: false,
        ingreso: false,
        category: false
    })

    const handleIngresoChange = (event) => {
        const { name, value } = event.target;
        setIngresoData((prevData) => ({ ...prevData, [name]: value }))
        setIncompleteFields((prevFields) => ({ ...prevFields, [name]: false }))
    }

    const handleAddButton = () => {
        if (ingresoData.title && ingresoData.ingreso && ingresoData.category) {
            const nuevoItem = {
                title: ingresoData.title,
                ingreso: ingresoData.ingreso,
                category: ingresoData.category
            }

            setIngresoData({
                title: '',
                ingreso: '',
                category: '',
            })

            setIngresosAdded((prevItems) => {
                const updatedItems = [...prevItems, nuevoItem];
                localStorage.setItem('ingresos', JSON.stringify(updatedItems));
                return updatedItems;
            });
            setCategoriasTotales((prevTotals) => ({
                ...prevTotals,
                [nuevoItem.category]: (prevTotals[nuevoItem.category] || 0) + parseFloat(nuevoItem.ingreso)
            }))
        } else {
            setIncompleteFields({
                title: !ingresoData.title,
                ingreso: !ingresoData.ingreso,
                category: !ingresoData.category,
            });
        }
    }

    const handleDeleteItem = (index, category, ingreso) => {
        const itemEliminado = ingresoAdded[index]

        setIngresosAdded((prevItems) => {
            const itemsActualizados = [...prevItems];
            itemsActualizados.splice(index, 1);
            return itemsActualizados;
        });

        setCategoriasTotales((prevTotals) => ({
            ...prevTotals,
            [itemEliminado.category]: prevTotals[itemEliminado.category] - parseFloat(itemEliminado.ingreso),
        }));
    };

    const eliminarItem = (index) => {
        const nuevosItems = [...ingresoAdded];
        const itemEliminado = nuevosItems.splice(index, 1)[0];
        
        setIngresosAdded(nuevosItems);

        setCategoriasTotales((prevTotals) => ({
            ...prevTotals,
            [itemEliminado.category]: prevTotals[itemEliminado.category] - parseFloat(itemEliminado.ingreso),
        }));
    };

    useEffect(() => {
        const storedIngresos = localStorage.getItem('ingresos');
        if (storedIngresos) {
            setIngresosAdded(JSON.parse(storedIngresos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ingresos', JSON.stringify(ingresoAdded));
    }, [ingresoAdded]);

    const pieData = {
        labels: Object.keys(categoriasTotales),
        datasets: [
            {
                data: Object.values(categoriasTotales),
                backgroundColor: ['#14406B', '#7793D0', '#3664C7', '#293247', '#284B94', '#A9B1D0', '#657BC7', '#242C47', '#77A8D0'],
                hoverBackgroundColor: ['#FFFF'],
            },
        ],
    };

    return (
        <div className='mainGastos'>
            <div className="col2">
                <div className='btnadd'>
                    <button onClick={handleAddButton}>Add</button>
                </div>
                <div className='agregado'>
                    <input
                        name='title'
                        type="text"
                        placeholder='titulo'
                        className={incompleteFields.title ? 'incomplete inputsfacha' : 'inputsfacha'}
                        onChange={handleIngresoChange}
                        value={ingresoData.title}
                    />
                    <input
                        name='ingreso'
                        type="number"
                        placeholder='ingreso'
                        className={incompleteFields.title ? 'incomplete inputsfacha' : 'inputsfacha'}
                        onChange={handleIngresoChange}
                        value={ingresoData.ingreso}
                    />
                    <select
                        name="category"
                        id="category"
                        onChange={handleIngresoChange}
                        value={ingresoData.category}
                        className={incompleteFields.title ? 'incomplete inputsfacha' : 'inputsfacha'}>
                        <option value="">
                            Categorias
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {ingresoAdded.map((item, index) => (
                        <div key={index} className='containerni'>
                            <h3 className='newitems'>{item.title} - {item.ingreso}</h3>
                            <button onClick={() => eliminarItem(index, item.category, item.ingreso)} className='btndel'> eliminar </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col3'>
                <div className='pieclass'>
                    <PieIngresos data={pieData} />
                </div>
                {Object.keys(categoriasTotales).map((category, index) => (
                    categoriasTotales[category] !== 0 && (
                        <h3 key={index} className='boxescat'>
                            {category} - {categoriasTotales[category]}
                        </h3>
                    )
                ))}
            </div>

        </div>
    )
}

export default Ingresos