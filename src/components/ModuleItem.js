import React from 'react'

const ModuleItem = ({module, deleteModule}) =>
    <li className="list-group-item">
        {module.title}
        <button onClick={() => deleteModule(module.id)} className="btn btn-secondary">Delete</button>
    </li>

export default ModuleItem