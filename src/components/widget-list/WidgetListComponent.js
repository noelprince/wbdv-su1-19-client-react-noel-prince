import React from 'react'
import WidgetListItem from './WidgetListItem'

export default class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.switchPreview = this.switchPreview.bind(this);
        this.shiftUp = this.shiftUp.bind(this);
        this.shiftDown = this.shiftDown.bind(this);
        this.shiftHelper = this.shiftHelper.bind(this);
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

    shiftUp(lowerWidget) {
        var ind = -1;
        this.props.widgets.map((widgetMapItem, index) => {
            if (widgetMapItem.id === lowerWidget.id) {
                ind = index
            }
        })
        console.log("index " + ind);
        var upperWidget = this.props.widgets[ind - 1];
        this.shiftHelper(lowerWidget, upperWidget);
    }

    shiftDown(upperWidget) {
        var ind = -1;
        this.props.widgets.map((widgetMapItem, index) => {
            console.log(upperWidget.id);
            console.log(widgetMapItem.id);
            if (widgetMapItem.id === upperWidget.id) {
                ind = index
            }
        })
        console.log("index " + ind);
        var lowerWidget = this.props.widgets[ind + 1];
        console.log(lowerWidget)
        this.shiftHelper(lowerWidget, upperWidget);
    }

    shiftHelper(lowerWidget, upperWidget) {
        console.log(lowerWidget.id)
        console.log(upperWidget.id)
        var upperId = upperWidget.id;
        var lowerId = lowerWidget.id;
        lowerWidget = {
            ...lowerWidget,
            id: new Date().getTime()
        }
        upperWidget = {
            ...upperWidget,
            id: new Date().getMilliseconds()
        }
        this.props.updateWidget(lowerId, upperWidget);
        this.props.updateWidget(upperId, lowerWidget);
    }

    render() {
        return (<div>
                    <h1>Widget List {this.props.widgets.length}</h1>
                    <ul className="list-group">
                        <li>
                            <button className="btn btn-warning" onClick={this.switchPreview}>Preview</button>
                            <button className="btn btn-success" onClick={this.props.createWidget}>Add Widget</button>
                        </li>
                        {
                            this.props.widgets.map((widget, index) =>
                                <WidgetListItem
                                    key={widget.id}
                                    createWidget={this.props.createWidget}
                                    deleteWidget={this.props.deleteWidget}
                                    index={index}
                                    lengthVal={this.props.widgets.length}
                                    preview={this.state.preview}
                                    shiftDown={this.shiftDown}
                                    shiftUp={this.shiftUp}
                                    updateWidget={this.props.updateWidget}
                                    widget={widget}/>
                            )
                        }
                    </ul>
                    <button onClick={this.props.createWidget} className="btn btn-success">Create</button>
                </div>)
    }
}