import React, { useState, useContext } from 'react'
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { FaToilet, FaBed } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { HouseContext } from '../context/HouseContext';
import MarkerIcon from '../Logo/MarkerIcon.svg';

import MapStyles from '../utilities/MapStyles'
const APIKey = "AIzaSyDcXNX_SoIFTdYVs0QPk8e9ST6e9YwwN2c";

function Map() {
    const {houses, dispatch} = useContext(HouseContext)
    const [selectedHouse, setSelectedHouse] = useState(null);

    const MoreInfo = (e) => {
        dispatch({type:'HOUSE_INFO', dash: false, Item: selectedHouse.id})
    }
    return (
        <GoogleMap 
            defaultZoom={15}
            defaultCenter={{lat: 40.834536, lng: -74.102201}}
            defaultOptions={{styles:MapStyles}}
            onDragStart={() => setSelectedHouse(null)}
            onMouseOver={() => setSelectedHouse(null)}
            //center ={{ lat: houses.Homes.length > 1 ? houses.Homes[1].latitude : 0, lng: houses.Homes.length > 1 ? houses.Homes[1].longitude : 0 }}
        >
        {houses.Homes.map((home) => (
        <Marker
          key={home.zpid}
          position={{
            lat: home.latitude,
            lng: home.longitude
          }}
          
          onMouseOver={() => {
            setSelectedHouse(home);
          }}
          icon={{
            url: MarkerIcon,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
         ))}
         {selectedHouse && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedHouse(null);
          }}

          position={{
            lat: selectedHouse.latitude,
            lng: selectedHouse.longitude
          }}
        >
        <div
          onMouseLeave={() => {
            setSelectedHouse(null);
          }}
            onClick = {(e) => MoreInfo(e)}
            className = "MapInfo">

            <img src={selectedHouse.images[0]} alt={""}/>
            <div>
                <h1>{selectedHouse.street}</h1>
                <h1>${selectedHouse.rent}</h1>
                <ul>
                    <li><FaBed style ={Iconsbed}/> {selectedHouse.bedrooms}</li>
                    <li><FaToilet style ={Iconsto}/> {selectedHouse.bathrooms}</li>
                </ul>
            </div>
        </div>
        </InfoWindow>)}
        </GoogleMap>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map))
export default function GMap () {
  const {houses, dispatch} = useContext(HouseContext)

  let DisplayClose = "flex";

  DisplayClose = !houses.Display.DashBoard ? DisplayClose = "flex" : DisplayClose = "none" 

  let CloseButton = {
    display: DisplayClose,
    
  }
  const OpenDash = () => {
    dispatch({type:'HOUSE_INFO', dash: true, Item: 0})
  }
    return (
        <div className="GMap">
          <div className="HouseInfo-close" style={CloseButton} onClick={() => OpenDash()}>
            <AiOutlineDoubleRight style={CloseIcon} />
          </div>
          <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
    );
}
const CloseIcon = {
  style: { verticalAlign: 'middle' },
  padding: '0 0.2em 0 0.2em',
  width: '1.3rem',
  height: '1.3rem',
  color: 'rgb(77, 93, 93)'
}
const Iconsbed = {
    style: { verticalAlign: 'middle' },
    padding: '0 0.2em 0 0.2em',
    width: '1.3rem',
    height: '0.9rem',
    color: '#a3abab',
}
const Iconsto = {
  style: { verticalAlign: 'middle' },
  padding: '0 0.2em 0 0.2em',
  width: '1.1rem',
  height: '1.1rem',
  color: '#a3abab',
}
