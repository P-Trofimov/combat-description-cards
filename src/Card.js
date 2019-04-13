import React, { Component } from "react";
import CardName from "./CardName";
import "./Card.css";
import StyleButton from "./StyleButton";

class Card extends Component {
  constructor(props) {
    super(props);
    this.getRandom = this.getRandom.bind(this);
    this.changeWeapon = this.changeWeapon.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidMount() {
    this.getRandom(this.props.weapon, this.props.style);
    this.setState({
      charName: this.props.name
    });
  }
  getRandom(weapon, style) {
    const filtered = this.props.data.filter(
      obj => obj.type === weapon && obj.style === style
    );
    const num = this.getRandomInt(0, filtered.length - 1);
    const description = filtered[num];
    this.setState({
      weapon,
      style,
      description
    });
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  changeWeapon(weapon) {
    this.getRandom(weapon, this.state.style);
    this.props.rememberCard({
      id: this.props.id,
      name: this.state.charName,
      weapon: weapon,
      style: this.state.style
    });
  }
  changeStyle(style) {
    this.getRandom(this.state.weapon, style);
    this.props.rememberCard({
      id: this.props.id,
      name: this.state.charName,
      weapon: this.state.weapon,
      style: style
    });
  }

  saveName = name => {
    this.setState({
      charName: name
    });
    this.props.rememberCard({
      id: this.props.id,
      name,
      weapon: this.state.weapon,
      style: this.state.style
    });
  };

  render() {
    if (!this.state || Object.keys(this.state).length < 1) return null;

    return (
      <div className="card">
        <div className="card__content-wrapper">
          <div
            className="card__btn btn-close"
            title="Delete this card"
            onClick={() => this.props.removeCard(this.props.id)}
          >
            X
          </div>
          <div
            className="card__btn btn-new"
            title="Add another card"
            onClick={this.props.addCard}
          >
            +
          </div>
          <CardName saveName={this.saveName} name={this.props.name} />
          <p className="card__section-heading"> Weapon type </p>
          <div className="card__wrapper weapon-wrapper">
            <StyleButton
              type="weapon"
              btnStyle="blunt"
              change={this.changeWeapon}
              stateStyle={this.state.weapon}
            />
            <StyleButton
              type="weapon"
              btnStyle="piercing"
              change={this.changeWeapon}
              stateStyle={this.state.weapon}
            />
            <StyleButton
              type="weapon"
              btnStyle="slashing"
              change={this.changeWeapon}
              stateStyle={this.state.weapon}
            />
          </div>
          <p className="card__section-heading"> Fighting style </p>{" "}
          <div className="card__wrapper style-wrapper">
            <StyleButton
              type="style"
              btnStyle="power"
              change={this.changeStyle}
              stateStyle={this.state.style}
            />
            <StyleButton
              type="style"
              btnStyle="finesse"
              change={this.changeStyle}
              stateStyle={this.state.style}
            />
            <StyleButton
              type="style"
              btnStyle="range"
              change={this.changeStyle}
              stateStyle={this.state.style}
            />
          </div>
          <div className="card__wrapper reload-wrapper">
            <div
              className="card__btn reload-btn"
              onClick={() =>
                this.getRandom(this.state.weapon, this.state.style)
              }
            >
              Get another card
            </div>
          </div>
          <div className="card__wrapper description-wrapper">
            <p className="card__description focus-word" title="Focus word">
              {this.state.description
                ? this.state.description.word
                : "I dunno lol"}
            </p>
            <p className="card__description nonlethal" title="Nonlethal strike">
              {this.state.description
                ? this.state.description.nonlethal
                : "I dunno lol"}
            </p>
            <p className="card__description lethal" title="Lethal blow">
              {this.state.description
                ? this.state.description.lethal
                : "I dunno lol"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
