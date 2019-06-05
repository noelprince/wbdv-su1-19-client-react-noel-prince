import WidgetService from '../services/WidgetService'
const service = WidgetService.getInstance();
let widgets = service.findAllWidgets();
console.log(widgets)

const WidgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
        case "DELETE_WIDGET":
        case "FIND_ALL_WIDGETS":
            return {
                widgets: action.widgets
            }
        default:
            return state;
    }
}

export default WidgetReducer;