import React from 'react'
import './Item.css';

const HeadingItem = ({changeHeadSizeVal, changeHeadTextVal, changeWidgetNameVal, determineHeading, genButtonBar, headSizeVal, headTextVal, widgetNameVal}) => {
    return (
        <li className="list-group-item">
            <div className="container bordered-item">
                {genButtonBar}
                <div className="row">
                    <input className="form-control"
                        onChange={changeHeadTextVal}
                        placeholder="Heading Text"
                        type="text"
                        value={headTextVal}>
                    </input>
                </div>
                <div className="row">
                    <select className="form-control" onChange={changeHeadSizeVal} value={headSizeVal}>
                        <option value="HEADING1">Heading 1</option>
                        <option value="HEADING2">Heading 2</option>
                        <option value="HEADING3">Heading 3</option>
                        <option value="HEADING4">Heading 4</option>
                        <option value="HEADING5">Heading 5</option>
                        <option value="HEADING6">Heading 6</option>
                    </select>
                </div>
                <div className="row">
                    <input className="form-control"
                        onChange={changeWidgetNameVal}
                        placeholder="Widget Name"
                        type="text"
                        value={widgetNameVal}>
                    </input>
                </div>
                <h1>Preview</h1>
                {determineHeading}
            </div>
        </li>
    )
}

export default HeadingItem