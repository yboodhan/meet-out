import React from 'react'
import { Decoded } from '../App'

// Props
interface ProfileProps {
    user: Decoded | null
}

const Profile: React.FC<ProfileProps> = props => {
    return (
        <div>PROFILE STUB</div>
    )
}

export default Profile