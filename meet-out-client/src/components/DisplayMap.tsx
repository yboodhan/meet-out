import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import {MeetForCalendar} from './Content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'

const Marker = ({text}: any) => <FontAwesomeIcon size="lg" icon={faMapMarker}/>;

interface DisplayMapProps {
    currentMeet: MeetForCalendar | null
}

const DisplayMap: React.FC<DisplayMapProps> = props => {
    // UNCOMMENT THIS WHEN PASSED LAT AND LONG FROM BACK END:
    let center = {lat: props.currentMeet ? props.currentMeet.activity.locations.lat : 0, lng: props.currentMeet ? props.currentMeet.activity.locations.long : 0 }
    // let center = {lat: props.currentMeet ? props.currentMeet.activity.locations.lat : 0, lng: props.currentMeet ? props.currentMeet.activity.locations.long : 0 }
    console.log(center)
    let zoom = 12
    let mapKeys: string = `${process.env.REACT_APP_GOOGLE_MAP}`

    // JUST LEAVE THIS AS COMMENT:
    // let center
    // let x
    // let y

    // axios.get(GEO_URL + `${props.currentMeet ? props.currentMeet.activity.locations.address.split(' ').join('+'): ''}` + 
    // `&city=${props.currentMeet ? props.currentMeet.activity.locations.city : ''}&state=${props.currentMeet ? props.currentMeet.activity.locations.state: ''}&zip=${props.currentMeet ? props.currentMeet.activity.locations.zip: ''}` + 
    // `&benchmark=Public_AR_Census2010&format=json`)
    // // Receives a response from the API call
    // .then(function(apiResponse: any){
    //     // Assigns x & y to the lat & long kicked back off the API
    //     x = apiResponse.data.result.addressMatches[0].coordinates.x
    //     y = apiResponse.data.result.addressMatches[0].coordinates.y
    //     center = {lat: x, lng: y }
    //     console.log('center', center)
    // })

    console.log(props.currentMeet)
    return (
        <div style={{ height: '25vh', width: '25vw' }}>
            <br />
            <GoogleMapReact
                bootstrapURLKeys={{ key: mapKeys }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={props.currentMeet ? props.currentMeet.activity.locations.lat : 0}
                    lng={props.currentMeet ? props.currentMeet.activity.locations.long : 0}
                    // lat={11}
                    // lng={11}
                    text="Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default DisplayMap;