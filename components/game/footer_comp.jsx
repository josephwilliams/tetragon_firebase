import React from 'react';

const Footer = (props) => {
  let text, klass;
  if (props.gameBegun && !props.gameState) {
    klass = "bottom-container";
    text = "restart";
  } else if (props.gameBegun && props.gameState) {
    klass = "bottom-container-hide";
    text = null;
  } else if (!props.gameBegun && props.gameState) {
    klass = "bottom-container";
    text = "randomize";
  }

  return (
    <div className={klass} onClick={() => props.restart()}>
      {text}
    </div>
  );
};

export default Footer;
