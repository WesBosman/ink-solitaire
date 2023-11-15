import React from 'react';
import {Box, Text} from 'ink';
import {suit} from './constants.js';
import Card from './card.js';

/**
 * The four completed stacks for cards
 * @returns Stack
 */
const Stack = ({
	currentColumn,
	spadesStack,
	heartsStack,
	diamondsStack,
	clubsStack,
}) => {
	return (
		<>
			<Box
				borderStyle="round"
				padding={spadesStack.length == 0 ? 1 : 0}
				borderColor={currentColumn == 8 ? 'green' : 'white'}
			>
				{spadesStack.length == 0 ? (
					<Text color="black">&nbsp;{suit.spades}&nbsp;</Text>
				) : (
					<Card card={spadesStack[spadesStack.length - 1]} />
				)}
			</Box>
			<Box
				borderStyle="round"
				padding={heartsStack.length == 0 ? 1 : 0}
				borderColor={currentColumn == 9 ? 'green' : 'white'}
			>
				{heartsStack.length == 0 ? (
					<Text color="red">&nbsp;{suit.hearts}&nbsp;</Text>
				) : (
					<Card card={heartsStack[heartsStack.length - 1]} />
				)}
			</Box>
			<Box
				borderStyle="round"
				padding={clubsStack.length == 0 ? 1 : 0}
				borderColor={currentColumn == 10 ? 'green' : 'white'}
			>
				{clubsStack.length == 0 ? (
					<Text color="black">&nbsp;{suit.clubs}&nbsp;</Text>
				) : (
					<Card card={clubsStack[clubsStack.length - 1]} />
				)}
			</Box>
			<Box
				borderStyle="round"
				padding={diamondsStack.length == 0 ? 1 : 0}
				borderColor={currentColumn == 11 ? 'green' : 'white'}
			>
				{diamondsStack.length == 0 ? (
					<Text color="red">&nbsp;{suit.diamonds}&nbsp;</Text>
				) : (
					<Card card={diamondsStack[diamondsStack.length - 1]} />
				)}
			</Box>
		</>
	);
};

export default Stack;
