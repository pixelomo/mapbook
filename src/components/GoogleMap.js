import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyCzPYGaaTEF0vVTd4r3TK5O0kY9Oy1fAKE",
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;

const Wrapper = styled.main`
  width: 100%;
  height: calc(100% - 60px);
`;