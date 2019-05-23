import React from 'react'

export default class TopicPills extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHelper() {
        if (this.props.activeLesson != null && this.props.activeLesson.topics != null) {
            return this.props.activeLesson.topics.map((topic) => {
                if (topic === this.props.activeTopic) {
                    return (<li className="nav-item">
                        <a className="nav-link active" href="#" onClick={() => this.props.setActiveTopic(topic)}>{topic.title}</a>
                    </li>)
                } else {
                    return (<li>
                        <a className="nav-link" href="#" onClick={() => this.props.setActiveTopic(topic)}>{topic.title}</a>
                    </li>)
                }
            })
        } else {
            return (<li className="nav-item">
                        <a className="nav-link disabled">No Topics</a>
                    </li>)
        }
    }

    render() {
        return(
            <ul className="nav nav-pills">
                {this.renderHelper()}
            </ul>
        )
    }
}