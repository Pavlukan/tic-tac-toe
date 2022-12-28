# tic-tac-toe
A Tic Tac Toe browser game in which you can play against yourself, your friend, or AI (waiting to be implemented). 

## Styling 
For styling I used four primary colors:

1) #2C2A4A (Space Cadet color);
2) #F2E9E4 (Isabelline color);
3) #FF6B6B (Bittersweet color);
4) #1B182E (Dark Purple color).

To align everything properly, I used Flexbox, Grid, and messed around with position property to create the winning message

## JavaScript code
The project itself wasn't extremely difficult compared to the previous ones. The main difficulty was to keep everything clean and in the appropriate objects, instead of polluting the global namespace with functions and variables.

I have two modules:

1. *Gameboard* - responsible for the mechanics of the gameboard and the game itself;
2. *displayController* - responsible for displaying information on the page;

I also have one factory function named *playerFactory*, which creates players.

Every module comprises certain variables, functions, and returns the ones, which need to be accessed by another object. 

## Impressions
Although it was difficult at times, although my code doesn't look as clean as I want it to look, I still feel proud, because it pleases my eye. Moreover, it looks far cleaner compared to non-OOP programming.

## Live preview
Link: 