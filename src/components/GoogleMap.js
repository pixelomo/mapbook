import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const API_KEY =`${process.env.REACT_APP_API_KEY}`

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: API_KEY,
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