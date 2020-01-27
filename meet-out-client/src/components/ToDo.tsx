import React from 'react'

interface ToDoProps {
    items: {id: string, text: string}[]
}

const ToDo: React.FC<ToDoProps> = props => {

    return (
        <div>
            <li>{props.items[0].id}{props.items[0].text}</li>
        </div>
    )
}

export default ToDo