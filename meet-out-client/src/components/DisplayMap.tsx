import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import {MeetForCalendar} from './Content'

const Marker = ({text}: any) => <div>{text}</div>;

interface DisplayMapProps {
    currentMeet: MeetForCalendar | null
}

const DisplayMap: React.FC<DisplayMapProps> = props => {

    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(15);
    const mapKeys: string = `${process.env.REACT_APP_GOOGLE_MAP}`
    return (


        <div style={{ height: '30vh', width: '30vw' }}>
            <br />
            <GoogleMapReact
                bootstrapURLKeys={{ key: mapKeys }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={11.0168}
                    lng={76.9558}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default DisplayMap;

// title: string,
// creator: string,
// private: boolean,
// date: Date,
// start: Date,
// starttime?: Date,
// endtime?: Date,
// end: Date,
// description: string,
// users: User[],
// activity: {
//     name: string,
//     locations: {
//         name: string;
//         address: string;
//         city: string;
//         state: string;
//         zip: number;
//         lat: number;
//         long: number;
//     }
// },
// myPrivateMeet: boolean,
// myPublicMeet: boolean,
// attending: boolean