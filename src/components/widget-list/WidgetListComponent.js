import React from 'react'
import WidgetListItem from './WidgetListItem'
import HeadingItem from './HeadingItem'

export default class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
        this.state = {
            preview: false
        }
    }

    switchPreview() {
        this.setState({
            preview: !this.state.preview
        })
    }

    render() {
        return (<div>
                    <h1>Widget List {this.props.widgets.length}</h1>
                    <ul className="list-group">
                        <li>
                            <button className="btn btn-warning" onClick={this.preview}>Preview</button>
                            <button className="btn btn-success" onClick={this.props.createWidget}>Add Widget</button>
                        </li>
                        {
                            this.props.widgets.map(widget =>
                                <WidgetListItem
                                    key={widget.id}
                                    createWidget={this.props.createWidget}
                                    deleteWidget={this.props.deleteWidget}
                                    preview={this.state.preview}
                                    updateWidget={this.props.updateWidget}
                                    widget={widget}/>
                            )
                        }
                    </ul>
                    <button onClick={this.props.createWidget}>Create</button>
                </div>)
    }
}