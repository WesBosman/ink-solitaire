import React from 'react';
import {Box, Text} from 'ink';
import Card from './card.js';

const Column = ({column, currentColumn, cards, selectedCards}) => {
	const hasFocus = column == currentColumn;
	return (
		<Box
			flexDirection="column"
			justifyContent={'flex-start'}
			gap={0}
			columnGap={0}
			style={{
				position: 'relative',
			}}
		>
			{cards.map((c, i) => {
				const isSelected =
					selectedCards.filter(x => {
						return x.str == c.str;
					}).length > 0;
				const isLastCard = i + 1 == cards.length;
				const isFirstCard =
					selectedCards.length > 0 && selectedCards[0].str == c.str;

				if (c === null) {
					return;
				}
				c.isFocused = hasFocus;
				c.isLastCardInColumn = isLastCard;
				c.isFirsCardShowingInColumn = isFirstCard;
				c.isSelected = isSelected;
				return <Card key={c.str} card={c} inColumn={true} />;
			})}
		</Box>
	);
};

export default Column;
