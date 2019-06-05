import React from 'react';
import './Item.css';

const ParagraphItem = ({changeTextVal, changeWidgetNameVal, genButtonBar, preview, textVal, widgetNameVal}) => {
    return (
        <li className="list-group-item">
            <div className="container bordered-item">
                {!preview &&
                    <div>
                        {genButtonBar}
                        <div className="row">
                            <input className="form-control"
                                onChange={changeTextVal}
                                placeholder="Paragraph Text"
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
                <p>{textVal}</p>
            </div>
        </li>
    )
}

export default ParagraphItem;