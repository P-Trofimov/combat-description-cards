import React, {useState} from 'react';

function CardName(props) {
  
  const [editingName, setEditName] = useState(false);
  const [charName, setCharName] = useState(props.name);

  const saveName = () => {
    props.saveName(charName);
    setEditName(false);
  };
  
  return (
    <div className="card__wrapper name-wrapper">
      {editingName ?
        <div className="name-edit">
          <input className="name-input" placeholder="Input name" onChange={e => setCharName(e.target.value)} autoFocus={true} defaultValue={charName}/>
          <div className="card__btn btn-save-name" onClick={saveName}>
            Save
          </div>
        </div>
        :
        <p className="card__name" title="Click to edit name" onClick={() => setEditName(true)}>{charName}</p>
      }
    </div>
  );
}

export default CardName;