import React, {useState} from 'react';
import {Box, Text} from 'ink';
import Card from './card.js';

/**
 * The deck of cards
 * @returns Deck
 */
const Deck = ({deck, currentCard, currentColumn}) => {
	if (currentCard) {
		currentCard.isFlipped = true;
	}
	if (currentColumn === 0 && currentCard && currentCard.isFlipped) {
		currentCard.isFocused = true;
	}

	return (
		<Box>
			<Box borderStyle="round" padding={1} flexDirection="column">
				<Text>({deck.length})</Text>
			</Box>
			<Card card={currentCard} />
		</Box>
	);
};

export default Deck;
