import React from 'react'
import ModuleItem from './ModuleItem'

export default class ModuleList extends React.Component {
    constructor() {
        super();
        this.state = {
            module: {
                id: -1,
                title: "New Module"
            },
            modules: [
                {id: 123, title: 'Organic Chemistry'},
                {id: 234, title: 'Economics 101'},
                {id: 345, title: 'Quantum Physics'}
            ]
        }
    }
    createModule = () => {
        this.state.module.id = (new Date()).getTime();
        this.setState({
            modules: [this.state.module, ...this.state.modules]
        })
    }

    deleteModule = (id) => {
        console.log("Delete Module " + id);
        this.setState({
            modules: this.state.modules.filter(module => module.id !=id)
        })
    }

    titleChanged = (event) => {
        console.log(event.target.value);
        this.setState ({
            module: {
                title: event.target.value,
                id: (new Date()).getTime()
            }
        })
    }

    render() {
        return(
            <div>
                <h3>Module List</h3>
                <ul className="list-group">
                    <li onChange={this.titleChanged} className="list-group-item">
                        <input className="form-control"
                               defaultValue={this.state.module.item}/>
                        <button onClick={this.createModule} className="btn btn-primary btn-block">
                            Add module
                        </button>
                    </li>
                    {
                        this.state.modules.map((module) =>
                            <ModuleItem
                                deleteModule={this.deleteModule}
                                module={module} 
                                key={module.id}
                                title={module.title}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}