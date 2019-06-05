import React from 'react'
import WidgetListComponent from '../components/widget-list/WidgetListComponent'
import {connect} from 'react-redux'
import WidgetService from '../services/WidgetService'
const widgetService = WidgetService.getInstance()


const stateToPropertyMapper = state => ({
    widgets: state.widgets
})

const propertyToDispatchMapper = dispatch => ({
    createWidget: () =>
        widgetService
            .createWidget({
                id: (new Date()).getTime(),
                listItemsType: '',
                name: 'New Widget',
                size: 'HEADING1',
                titleText: 'Fun',
                type: 'HEADING'
            })
            .then(widgets =>
                dispatch({
                    type: 'CREATE_WIDGET',
                    widgets: widgets
            })),
    deleteWidget: widgetId =>
        widgetService
            .deleteWidget(widgetId)
            .then(widgets => dispatch({type: 'DELETE_WIDGET', widgets: widgets})),
    findAllWidgets: () =>
        widgetService
            .findAllWidgets()
            .then(widgets => dispatch({type: 'FIND_ALL_WIDGETS', widgets: widgets})),
    updateWidget: (widget) =>
        widgetService
            .updateWidget(widget)
            .then(widgets =>
                dispatch({
                    type: 'CREATE_WIDGET',
                    widgets: widgets
            }))
    
})

const WidgetListContainer = connect(
    stateToPropertyMapper,
    propertyToDispatchMapper)
    (WidgetListComponent)

export default WidgetListContainer