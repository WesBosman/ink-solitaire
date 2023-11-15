export const keys = {
	QUIT: 'q',
	DRAW: 'd',
	PICK: 'p',
	MOVE: 'm',
	FLIP: 'f',
};

export const colors = {
	RED: 'red',
	BLACK: 'black',
	WHITE: 'white',
};

export const numberValue = {
	ace: 0,
	two: 1,
	three: 2,
	four: 3,
	five: 4,
	six: 5,
	seven: 6,
	eight: 7,
	nine: 8,
	ten: 9,
	jack: 10,
	queen: 11,
	king: 12,
};

export const faceValue = {
	two: ' 2',
	three: ' 3',
	four: ' 4',
	five: ' 5',
	six: ' 6',
	seven: ' 7',
	eight: ' 8',
	nine: ' 9',
	ten: '10',
	jack: ' J',
	queen: ' Q',
	king: ' K',
	ace: ' A',
};

export const suit = {
	spades: '\u2660',
	hearts: '\u2665',
	clubs: '\u2663',
	diamonds: '\u2666',
};

// Functions
export const shuffle = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const makeDeck = () => {
	let newDeck = [];
	for (const s in suit) {
		if (suit.hasOwnProperty(s)) {
			for (const v in faceValue) {
				if (faceValue.hasOwnProperty(v)) {
					const isRed = s === 'hearts' || s === 'diamonds';
					const card = {
						column: null,
						row: null,
						value: faceValue[v],
						numberValue: numberValue[v],
						suit: s,
						str: `${faceValue[v]} ${suit[s]}`,
						isRed: isRed,
						color: isRed ? colors.RED : colors.WHITE,
						isSelected: false,
						isFlipped: false,
						isFocused: false,
						isFirstCardShowingInColumn: false,
						isLastCardInColumn: false,
					};
					newDeck.push(card);
				}
			}
		}
	}
	return newDeck;
};

export const makeColumn = (deck, number) => {
	let cards = [];

	for (let i = 0; i < number; i++) {
		let card = deck.pop();
		card.column = number;
		card.row = i;

		if (card && i + 1 === number) {
			card.isFlipped = true;
			card.isLastCardInColumn = true;
		}

		cards.push(card);
	}

	return cards;
};
