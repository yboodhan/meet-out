import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({text}: any) => <div>{text}</div>;

const DisplayMap = (props: any) => {

    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    const mapKeys: string = `${process.env.REACT_APP_GOOGLE_MAP}`
    return (


        <div style={{ height: '25vh', width: '25vw' }}>
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