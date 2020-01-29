import React from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Container } from 'reactstrap';

interface EditProfileProps {
    user: Decoded | null
}

const EditProfile: React.FC<EditProfileProps> = props => {
    return (
        <div>{props.user}</div>
    )
}

export default EditProfile