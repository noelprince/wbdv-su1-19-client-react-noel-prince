import React from 'react'
import HeadingItem from './HeadingItem'
import ParagraphItem from './ParagraphItem'
import ListItem from './ListItem'
import ImageItem from './ImageItem'
import LinkItem from './LinkItem'
import {Button} from 'react-bootstrap';
import './WidgetListItem.css'

/**
 * Keeping this as a stateful class so I can cache the small changes that are made on the browser til a save button is pressed
 */
export default class WidgetListItem extends React.Component {
    constructor(props) {
        super(props);
        //keeping track of state for allowing easy maintenance of whether editing state is occurring or not
        this.determineHeading = this.determineHeading.bind(this);
        this.genList = this.genList.bind(this);
        this.genListHelper = this.genListHelper.bind(this);
        this.state = {
            editing: false,
            headSizeVal: this.props.widget.size != null ? this.props.widget.size : "",
            listItemsTypeVal: this.props.widget.listItemsType != null ? this.props.widget.listItemsType : "",
            textVal: this.props.widget.titleText != null ? this.props.widget.titleText: "",
            typeVal: this.props.widget.type != null ? this.props.widget.type : "",
            widgetNameVal: this.props.widget.name
        }
    }

    changeHeadSizeVal = (event) => {
        this.setState({
            headSizeVal: event.target.value
        })
    }

    changeListItemsTypeVal = (event) => {
        this.setState({
            listItemsTypeVal: event.target.value
        })
    }

    changeTextVal = (event) => {
        this.setState({
            textVal: event.target.value
        })
    }

    changeWidgetNameVal = (event) => {
        this.setState({
            widgetNameVal: event.target.value
        })
    }

    determineHeading = () => {
        var returnValue = null;
        switch(this.state.headSizeVal) {
            case "HEADING1":
                returnValue = <h1>{this.state.textVal}</h1>
                break;
            case "HEADING2":
                returnValue = <h2>{this.state.textVal}</h2>
                break;
            case "HEADING3":
                returnValue = <h3>{this.state.textVal}</h3>
                break;
            case "HEADING4":
                returnValue = <h4>{this.state.textVal}</h4>
                break;
            case "HEADING5":
                returnValue = <h5>{this.state.textVal}</h5>
                break;
            default:
                returnValue = <h6>{this.state.textVal}</h6>
                break;
        }
        return returnValue;
    }

    genButtonBar = (widgetType) => {
        return <div className="row">
            <h1 className="col-lg-7 col-md-6">{widgetType}</h1>
            <Button variant="warning col-md-1 col-sm-1">Shift Up</Button>
            <Button variant="warning col-md-1 col-sm-1">Shift Down</Button>
            <Button onClick={this.saveWidget} variant="success col-md-1">Save</Button>
            <Button onClick={() => this.props.deleteWidget(this.props.widget.id)} variant="danger col-md-1">Delete</Button>
        </div>
    }

    genList = () => {
        var help = this.genListHelper();
        if (this.state.listItemsTypeVal === "ORDERED") {
            return (<ol>
                {help}
            </ol>)
        } else if (this.state.listItemsTypeVal === "UNORDERED") {
            return (<ul>
                {help}
            </ul>)
        }
    }

    genListHelper = () => {
        return this.state.textVal.split("\n").map((listItem, index) => 
            <li key={index}>{listItem}</li>)
    }

    saveWidget = () => {
        var newWidget = {
            id: this.props.widget.id,
            listItemsType: this.state.listItemsTypeVal,
            name: this.state.widgetNameVal,
            size: this.state.headSizeVal,
            titleText: this.state.textVal,
            type: this.state.typeVal
        }

        this.props.updateWidget(newWidget);
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        switch(this.props.widget.type) {
            case "HEADING":
                return (<HeadingItem 
                    key={this.props.widget.id}
                    changeHeadSizeVal={this.changeHeadSizeVal}
                    changeHeadTextVal={this.changeTextVal}
                    changeWidgetNameVal={this.changeWidgetNameVal}
                    determineHeading={this.determineHeading()}
                    genButtonBar={this.genButtonBar("Heading Widget")}
                    headSizeVal={this.state.headSizeVal}
                    headTextVal={this.state.textVal}
                    preview={this.props.preview}
                    widgetNameVal={this.state.widgetNameVal}/>);
            case "PARAGRAPH":
                return(<ParagraphItem
                    key={this.props.widget.id}
                    changeTextVal={this.changeTextVal}
                    changeWidgetNameVal={this.changeWidgetNameVal}
                    deleteWidget={this.props.deleteWidget}
                    genButtonBar={this.genButtonBar("Paragraph Widget")}
                    preview={this.props.preview}
                    textVal={this.state.textVal}
                    widgetNameVal={this.state.widgetNameVal}/>)
            case "LIST":
                return(<ListItem
                    key={this.props.widget.id}
                    changeListItemsTypeVal={this.changeListItemsTypeVal}
                    changeTextVal={this.changeTextVal}
                    changeWidgetNameVal={this.changeWidgetNameVal}
                    deleteWidget={this.props.deleteWidget}
                    genButtonBar={this.genButtonBar("List Widget")}
                    genList={this.genList()}
                    listItemsTypeVal={this.state.listItemsTypeVal}
                    preview={this.props.preview}
                    textVal={this.state.textVal}
                    widgetNameVal={this.state.widgetNameVal}/>)
            case "LINK":
                return(<LinkItem
                    key={this.props.widget.id}
                    changeTextVal={this.changeTextVal}
                    changeWidgetNameVal={this.changeWidgetNameVal}
                    deleteWidget={this.props.deleteWidget}
                    genButtonBar={this.genButtonBar("Link Widget")}
                    textVal={this.state.textVal}
                    widgetNameVal={this.state.widgetNameVal}/>)
            case "IMAGE":
                return(<ImageItem
                    key={this.props.widget.id}
                    changeTextVal={this.changeTextVal}
                    changeWidgetNameVal={this.changeWidgetNameVal}
                    deleteWidget={this.props.deleteWidget}
                    genButtonBar={this.genButtonBar("Image Widget")}
                    textVal={this.state.textVal}
                    widgetNameVal={this.state.widgetNameVal}/>)
            default:
                return (<h1>RIP</h1>)
        }
            // <li key={this.props.widget.id}>
            //     {this.props.widget.name}
            //     <span>
            //     <button onClick={() => this.props.deleteWidget(this.props.widget.id)}>
            //         Delete
            //     </button>
            //         {!this.state.editing &&
            //             <button onClick={this.toggleEditing}>
            //                 Edit
            //             </button>}
            //         {this.state.editing &&
            //                 <select 
            //                     onChange={(event) => this.props.updateWidget({
            //                         ...this.props.widget,
            //                         type: event.target.value
            //                     })}
            //                     value={this.props.widget.type}>
            //                     <option value="HEADING">Heading</option>
            //                     <option value="PARAGRAPH">Paragraph</option>
            //                     <option value="LIST">List</option>
            //                     <option value="LINK">Link</option>
            //                     <option value="IMAGE">Image</option>
            //                 </select>}
            //         {this.state.editing &&
            //             <button onClick={this.toggleEditing}>
            //                 Done
            //             </button>}
            //     </span>
            //         </li>
    }
}