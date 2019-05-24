import React from 'react';
import './module-item.style.client.css';

const ModuleItem = ({moduleInput, deleteModule, setActiveModule, classText, updateModule, moduleToUpdateId, updateTitleChanged, updateTitle, submitUpdate}) => {
    if (moduleToUpdateId === moduleInput.id) {
        return (<li className={classText} key={moduleInput.id} onClick={() => setActiveModule(moduleInput)}>
                    <input className="form-control"
                            placeholder={moduleInput.title}
                            type="text"
                            onChange={updateTitleChanged}
                            value={updateTitle}
                            onClick={(e) => e.stopPropagation()}/>
                    <button className="btn" onClick={(e) => {e.stopPropagation(); submitUpdate();}}>Submit</button>
                </li>)
    } else{
        return (<li className={classText} key={moduleInput.id} onClick={() => setActiveModule(moduleInput)}>
                    <div onClick={(e) =>  {e.stopPropagation(); updateModule(moduleInput)}}>{moduleInput.title}</div>
                    <button onClick={(e) => {e.stopPropagation(); deleteModule(moduleInput.id)}} className="btn btn-secondary">Delete</button>
                </li>)
    }
}

export default ModuleItem