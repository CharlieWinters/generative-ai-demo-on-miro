import React from 'react';

interface Props {
  // Define your component's props here
  modelName: string;
  value: boolean;
}

const ModelToggle: React.FC<Props> = (props) => {
  // Define your component's logic here

  return (
    <label className="toggle" >
      <input type="checkbox" tabIndex="0" checked={props.value}/>
      <span>{props.modelName}</span>
    </label>
  );
};

export default ModelToggle;
