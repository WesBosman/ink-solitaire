import React from 'react';
import {Box, Text, render} from 'ink';

const Card = ({card}) => {
	const isSelected = card && card.isSelected;
	const isFlipped = card && card.isFlipped;
	const isUnflipped = card && !card.isFlipped;
	const isLast = card && card.isLastCardInColumn;
	const isFirst = card && card.isFirstCardShowingInColumn;
	const isFocused = card && card.isFocused;

	const unflippedBorderStyle = {
		topLeft: '\u256d',
		top: '\u2500',
		topRight: '\u256e',
		left: '',
		bottomLeft: '',
		bottom: '',
		bottomRight: '',
		right: '',
	};

	const getBorderStyle = () => {
		if (isSelected) {
			return 'double';
		} else if (isFlipped || isLast) {
			return 'round';
		} else if (isUnflipped) {
			return unflippedBorderStyle;
		}
	};

	const getCard = card => {
		if (isFlipped) {
			return <Text color={card.color}>{card.str}</Text>;
		} else if (isUnflipped && isLast) {
			return <Text color={card.color}>&nbsp;&nbsp;&nbsp;</Text>;
		} else {
			return <Text color={card.color}>&nbsp;&nbsp;&nbsp;</Text>;
		}
	};

	const borderStyle = getBorderStyle();
	const borderColor =
		(isFlipped && isFocused) || (isUnflipped && isFocused && isLast)
			? 'green'
			: 'white';

	console.log('Card: ', card);
	const shouldShowBox = (card && card.column === null) || isFlipped;

	// Use boxes to show flipped cards
	// use text to show unflipped cards that aren't from the deck
	return shouldShowBox ? (
		<Box borderStyle={borderStyle} borderColor={borderColor}>
			{getCard(card)}
		</Box>
	) : (
		<Text borderColor={'green'}>
			&#9581;&#9472;&#9472;&#9472;&#9472;&#9582;
		</Text>
	);
};

export default Card;
