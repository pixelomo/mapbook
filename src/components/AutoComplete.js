import React, { Component } from 'react';
import styled from 'styled-components';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.autoComplete = new mapApi.places.Autocomplete(
      this.searchInput
    );
    this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    this.autoComplete.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    addplace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      <Wrapper>
        <input
          ref={(ref) => {
            this.searchInput = ref;
          }}
          id="autocomplete"
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Type an address or click anywhere on the map to add to your addressbook"
        />
      </Wrapper>
    );
  }
}

export default AutoComplete;

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  input{
    width: 100%;
    padding: 17px 15px;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: #3db8ff;
    outline: none;
  }
`;