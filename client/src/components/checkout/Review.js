import React from 'react';
import { List, ListItem, Typography, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken }) => (
  <>
    <List>
      {checkoutToken.live.line_items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant='body2'>
            {item.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <ListItem>
        <ListItemText primary='Total price' />
        <Typography variant='body2'>
          {checkoutToken.live.subtotal.formatted_with_code}
        </Typography>
      </ListItem>
    </List>
  </>
);

export default Review;
