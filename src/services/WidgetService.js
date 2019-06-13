const url = "http://localhost:8080/api/widgets"
//const url = "https://a3-java-noel-prince.herokuapp.com/api/widgets"


export default class WidgetService {
    static myInstance = null;
    static getInstance() {
        if (WidgetService.myInstance == null) {
            WidgetService.myInstance =
                new WidgetService();
        }
        return this.myInstance;
    }

    createWidget = widget => {
        console.log(widget)
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(widget),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    findAllWidgets = () =>
        fetch(url)
            .then(response => response.json())

    /*findWidgetById = widgetId => {
        return widgets.find(widget => widget.id == widgetId)
    }*/

    deleteWidget = widgetId =>
        fetch(`${url}/${widgetId}`, {
            method: 'DELETE'
        }).then(response => response.json())
        
    updateWidget = (wid, newWidget) => {
        return (fetch(`${url}/${wid}`, {
            method: 'PUT',
            body: JSON.stringify(newWidget),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()))
    }
}