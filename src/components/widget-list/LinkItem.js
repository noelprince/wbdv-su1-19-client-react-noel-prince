import React from 'react'
import {Button} from 'react-bootstrap';
import './Item.css';

const LinkItem = ({changeTextVal, changeWidgetNameVal, genButtonBar, preview, textVal, widgetNameVal}) => {
    return (<li className="form-group-item">
        <div className="container bordered-item">
            {!preview &&
                <div>
                    {genButtonBar}
                    <div className="row">
                        <input className="form-control"
                            onChange={changeTextVal}
                            placeholder="Link URL"
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
                </div>}
            <h1>Preview</h1>
            <a href={textVal}/>
        </div>
    </li>)
}

export default LinkItem;