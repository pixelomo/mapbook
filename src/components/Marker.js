import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  >{props.person ? <span className="name">{props.person}</span> : ""}</Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: url("https://ishantin.sirv.com/Images/star.svg") no-repeat;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
  .name{
    width: 85px;
    position: absolute;
    font-size: 11px;
    font-weight: 700;
    box-sizing: border-box;
    left: -28px;
    bottom: -20px;
    background: #fff;
    border: 1px solid #3db8ff;
    border-radius: 7px;
    padding: 0 5px;
  }
`;