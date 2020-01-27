import React from 'react'

interface TesterProps {
    items: {id: string, text: string}[]
}

const Tester: React.FC<TesterProps> = props => {
    return (
        <ul>
            {props.items.map( test => (
                <li key={test.id}>{test.text}</li>
            ))}
        </ul>
    )
}

export default Tester