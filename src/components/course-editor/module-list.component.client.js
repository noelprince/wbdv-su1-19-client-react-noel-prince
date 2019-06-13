import React from 'react';
import ModuleItem from './module-item.component.client';
import {Link} from 'react-router-dom';
import ModuleService from '../../services/ModuleService';

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        var cleanModules = [];
        if (this.props.course != null && this.props.course.modules != null) {
            cleanModules = this.props.course.modules;
        }
        const moduleService = new ModuleService();
        console.log(this.props.course.id)
        /*moduleService.findAllModules(this.props.course.id)
            .then(modules => {
                console.log(modules);
                this.setState({
                    modules: modules
                })
            })*/
        this.updateModule = this.updateModule.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        console.log(this.props.activeModule)
        this.state = {
            activeModule: this.props.activeModule,
            module: {
                id: -1,
                title: "",
                lessons: []
            },
            modules: [],
            moduleUpdater: {
                id: -1,
                title: "",
                lessons: []
            },
            course: this.props.course,
            courseService: this.props.courseService,
            moduleService: new ModuleService(),
            moduleToUpdateId: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.moduleService.findAllModules(nextProps.course.id != null ? nextProps.course.id : this.state.course.id)
            .then(modules => {
                this.setState({
                    activeModule: nextProps.activeModule,
                    modules: modules
                })
            })
    }

    createModule = () => {
        if (this.state.module.title === "") {
            this.state.module.title = "New Module";
        }
        var newModule = this.state.module;
        //newModule.course_id = this.props.course.id;
        //newModule.course = this.props.course;
        //this.state.course.modules.push(this.state.module);
        this.setState({
            module: {
                title: "",
                lessons: []
            }
        })
        //this.state.courseService.updateCourse(this.state.course.id, this.state.course);
        this.state.moduleService.createModule(this.props.course.id, newModule)
            .then(modules => {
                this.setState({
                    modules: modules
                })
                this.props.newModuleCreated(modules)
            })
    }

    deleteModule = (id) => {
        this.state.moduleService.deleteModule(id, this.props.course.id)
            .then(modules => {
                this.setState({
                    modules:modules
                })
            })
    }

    submitUpdate = () => {
        this.state.moduleService.updateModule(this.state.moduleUpdater.id, this.props.course.id, this.state.moduleUpdater)
            .then(modules => {
                this.setState({
                    modules:modules
                })
            })
        this.state.moduleUpdater = {
            id: -1,
            title: "",
            lessons: []
        }
        /*var newModuleList = this.state.modules.map(moduleItem => {
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
        })*/
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
                <Link to={"/"}>Course List </Link>
                <Link to={"/course-grid"}>Course Grid</Link>
                <h3>Module List</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-control"
                               placeholder="New Module"
                               type="text"
                               onChange={this.titleChanged}
                               value={this.state.module.title != null ? this.state.module.title : ""}/>
                        <button onClick={this.createModule} className="btn btn-primary btn-block">
                            Add module
                        </button>
                    </li>
                    {console.log(this.state.modules)}
                    {
                        this.state.modules&&this.state.modules.map((moduleForMap) => {
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