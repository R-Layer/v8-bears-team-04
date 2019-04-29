import React, {useState} from 'react';

import Tabs from '../components/tabs/Tabs';
import LeafletMap from '../components/interactive-map/LeafletMap';

import '../components/interactive-map/interactive-map.scss';

function Main() {

    const littleton = {latlng: [39.61, -105.02], title: 'Littleton'}
    const denver = {latlng:[39.74, -104.99], title: 'Denver'}
    const aurora = {latlng: [39.73, -104.8], title: 'Aurora'}
    const golden = {latlng: [39.77, -105.23], title: 'Golden'}
    const defaultMarkers = [littleton, denver, aurora, golden];

    let [markers, setMarker] = useState(defaultMarkers);
    let [locationToFind, setLocationToFind] = useState([39.75, -105]);
    
    function addLocation(marker) {
        markers = [...markers, marker];
        setMarker(markers);
    };

    function findLocation(coords) {
        setLocationToFind(coords);
    };

    return (
        <div className="map-wrapper">
            <LeafletMap
                markersData={markers}
                locationToFind={locationToFind}
            />
            <Tabs 
                addLocation={addLocation} 
                findLocation={findLocation}
            />
        </div>
    );
};

export default Main;