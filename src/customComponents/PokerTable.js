import React, { Component } from 'react';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';
import Buttons from './Buttons';
import ThePot from './ThePot';
import $ from 'jquery';

var cards = new Deck()

class PokerTable extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dealersHand: ['deck','deck'],
			playersHand: ['deck','deck'],
			communityCards: ['deck','deck','deck','deck','deck'],
			wager: 0,
			gameOver: false
		}
		this.prepDeck = this.prepDeck.bind(this)
		this.playerBet = this.playerBet.bind(this)
	}

	prepDeck(){
		cards.createDeck();
		cards.shuffleDeck();
		// The deck is now ready for a new hand!
		// Set up the playershand and the dealershand
		var card1 = cards.deck.shift();
		var card2 = cards.deck.shift();
		var card3 = cards.deck.shift();
		var card4 = cards.deck.shift();
		// cards.deck is now 4 items fewer -- we mutated it!
		var playersStartingHand = [card1,card3];
		var dealersStartingHand = [card2,card4];
		this.setState({
			playersHand: playersStartingHand,
			dealersHand: dealersStartingHand
		})
	}

	playerBet(amount){
		var newWager = this.state.wager + amount;
		this.setState({
			wager: newWager
		})
		this.draw()
		this.checkHands(this.state.playersHand)
	}

	checkHands(hand){
		console.log(hand)
		$.ajax({
			method: "POST",
			url: "http://localhost:5000/hand-checker",
			data: {hand: hand},
			success: (response)=>{
				console.log(response)
			}
		})
		// $.ajax({
		// 	method: "POST",
		// 	url: "http://localhost:3000/hand-checker",
		// 	data: {hand: hand},
		// 	success: (response)=>{
		// 		console.log(response)
		// 	}
		// })

	}

	draw(){
		var communityNewHand = this.state.communityCards;
		communityNewHand.push(cards.deck.shift());
		this.setState({
			communityCards: communityNewHand
		})
		if(this.state.gameOver){
			// Go find out who won!
		}
	}

	render(){
		return(
			<div className="col-sm-12 the-table">
				{ /* <DealerHand /> */ }
				{ /* <PlayersHand /> */ }
				<ThePot wager={this.state.wager} />
				<PokerHand cards={this.state.dealersHand} /> { /* The computers hand */ }
				<PokerHand cards={this.state.communityCards} /> { /* Community Cards */ }
				<PokerHand cards={this.state.playersHand} /> { /* The players hand */ }
				<Buttons deal={this.prepDeck} bet={this.playerBet} />
			</div>
		)
	}
}

export default PokerTable;