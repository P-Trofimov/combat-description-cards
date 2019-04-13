import React from 'react';

function StyleButton({type, btnStyle, change, stateStyle}) {
  return (
    <div
      className={`card__btn ${type}-btn ${btnStyle} ${stateStyle === btnStyle ? 'btn--selected' : ''}`}
      title={`${capitalize(btnStyle)}`}
      onClick={() => change(btnStyle)}
    />
  );
}

export default StyleButton;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
