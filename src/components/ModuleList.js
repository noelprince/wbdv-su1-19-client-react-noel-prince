import React from 'react'
import ModuleItem from './ModuleItem'

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module: {
                id: -1,
                title: "",
                item: "New Module"
            },
            modules: this.props.modules
        }
    }
    createModule = () => {
        this.state.module.id = (new Date()).getTime();
        if (this.state.module.title == "") {
            this.state.module.title = "New Module";
        }
        this.setState({
            module: {
                id: (new Date()).getTime(),
            },
            modules: [this.state.module, ...this.state.modules]
        })
    }

    deleteModule = (id) => {
        console.log("Delete Module " + id);
        this.setState({
            modules: this.state.modules.filter(module => module.id !== id)
        })
    }

    titleChanged = (event) => {
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
                    <li onChange={this.titleChanged}
                        className="list-group-item"
                        onClick={this.clearTargetValue}>
                        <input className="form-control"
                               placeholder={this.state.module.item}/>
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