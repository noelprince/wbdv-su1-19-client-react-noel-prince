import React from 'react';
import ModuleItem from './ModuleItem';
import {Link} from 'react-router-dom';

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        var cleanModules = [];
        if (this.props.course.modules != null) {
            cleanModules = this.props.course.modules;
        }
        this.state = {
            activeModule: this.props.activeModule,
            module: {
                id: -1,
                title: "",
                lessons: []
            },
            modules: cleanModules,
            course: this.props.course,
            courseService: this.props.courseService
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            activeModule: nextProps.activeModule,
            course: nextProps.course,
            modules: nextProps.course.modules
        })
    }

    createModule = () => {
        this.state.module.id = (new Date()).getTime();
        if (this.state.module.title === "") {
            this.state.module.title = "New Module";
        }
        this.state.course.modules.push(this.state.module);
        this.setState({
            module: {
                id: (new Date()).getTime(),
                title: "",
                lessons: []
            }
        })
        this.state.courseService.updateCourse(this.state.course.id, this.state.course);
        this.props.renderAgain();
    }

    deleteModule = (id) => {
        console.log("Delete Module " + id);
        this.setState({
            modules: this.state.modules.filter(module => module.id !== id)
        })
        this.state.course.modules = this.state.course.modules.filter(moduleForMap => moduleForMap.id != id);
        this.state.courseService.updateCourse(this.state.course);
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
                <Link to={"/course-list"}>Course List </Link>
                <Link to={"/course-grid"}>Course Grid</Link>
                <h3>Module List</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-control"
                               placeholder="New Module"
                               type="text"
                               onChange={this.titleChanged}
                               value={this.state.module.title}/>
                        <button onClick={this.createModule} className="btn btn-primary btn-block">
                            Add module
                        </button>
                    </li>
                    {
                        this.state.modules.map((moduleForMap) => {
                            var classText = null;
                            console.log(moduleForMap.id);
                            if (this.state.activeModule != null && moduleForMap.id == this.state.activeModule.id) {
                                classText = "list-group-item active";
                            } else {
                                classText = "list-group-item";
                            }
                            return (<ModuleItem
                                classText={classText}
                                deleteModule={this.deleteModule}
                                moduleInput={moduleForMap} 
                                key={moduleForMap.id}
                                setActiveModule={this.props.setActiveModule}
                                title={moduleForMap.title}/>)
                        })
                    }
                </ul>
            </div>
        )
    }
}