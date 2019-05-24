import React from 'react';
import './module-item.style.client.css';

const ModuleItem = ({moduleInput, deleteModule, setActiveModule, classText}) =>
    <li className={classText} key={moduleInput.id}>
        <div onClick={() => setActiveModule(moduleInput)}>{moduleInput.title}</div>
        <button onClick={() => deleteModule(moduleInput.id)} className="btn btn-secondary">Delete</button>
    </li>

export default ModuleItem