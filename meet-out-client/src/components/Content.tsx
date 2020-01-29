import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Decoded } from '../App'
import User from '../../../meet-out-server/src/models/user'

//Components
import Signup from './Signup'
import Userhome from './Userhome'
import Profile from './Profile'
import EditProfile from './EditProfile'
import { PromiseProvider } from 'mongoose'

// Props
interface ContentProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const allMeets = [
    {
      id: 0,
      title: 'TEST EVENT',
      start: new Date(2020, 0, 28, 10),
      end: new Date(2020, 0, 28, 11),
      activity: {name: 'running'}
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2020, 0, 9),
      end: new Date(2020, 0, 12),
      activity: {name: 'biking'}
    }]

    export interface TMeets {
        date: Date;
        starttime: Date;
        endtime: Date;
        description: string;
        users: User[];
        activity: { name: string;
            locations: {
            name: string;
            address: string;
            city: string;
            state: string;
            zip: number;
            lat: number;
            long: number;
            }[]
        }
    }

    interface getResults {
        data: TMeets[]
    }


        
const Content: React.FC<ContentProps> = props => {
    

    // State variables
    let [allMeets , setAllMeets] = useState<TMeets[]>([])

    

    useEffect(() => {
        // Fetch meets from get route
            fetch(`${process.env.REACT_APP_SERVER_URL}/meet`)
            .then(response => {
                response.json()
                .then((results: getResults) => {
                    console.log('🌈🌈', results, '👻👻', response)
                    let allMeets = results.data.map(data => {
                        return data
                    })
                    setAllMeets(allMeets)
                })
                .catch( (err: Error) => {
                    console.log('Error', err)
                })
            })
            .catch( (err: Error) => {
                console.log('Error', err)
            })
        
        }, [])


    return (
        <div className="content-container">
            <Route exact path="/" render={
                () => <Signup user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/profile" render={
                () => <Profile user={props.user} />
            } />
            <Route path="/home" render={
                () => <Userhome allMeets={allMeets} />
            }/>
            <Route path="/profile/edit" render={
                () => <EditProfile user={props.user}/>
            }/>
        </div>
    )
}

export default Content