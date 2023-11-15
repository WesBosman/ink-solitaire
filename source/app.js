import React, {useState} from 'react';
import {Box, Spacer, useApp, useInput, Text} from 'ink';
import Deck from './deck.js';
import Stack from './stack.js';
import Column from './column.js';
import {keys, makeDeck, makeColumn, shuffle} from './constants.js';

let d = makeDeck();

shuffle(d);

let columnOne = makeColumn(d, 1);
let columnTwo = makeColumn(d, 2);
let columnThree = makeColumn(d, 3);
let columnFour = makeColumn(d, 4);
let columnFive = makeColumn(d, 5);
let columnSix = makeColumn(d, 6);
let columnSeven = makeColumn(d, 7);

const App = ({name = 'Stranger'}) => {
	const {exit} = useApp();
	const [currentCard, setCurrentCard] = useState(null);
	const [status, setStatus] = useState('');
	const [currentColumn, setCurrentColumn] = useState(null);
	const [selectedCards, setSelectedCards] = useState([]);
	const [selectedColumn, setSelectedColumn] = useState(null);
	const [deck, setDeck] = useState(d);
	const [deckHistory, setDeckHistory] = useState([]);
	const [columns, setColumns] = useState([
		[currentCard],
		columnOne,
		columnTwo,
		columnThree,
		columnFour,
		columnFive,
		columnSix,
		columnSeven,
		[],
		[],
		[],
		[],
	]);

	useInput((input, key) => {
		if (input === keys.QUIT) {
			exit();
		} else if (input === keys.DRAW) {
			draw();
		} else if (key.rightArrow) {
			moveRight();
		} else if (key.leftArrow) {
			moveLeft();
		} else if (input === keys.FLIP) {
			flipCard();
		} else if (input === keys.PICK) {
			pickCards();
		} else if (input === keys.MOVE) {
			moveCards();
		} else if (key.escape) {
			deselectCards();
		}
	});
	const draw = () => {
		const card = deck.pop();
		if (card === undefined) {
			setDeck(deckHistory);
			setDeckHistory([]);
			console.log('Deck history: ', deckHistory);
			return;
		}
		let newCards = Array.from(columns);
		card.isFlipped;
		card.column == 0;
		newCards[0] = [card];

		setDeckHistory([...deckHistory, card]);
		setColumns(newCards);
		setStatus(`Drew card ${card.value} ${card.suit}`);
		setCurrentCard(card);
		setCurrentColumn(0);
		console.log('Deck History: ', deckHistory);
	};
	const getFocusableCards = () => {
		let focusableCards = [];

		if (currentCard !== null) {
			currentCard.column = 0;
			focusableCards.push(currentCard);
		}

		for (let i = 0; i < columns.length; i++) {
			for (let j = 0; j < columns[i].length; j++) {
				if (columns[i][j].isFlipped) {
					focusableCards.push(columns[i][j]);
				}
			}
		}

		return focusableCards;
	};
	const moveLeft = () => {
		if (currentColumn == null) {
			setStatus(`Move left to column 1`);
			setCurrentColumn(1);
			return;
		}
		let newColumn = currentColumn - 1;

		if (newColumn < 0) {
			newColumn = columns.length - 1;
		} else if (newColumn > columns.length - 1) {
			newColumn = 1;
		}
		setStatus(`Move left to column ${newColumn}`);
		setCurrentColumn(newColumn);
	};
	const moveRight = () => {
		if (currentColumn == null) {
			setStatus(`Move right to column 1`);
			setCurrentColumn(1);
			return;
		}
		let newColumn = currentColumn + 1;

		if (newColumn > columns.length - 1) {
			newColumn = 1;
		} else if (newColumn < 0) {
			newColumn = columns.length;
		}
		setStatus(`Move right to column ${newColumn}`);
		setCurrentColumn(newColumn);
	};
	const pickCards = () => {
		if (currentColumn == null) {
			return;
		}

		let col = columns[currentColumn];
		let visibleCards = col.filter(x => x.isFlipped);

		if (visibleCards.length == 0) {
			return;
		}

		if (currentColumn == 0) {
			let c = currentCard;
			c.isSelected = true;
			setCurrentCard(c);
		}

		setSelectedColumn(currentColumn);

		setStatus(`Selected ${visibleCards.map(c => c.str).join(', ')} cards`);
		setSelectedCards(visibleCards);
	};
	const deselectCards = () => {
		setStatus('Cards deselected');
		setSelectedColumn(null);
		setSelectedCards([]);
	};
	const moveCards = () => {
		if (currentColumn == null || selectedColumn == null) {
			return;
		}

		let selected = columns[selectedColumn];
		let selectedVisibleCards = selected.filter(x => x.isFlipped);

		let current = columns[currentColumn];
		let currentCards = selected.filter(x => {
			return (
				selectedVisibleCards.filter(y => {
					return x.suit == y.suit && x.value == y.value;
				}).length == 0
			);
		});

		const topSelectedCard = selectedVisibleCards[0];
		const bottomCurrentCard = current[current.length - 1];

		if (isValidMove(topSelectedCard, bottomCurrentCard) == false) {
			setStatus(
				`Can not move ${topSelectedCard.str} to ${bottomCurrentCard.str}`,
			);
			setSelectedCards([]);
			return;
		}

		let newCards = Array.from(columns);
		newCards[selectedColumn] = currentCards;
		newCards[currentColumn] = [...current, ...selectedVisibleCards];

		// Moved card from the deck
		if (selectedColumn == 0) {
			const filteredHistory = deckHistory.filter(x => x.str != currentCard.str);
			const lastCard = filteredHistory.pop() || null;
			if (lastCard != null) {
				lastCard.column = currentColumn;
			}
			let newCards = Array.from(columns);
			newCards[selectedColumn] = [lastCard];
			setColumns(newCards);
			setCurrentCard(lastCard);
			setDeckHistory(filteredHistory);
		}

		setColumns(newCards);

		setStatus(
			`Move cards ${selectedVisibleCards
				.map(c => c.str)
				.join(', ')} to column ${currentColumn}`,
		);

		setSelectedCards([]);
	};
	const isValidMove = (cardA, cardB) => {
		if (cardA === undefined && cardB === undefined) {
			return false;
		}
		// Move a card to a blank space
		if (
			(cardB === undefined && cardA !== undefined) ||
			(cardA === undefined && cardB !== undefined)
		) {
			return true;
		}
		const isOneHigher = cardB.numberValue - cardA.numberValue == 1;
		const isOneLower = cardA.numberValue - cardB.numberValue == 1;
		const isStackColumn =
			currentColumn == 8 ||
			currentColumn == 9 ||
			currentColumn == 10 ||
			currentColumn == 11;
		const isOppositeSuit =
			(cardA.isRed && !cardB.isRed) || (!cardA.isRed && cardB.isRed);
		const isSameSuit = cardA.suit === cardB.suit;
		const isDifferentColumn = currentColumn != selectedColumn;

		// Move a card to one of the stacks in the top right
		if (isStackColumn && isOneLower && isSameSuit && isDifferentColumn) {
			return true;
		}

		return isOneHigher && isOppositeSuit && isDifferentColumn;
	};
	const flipCard = () => {
		if (currentColumn == null) {
			return;
		}
		let current = columns[currentColumn];

		if (current.length == 0) {
			return;
		}

		const lastCardIndex = current.length - 1;
		let lastCard = current[lastCardIndex];
		lastCard.isFlipped = true;

		let newCards = Array.from(columns);
		newCards[currentColumn][lastCardIndex] = lastCard;

		setColumns(newCards);
		setStatus(`Flip card ${lastCard.value}${lastCard.suit}`);
	};
	return (
		<>
			<Box
				flexDirection="row"
				borderStyle="round"
				paddingLeft={2}
				paddingRight={2}
			>
				<Text>{status}</Text>
			</Box>
			<Box flexDirection="row">
				<Deck
					deck={deck}
					currentCard={currentCard}
					currentColumn={currentColumn}
				/>
				<Spacer />
				<Stack
					spadesStack={columns[8]}
					heartsStack={columns[9]}
					clubsStack={columns[10]}
					diamondsStack={columns[11]}
					currentColumn={currentColumn}
				/>
			</Box>
			<Box
				flexDirection="row"
				flexGrow={1}
				justifyContent={'space-between'}
				rowGap={1}
			>
				<Column
					column={1}
					currentColumn={currentColumn}
					cards={columns[1]}
					selectedCards={selectedCards}
				/>
				<Column
					column={2}
					currentColumn={currentColumn}
					cards={columns[2]}
					selectedCards={selectedCards}
				/>
				<Column
					column={3}
					currentColumn={currentColumn}
					cards={columns[3]}
					selectedCards={selectedCards}
				/>
				<Column
					column={4}
					currentColumn={currentColumn}
					cards={columns[4]}
					selectedCards={selectedCards}
				/>
				<Column
					column={5}
					currentColumn={currentColumn}
					cards={columns[5]}
					selectedCards={selectedCards}
				/>
				<Column
					column={6}
					currentColumn={currentColumn}
					cards={columns[6]}
					selectedCards={selectedCards}
				/>
				<Column
					column={7}
					currentColumn={currentColumn}
					cards={columns[7]}
					selectedCards={selectedCards}
				/>
			</Box>
		</>
	);
};

export default App;
