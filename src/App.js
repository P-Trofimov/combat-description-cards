import React, { Component } from "react";
import "./App.css";
import Card from "./Card";

const data = require("./data/data.json");

class App extends Component {
  constructor(props) {
    super(props);
    this.rememberCard = this.rememberCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  componentDidMount() {
    let cards = this.getCards();
    if (cards.length === 0) {
      cards.push({
        name: "Click to change name",
        weapon: "blunt",
        style: "power",
        id: cards.length + 1
      });
    }
    this.setState({
      cards
    });
  }

  rememberCard(card) {
    let cards = this.getCards();
    let currentCard = cards.find(c => c.id === card.id);
    if (!currentCard) {
      cards.push(card);
    } else {
      let currentIndex = cards.findIndex(c => c.id === card.id);
      cards[currentIndex] = card;
    }
    localStorage.cards = JSON.stringify(cards);
    this.setState({
      cards
    });
  }

  addCard() {
    let cards = this.getCards();
    cards.push({
      name: "Click to change name",
      weapon: "blunt",
      style: "power",
      id: this.generateId()
    });
    localStorage.cards = JSON.stringify(cards);
    this.setState({
      cards
    });
  }

  removeCard(id) {
    let cards = this.getCards();

    if (cards.length === 1) {
      cards[0].name = "Click to change name";
      cards[0].weapon = "blunt";
      cards[0].style = "power";
      cards[0].id = this.generateId();
      localStorage.cards = JSON.stringify(cards);
      this.setState({
        cards
      });
      return;
    }

    let currentIndex = cards.findIndex(c => c.id === id);
    cards.splice(currentIndex, 1);
    localStorage.cards = JSON.stringify(cards);
    this.setState({
      cards
    });
  }

  getCards() {
    let cards;
    if (!localStorage.cards) {
      cards = [];
    } else {
      cards = JSON.parse(localStorage.cards);
    }
    return cards;
  }

  generateId() {
    let cards = this.getCards();
    let id =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    if (cards.find(c => c.id === id)) {
      return this.generateId();
    }
    return id;
  }

  render() {
    if (!this.state || !this.state.cards) return null;
    return (
      <>
        <div className="App">
          {" "}
          {this.state.cards.map(card => (
            <Card
              key={card.id}
              data={data}
              {...card}
              rememberCard={this.rememberCard}
              addCard={this.addCard}
              removeCard={this.removeCard}
            />
          ))}
        </div>
        <footer className="credits">
          Icons made by
          <a
            className="credits-link"
            href="https://www.flaticon.com/authors/iconixar"
            title="iconixar"
          >
            iconixar
          </a>
          ,
          <a
            className="credits-link"
            href="https://www.flaticon.com/authors/those-icons"
            title="Those Icons"
          >
            Those Icons
          </a>
          ,
          <a
            className="credits-link"
            href="https://www.freepik.com/"
            title="Freepik"
          >
            Freepik
          </a>
          ,
          <a
            className="credits-link"
            href="https://www.flaticon.com/authors/zlatko-najdenovski"
            title="Zlatko Najdenovski"
          >
            Zlatko Najdenovski
          </a>
          ,
          <a
            className="credits-link"
            href="https://www.flaticon.com/authors/bqlqn"
            title="bqlqn"
          >
            bqlqn
          </a>
          from{" "}
          <a
            className="credits-link"
            href="https://www.flaticon.com/"
            title="Flaticon"
          >
            www.flaticon.com
          </a>
          <br />
          licensed by
          <a
            className="credits-link"
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0 BY
          </a>
        </footer>
      </>
    );
  }
}

export default App;
