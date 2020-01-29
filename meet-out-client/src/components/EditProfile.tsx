import React from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../App'
import { Button, Container } from 'reactstrap';

interface EditProfileProps {
    user: Decoded | null
}

const EditProfile = () => {
    return (
        <div>Edit Profile Stub</div>
    )
}

export default EditProfile