import React from 'react';
import { object } from 'prop-types';

const Panel = (props) => {
  const defaultStyle = {
    background: '#fff',
    padding: '20px',
    margin: '20px 0'
  };
  const { style, children } = props;
  return (
    <div style={Object.assign(defaultStyle, style)}>
      {
         children
      }
    </div>
  );
};

Panel.propTypes = {
  style: object
};

Panel.defaultProps = {
  style: {}
};

export default Panel;
