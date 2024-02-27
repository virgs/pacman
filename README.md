# Pacman

![screenshot](./screenshot.png)

You can play it [here](https://virgs.github.io/pacman/)

Yeap. As you might think, this is yet another game development project of mine.
If you haven't done it yet, I highly recommend checking the other ones I have on GitHub:

- [Sudoku](https://github.com/virgs/sudoku)
- [Minesweeper AI](https://github.com/virgs/minesweeper-ai)
- [Flappy Bird AI](https://github.com/virgs/flappy-bird-ai)
- [2048 AI](https://github.com/virgs/2048-ai)
- [Rubik's Cubes AI](https://github.com/virgs/rubiks-cubes-ai)
- [Mancala](https://github.com/virgs/mancala)
- [Tetris](https://github.com/virgs/tetris)

----

## Project

Now, back to Pacm-man-related stuff.
As you may have noticed, I like coding games. Lately, I've digging deeper and deeper about game AI.
More specifically, I've coded different games that require different AI approaches, so I can learn these AI approaches and have fun at the same time.
The AI I used on this project precisely mimics the one coded on the original game and has something to do with "graph search"
Please, note the quotes. Believe me, this is not even close to being as fancy as you might think. But I'll get there eventually.

## Goals

As usual, every time I code a new project, I impose some artificial constraints to make the coding itself both more challenging and I can learn something else as I do it. The constraints I came up with for this one were:

- Pac-man loginc and its AI.
- React/Html/CSS only. No game can be used.
- Responsiveness. It has to run smoothly on mobile devices and bigger screens.
- To be fun to play and code. I took a few poetic licenses to change a bit the playability. Especially because I never intended to create "next-levels" nor anything similar, like the original game.

## Game

Pac-Man stands as a timeless testament to the golden era of arcade gaming, where simplicity met innovation, creating an enduring legend that continues to captivate players with its charming simplicity and endless fun.

Pac-Man embarks on a vibrant journey through a mesmerizing maze filled with whimsical ghosts and pulsating pellets. As our circular hero navigates the labyrinthine corridors, a symphony of electronic beats accompanies each nimble move, creating a harmonious dance between player and pixelated protagonist.

In this kaleidoscopic realm, Pac-Man devours radiant pellets, unleashing a cascade of colors that ignite the screen. The pursuit of power-packed super pellets transforms our intrepid hero into a formidable force, allowing him to turn the tables on his spectral pursuers.

### Ghosts

The game of Pac-Man (PAC-MAN or Pacman[sic]) has four ghosts ”that are out to destroy the "protagonist". Named:

1. Shadow, aka *Blinky* (red);
2. Speedy, aka *Pinky* (pink);
3. Bashful, aka *Inky* (aqua);
4. Pokey aka *Clyde* (orange);

#### Ghost states

### Artificial Intelligence

It might go without saying, but just in case you didn't figure it out, the AI involved in coding this game was implanted into the ghosts' brains. It may be a surprise to you, as it was to me at first, but they all have different chasing strategies. It looks obvious now, otherwise, they all would end up eventually overlapping each other, essentially becoming just one ghost in practical terms. Their strategies combined are very clever, when in *chase* mode, it aims to keep cornering Pac-man instead of just blindly chasing it.

1. *Blinky* constantly chases Pac-man's position position;
2. *Pinky* chases 4 positions ahead of Pac-man's position considering Pac-Man current direction;
3. *Inky* has a bit trickier chasing approach:
   Consider **P** the point 2 positions ahead of Pac-man's position considering Pac-Man current direction and **B** *Blinky's* position. *Inky* chases the point **I** where **I** is **P** + (**P** - **B**).
4. *Clyde*, as *Blinky* chases pacman position when its 8 or more tiles away from it. Otherwise, goes back to its corner.



## Code It Yourself

If you want to, you can assemble your [proposition inferences](./src/as/assembly/PropositionsSolver.ts) or [guess strategy](./src/as/assembly/GuessMaker.ts). To do so, you'd have to rewrite a really small portion of the code and put your ideas instead.

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile, and Minify for Production

```sh
npm run build
```

#### Format

```sh
npm run format
```

## Bibliography

1. [Algorithmic Approaches to Playing Minesweeper](https://cs50.harvard.edu/ai/2023/projects/1/minesweeper/)
1. [Algorithms for Minesweeper Game Grid Generation](https://dspace.cvut.cz/bitstream/handle/10467/61624/F3-BP-2016-Cicvarek-Jan-Algorithms%20for%20Minesweeper%20Game%20Grid%20Generation.pdf)
1. [Becerra, David J. 2015. Algorithmic Approaches to Playing Minesweeper](https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf)
1. [A solver of single-agent stochastic puzzle: A case study with Minesweeper](https://www.sciencedirect.com/science/article/pii/S0950705122002842)
1. [Unknown author](http://honors.cs.umd.edu/reports/minesweeper.pdf)
1. [nothings.org](https://minesweeper.online/statistics)
1. [minesweeper.online](https://nothings.org/games/minesweeper/)
1. [minesweepergame.com](https://minesweepergame.com/strategy/guessing.php)