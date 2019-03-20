import React, {Component} from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.getRandom = this.getRandom.bind(this);
    this.editName = this.editName.bind(this);
    this.changeWeapon = this.changeWeapon.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.saveName = this.saveName.bind(this);
  }
  
  componentDidMount() {
    this.getRandom(this.props.weapon, this.props.style);
    this.setState({charName: this.props.name});
  }
  getRandom(weapon, style) {
    const filtered = this.props.data.filter(obj => obj.type === weapon && obj.style === style);
    const num = this.getRandomInt(0, filtered.length-1);
    const description = filtered[num];
    this.setState({weapon, style, description});
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  editName(e) {
    this.setState({charName: e.target.value})
  }
  saveName() {
    this.props.rememberCard({id: this.props.id, name: this.state.charName, weapon: this.state.weapon, style: this.state.style});
    this.setState({editingName: false});
  }
  changeWeapon(weapon) {
    this.getRandom(weapon, this.state.style);
    this.props.rememberCard({id: this.props.id, name: this.state.charName, weapon: weapon, style: this.state.style});
  }
  changeStyle(style) {
    this.getRandom(this.state.weapon, style);
    this.props.rememberCard({id: this.props.id, name: this.state.charName, weapon: this.state.weapon, style: style});
  }
  
  render() {
    if (!this.state || Object.keys(this.state).length < 1) return null;
    
    return (
      <div className="card">
        <div className="card__content-wrapper">
          <div className="card__btn card__btn-close" title="Delete this card" onClick={() => this.props.removeCard(this.props.id)}>X</div>
          <div className="card__btn card__btn-new" title="Add another card" onClick={this.props.addCard}>+</div>
          <div className="card__wrapper card__name-wrapper">
            {this.state.editingName ?
              <div className="card__name-edit">
                <input className="card__name-input" placeholder="Input name" onChange={this.editName} autoFocus={true} defaultValue={this.state.charName}/>
                <div className="card__btn card__btn-save-name" onClick={this.saveName}>
                  Save
                </div>
              </div>
              :
              <p className="card__name" title="Click to edit name" onClick={() => this.setState({editingName: true})}>{this.state.charName || 'Click to edit name'}</p>
            }
          </div>
          <p className="card__section-heading">Weapon type</p>
          <div className="card__wrapper card__weapon-wrapper">
            <div
              className={`card__btn card__weapon-btn card__blunt ${this.state.weapon === 'blunt' ? 'card__btn--active' : ''}`}
              title="Blunt weapon"
              onClick={() => this.changeWeapon('blunt')}
            />
            <div
              className={`card__btn card__weapon-btn card__piercing ${this.state.weapon === 'piercing' ? 'card__btn--active' : ''}`}
              title="Piercing weapon"
              onClick={() => this.changeWeapon('piercing')}
            />
            <div
              className={`card__btn card__weapon-btn card__slashing ${this.state.weapon === 'slashing' ? 'card__btn--active' : ''}`}
              title="Slashing weapon"
              onClick={() => this.changeWeapon('slashing')}
            />
          </div>
          <p className="card__section-heading">Fighting style</p>
          <div className="card__wrapper card__style-wrapper">
            
            <div
              className={`card__btn card__style-btn card__power ${this.state.style === 'power' ? 'card__btn--active' : ''}`}
              title="Power"
              onClick={() => this.changeStyle('power')}
            />
            <div
              className={`card__btn card__style-btn card__finesse ${this.state.style === 'finesse' ? 'card__btn--active' : ''}`}
              title="Finesse"
              onClick={() => this.changeStyle('finesse')}
            />
            <div
              className={`card__btn card__style-btn card__range ${this.state.style === 'range' ? 'card__btn--active' : ''}`}
              title="Ranged"
              onClick={() => this.changeStyle('range')}
            />
          </div>
          <div className="card__wrapper card__reload-wrapper">
            <div className="card__btn card__reload-btn" onClick={() => this.getRandom(this.state.weapon, this.state.style)}>Get another card</div>
          </div>
          <div className="card__wrapper card__description-wrapper">
            <p className="card__description card__focus-word" title="Focus word">{this.state.description ? this.state.description.word : 'I dunno lol'}</p>
            <p className="card__description card__nonlethal" title="Nonlethal strike">{this.state.description ? this.state.description.nonlethal : 'I dunno lol'}</p>
            <p className="card__description card__lethal"  title="Lethal blow">{this.state.description ? this.state.description.lethal : 'I dunno lol'}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;