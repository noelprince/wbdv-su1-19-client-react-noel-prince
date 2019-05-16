import React from 'react'
import ModuleItem from './ModuleItem'

export default class ModuleList extends React.Component {
    render() {
        return(
            <div>
                <h3>Module List</h3>
                <ul className="list-group">
                    <ModuleItem title="HTML"/>
                    <ModuleItem title="JavaScript"/>
                    <ModuleItem title="React"/>
                    <ModuleItem title="Node.js"/>
                    <ModuleItem title="Bootstrap"/>
                    <ModuleItem title="Angular"/>
                </ul>
            </div>
        )
    }
}