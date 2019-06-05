import React from 'react';
import './Item.css';

const ListItem = ({changeListItemsTypeVal, changeTextVal, changeWidgetNameVal, genButtonBar, genList, listItemsTypeVal, preview, textVal, widgetNameVal}) => {
    return (<li className="list-group-item">
        <div className="container bordered-item">
            {!preview &&
                <div>
                    {genButtonBar}
                    <div className="row">
                        <input className="form-control"
                            onChange={changeTextVal}
                            placeholder="List Items"
                            type="text"
                            value={textVal}>
                        </input>
                    </div>
                    <div className="row">
                            <select className="form-control" onChange={changeListItemsTypeVal} value={listItemsTypeVal}>
                                <option value="ORDERED">Ordered List</option>
                                <option value="UNORDERED">Unordered List</option>
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
                </div>}
            <h1>Preview</h1>
            {genList}
        </div>
    </li>)
}

export default ListItem;