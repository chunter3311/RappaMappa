import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import theme from '../assets/style/mapTheme';
import RapperMarker from './RapperMarker';
import { connect } from "react-redux";
import  {getRappers} from '../store/rappers';
import RapperInfoBox from './RapperInfoBox';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
const Map = withScriptjs(withGoogleMap((props) => {
    return ( 
        <GoogleMap
            defaultZoom={11}
            center={props.focusLocation}
            defaultOptions={{ styles: theme }}
        >
            {props.rappers.map((rapper) => {
            return <RapperMarker {...rapper} key={rapper.recordid} />;
            })}
            {props.activeRapper && (
            //NOTE: Added hidden Marker with InfoBox to force it to occur in correct location dynamically
            // seems to be some problem with API, not allowing dynamic positioning of Infobox  
            //also had to add icon of no size Marker to force nothing to show up
            <Marker
                position={{
                lat: props.activeRapper.fields.location_coordinates[0],
                lng: props.activeRapper.fields.location_coordinates[1],
                }}
                icon={{
                url: "/img/map-icon.png",
                scaledSize: new window.google.maps.Size(1, 1),
                }}
            >
                <RapperInfoBox {...props.activeRapper} />
            </Marker>
            )}
            <AboutModal/>
            <ContactModal/>
        </GoogleMap>
    
    ); 
})
);

const mapStateToProps = (state) => {
    //default location
    let focusLocation = {
      lat: 40.844,
      lng: -73.8648,
    };
    if(state.rappers.refocusLocation){
        focusLocation = state.rappers.refocusLocation;
    }
    return {
        activeRapper: state.rappers.activeRapper,
        focusLocation
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRappers: () => dispatch(getRappers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
