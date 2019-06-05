import React from 'react'
import {Button} from 'react-bootstrap';
import './Item.css';

const ImageItem = ({changeTextVal, changeWidgetNameVal, genButtonBar, textVal, widgetNameVal}) => {
    return (<li className="list-group-item">
        <div className="container bordered-item">
            {genButtonBar}
            <div className="row">
                <input className="form-control"
                    onChange={changeTextVal}
                    placeholder="Image URL"
                    type="text"
                    value={textVal}>
                </input>
            </div>
            <div className="row">
                <input className="form-control"
                    onChange={changeWidgetNameVal}
                    placeholder="Widget Name"
                    type="text"
                    value={widgetNameVal}>
                </input>
            </div>
            <img src={textVal}/>
        </div>
    </li>)
}


export default ImageItem;