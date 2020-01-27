import React from 'react'

const NewTest: React.FC = () => {

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="new">New Test:</label>
                <input type="text" id="new"></input>
            </div>
            <button type="submit">SUBMIT</button>
        </form>
    )
}

export default NewTest