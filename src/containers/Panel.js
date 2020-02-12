import React, { Fragment } from 'react';
import isEmpty from 'lodash.isempty';
import styled from "styled-components";

import Marker from '../components/Marker';
import GoogleMap from '../components/GoogleMap';
import AutoComplete from '../components/AutoComplete';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [
        { 
          name: "123 Santa Monica Blvd",
          lat: 34.015312700339145,
          lng: -118.49679203748019,
          person: "Ralph Wright",
          notes: "High school friend",
          id: 0
        },
        { 
          name: "45 West Hollywood Hills Road",
          lat: 34.11305045979675,
          lng: -118.38625069308416,
          person: "Bill Murray",
          notes: "A really nice guy",
          id: 1
        },
        { 
          name: "1 N Venice Blvd",
          lat: 33.97835947741192,
          lng: -118.46591366087071,
          person: "Mary Michaels",
          notes: "Met at running club",
          id: 2
        },
      ],
      person: "",
      notes: ""
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState(prevState => ({
      places: [...prevState.places, place]
    }));
    this.openForm(place)
  };

  addClickedPlace = (e) =>  {
    let clickedPlace = { 
      name: parseFloat(e.lat).toFixed(3) + ", " + parseFloat(e.lng).toFixed(3), 
      id: e.x + e.y,
      lat: e.lat,
      lng: e.lng,
    }
    this.addPlace(clickedPlace)
    this.openForm(clickedPlace)
    this.panTo(e)
  }

  openForm(place){
    this.setState({ 
      formVisible: true,
      newContact: place
    })
  }

  closeForm(){
    this.setState({ 
      formVisible: false
    })
  }

  personChange(event) {
    this.setState({person: event.target.value});
  }

  notesChange(event) {
    this.setState({notes: event.target.value});
  }

  addContact(e){
    e.preventDefault()
    let newContact = this.state.newContact;
    newContact.person = this.state.person
    newContact.notes = this.state.notes
    this.setState({ 
      newContact,
      person: '',
      notes: '',
    });
    this.closeForm()
  }

  panTo(e){
    let lat = "",
        lng = ""
    if(e.lat){
      lat = e.lat 
      lng = e.lng
    } else {
      lat = e.geometry.location.lat()
      lng = e.geometry.location.lng()
    }
    this.state.mapInstance.panTo(
      new window.google.maps.LatLng(lat, lng)
    );
  }

  renderAddressbook(){
    return this.state.places.map( (a, index) => {
      return (
        <Address key={index} onClick={() => this.panTo(a)}>
          <img src="https://ishantin.sirv.com/Images/star.svg" alt=""/>
          <div className="text">
            {a.person ? <strong>{a.person}</strong> : ""}
            <p>{a.name}</p>
            {a.notes ? <p>{a.notes}</p> : ""}
          </div>
        </Address>
      )
    })
  }

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    const mapOptions = {
      styles: [
        {
            "stylers": [
                {
                    "hue": "#3db8ff"
                },
                {
                    "saturation": 250
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 50
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
      ]
    }
    return (
      <Wrapper>
        <h1><img id="logo" src="https://ishantin.sirv.com/Images/mapbook.svg" alt="MapBook Logo" /></h1>
        <div className="wrapper">
          <div className="mapwrap">
          <Fragment>
            {mapApiLoaded && (
              <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
            )}
            <div>
              <Form show={this.state.formVisible} onSubmit={(e) => this.addContact(e)}>
                <h3>Add contact details</h3>
                <label htmlFor="name">Name*
                  <input type="text" id="name" placeholder="Your contacts full name" required value={this.state.person} onChange={(e) => this.personChange(e)}/>
                </label>
                <label htmlFor="notes">Notes 
                  <textarea rows="5" id="notes" placeholder="Any notes about your contact" value={this.state.notes} onChange={(e) => this.notesChange(e)}/>
                </label>
                <input className="submit" type="submit" value="Add" />
                <div className="arrow"></div>
              </Form>
            </div>
            <GoogleMap
              defaultZoom={11}
              defaultCenter={[34.0325, -118.4030]}
              bootstrapURLKeys={{
                key: "AIzaSyCzPYGaaTEF0vVTd4r3TK5O0kY9Oy1fAKE",
                libraries: ['places', 'geometry'],
              }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
              options={mapOptions}
              onClick={ (e) => this.addClickedPlace(e)}
            >
              {!isEmpty(places) &&
                places.map(place => (
                  <Marker
                    key={place.id}
                    text={place.name}
                    person={place.person}
                    lat={place.lat || place.geometry.location.lat()}
                    lng={place.lng || place.geometry.location.lng()}
                  />
                ))}
            </GoogleMap>
          </Fragment>
          </div>
          <div className="addressbook">
            <h2>Address List</h2>
            <ul>
              {this.renderAddressbook()}
            </ul>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Panel;

////////////CSS/////////////
const Wrapper = styled.div`
  position: relative;
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:100,400,700&display=swap');
  font-family: "Open Sans", sans-serif;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  background: #ddd;
  color: #3db8ff;
  .wrapper{
    display: flex;
  }
  h1{
    z-index: 99;
    width: 100%;
    text-align: center;
    background: #fff;
    margin: 0 auto;
    border-bottom: #3db8ff solid 3px;
    img{
      width: 320px;
      margin-bottom: -11px;
    }
  }
  h2{
    background: #fff;
    margin: 0 auto;
    padding: 10px 0;
    font-weight: 100;
    text-transform: uppercase;
  }
  .mapwrap{
    width: 70%;
    position: relative;
    height: calc(100vh - 84px);
  }
  .addressbook{
    width: 30%;
    min-width: 200px;
    ul{
      margin: 0;
      height: calc(100vh - 160px);
      overflow: scroll;
      background: #fff;
      list-style: none;
      padding: 0;
    }
  }

  *::-webkit-input-placeholder {
      color: #3db8ff;
  }
  *:-moz-placeholder {
      color: #3db8ff;
  }
  *::-moz-placeholder {
      color: #3db8ff;
  }
  *:-ms-input-placeholder {
      color: #3db8ff;
  }
  *::-ms-input-placeholder {
      color: #3db8ff;
  }
  *::placeholder {
      color: #3db8ff;
  }
`;

const Address = styled.li`
  border-bottom: 2px solid #fff;
  background: #3db8ff;
  padding: 10px;
  color: #fff;
  text-align: left;
  transition: .3s ease-in-out;
  &:hover{
    cursor: pointer;
    border-bottom: 2px solid #fff38a;
    background: rgba(68, 187, 255, 0.7);
  }
  img{
    width: 30px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: top;
  }
  .text{
    width: calc(100% - 35px);
    display: inline-block;
  }
  strong, p{
    margin: 5px auto 10px;
  }
`;

const Form = styled.form`
  pointer-events: ${props => props.show ? "all" : "none"};
  opacity: ${props => props.show ? 1 : 0};
  transition: .3s ease-in-out;
  position: absolute;
  width: 300px;
  left: 0;
  right: 0;
  margin: 60px auto;
  padding: 25px;
  border-radius: 12px;
  z-index: ${props => props.show ? 9 : -1};;
  background: #fff;
  text-align: left;
  h3{margin: 0 auto 15px;}
  label{
    font-weight: 700;
    input, textarea{
      display: block;
      padding: 7px;
      width: 100%;
      box-sizing: border-box;
      margin: 5px auto 20px;
      border: #3db8ff 1px solid;
      border-radius: 3px;
      outline: none;
      font-size: 14px;
      color: #3db8ff;
    }
    textarea{height: 100px; resize: none; }
  }
  .submit{
    width: 100%;
    text-align: center;
    background: #3db8ff;
    color: #fff;
    padding: 8px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 16px;
    border: 0;
    cursor: pointer;;
  }
  .arrow{
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #fff;
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;