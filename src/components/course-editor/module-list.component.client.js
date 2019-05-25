import React from 'react';
import ModuleItem from './module-item.component.client';
import {Link} from 'react-router-dom';

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        var cleanModules = [];
        if (this.props.course.modules != null) {
            cleanModules = this.props.course.modules;
        }
        this.updateModule = this.updateModule.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.state = {
            activeModule: this.props.activeModule,
            module: {
                id: -1,
                title: "",
                lessons: []
            },
            modules: cleanModules,
            moduleUpdater: {
                id: -1,
                title: "",
                lessons: []
            },
            course: this.props.course,
            courseService: this.props.courseService,
            moduleToUpdateId: -1
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
        this.setState({
            modules: this.state.modules.filter(module => module.id !== id)
        })
        this.state.course.modules = this.state.course.modules.filter(moduleForMap => moduleForMap.id != id);
        this.state.courseService.updateCourse(this.state.course);
    }

    submitUpdate = () => {
        console.log(this.state.moduleUpdater.title);
        console.log(this.state.moduleUpdater.id);
        var newModuleList = this.state.modules.map(moduleItem => {
            if (this.state.moduleUpdater.id === moduleItem.id) {
                return {
                    id: moduleItem.id,
                    title: this.state.moduleUpdater.title,
                    lessons: moduleItem.lessons
                };
            } else {
                return moduleItem;
            }
        })

        var newCourse = {
            id: this.state.course.id,
            title: this.state.course.title,
            modules: newModuleList
        }
        console.log(newCourse);
        this.state.moduleUpdater.id = -1;

        this.state.courseService.updateCourse(newCourse.id, newCourse);
        this.props.renderAgain();
        this.setState({
            moduleUpdater: {
                id: -1,
                title: "",
                lessons: []
            },
            modules: newModuleList
        })

        this.setState({
            state: this.state
        })
    }

    titleChanged = (event) => {
        this.setState ({
            module: {
                title: event.target.value,
                id: (new Date()).getTime(),
                lessons: this.state.module.lessons
            }
        })
    }

    updateModule = (moduleItem) => {
        this.setState({
            moduleUpdater: {
                id: moduleItem.id,
                title: moduleItem.title,
                lessons: moduleItem.lessons
            }
        })
    }

    updateTitleChanged = (event) => {
        this.setState ({
            moduleUpdater: {
                title: event.target.value,
                id: this.state.moduleUpdater.id,
                lessons: this.state.moduleUpdater.lessons
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
                            if (this.state.activeModule != null && moduleForMap.id == this.state.activeModule.id) {
                                classText = "list-group-item active";
                            } else {
                                classText = "list-group-item";
                            }
                            return (<ModuleItem
                                classText={classText}
                                deleteModule={this.deleteModule} 
                                key={moduleForMap.id}
                                moduleInput={moduleForMap}
                                moduleToUpdateId={this.state.moduleUpdater.id}
                                setActiveModule={this.props.setActiveModule}
                                submitUpdate={this.submitUpdate}
                                title={moduleForMap.title}
                                updateModule={this.updateModule}
                                updateTitle={this.state.moduleUpdater.title}
                                updateTitleChanged={this.updateTitleChanged}/>)
                        })
                    }
                </ul>
            </div>
        )
    }
}