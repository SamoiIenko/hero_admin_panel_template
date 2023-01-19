import { heroAdded, heroesFetchingError } from '../../actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const [nameHero, setNameHero] = useState('');
    const [descHero, setDescHero] = useState('');
    const [elemHero, setElemHero] = useState('');

    const onAdd = (e) => {
        e.preventDefault();
        const heroData = {
            "id": uuidv4(),
            "name": nameHero,
            "description": descHero,
            "element": elemHero
        }
        console.log('added');
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(heroData))
            .then(dispatch(heroAdded(heroData)))
            .catch(() => dispatch(heroesFetchingError()))
        
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onAdd} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={nameHero}
                    onChange={(event) => setNameHero(event.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={descHero}
                    onChange={(event) => setDescHero(event.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elemHero}
                    onChange={(event) => setElemHero(event.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;