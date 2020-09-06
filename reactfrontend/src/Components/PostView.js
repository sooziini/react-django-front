// rcc

import React, { Component } from 'react'

const dummy_prop = {
    title: 'Test Title',
    content: 'Test Content',
}

export default class PostView extends Component {
    render() {
        const {id, title, content} = this.props
        return (
            <div>
                No.{id}
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        )
    }
}