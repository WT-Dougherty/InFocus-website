# A C++ Implementation of Checkers

## How To Play:
Terminal will prompt user to input the location (as a coordinate of the form 'a3', 'h4', 'c1', etc.) of the piece they want to move.
Terminal will then prompt the user to input the location they want to move that piece to.
Provided the move is valid, the piece will be moved to the new location and the updated board will be sent to output.
If the move is invalid, the user will be prompted to enter a new set of coordinates.
**The red team always starts**.
Normal pawns are represented by lowercase r's and b's and kings are represented by uppercase R's and B's.
It is red vs. black. A team wins and the game terminates when one team has no pieces left.
In this initial version, only single jumps are allowed. I may incorporate double jumps in a future expansion.
<br /><br />

## General Overview:
The program consists of four classes: Move, Piece, Board, & MoveHandler.
At the highest level, a MoveHandler object is created:
```cpp
// "movehandler.h"
class MoveHandler {
public:
    MoveHandler() {}
    void InitBoard();

    // used for I/O ops
    void PrintBoard();
    Move* GetMove(int team);

    // conversions
    char PiecetoChar(Piece* p);
    int CoordtoIndex(std::string coord);

    void RunGame();
    bool InBounds(std::string coord);

private:
    Move* prev_move;
    Board* board;
};
```
A MoveHandler object process moves by converting the user input (typical checkerboard coordinates like 'a5' and 'h7') to a single integer. Once it's performed this conversion, it creates a Move object:
```cpp
// "move.h"
class Move {
public:
    Move(int initial_index, int final_index, int team):
        initial_index(initial_index), final_index(final_index), team(team), capture(false) {}

    int InitIndex() { return initial_index; }
    int FinalIndex() { return final_index; }
    int Team() { return team; }
    void SetCap(bool b) { capture = b; }
    int GetCapLoc();

private:
    int initial_index;
    int final_index;
    int team;
    bool capture;
};
```
Packaging moves this way is convenient- it makes it easy to keep track of what the user wants to do. I considered making the Move object a struct, but I wanted it to be largely immutable, so I opted not to. The RunGame function in the MoveHandler class is the entry point to the engine. It is the only function called in main.cpp. When the game is run, the MoveHandler object initializes a Board object using InitBoard, which populates itself with Piece objects. The Piece class is abstract, with two concrete child classes, PawnPiece and KingPiece:
```cpp
// "piece.h"
class Piece {
public:
    Piece(int index, int team) : index(index), team(team) {}
    virtual ~Piece() {}
    virtual bool Type() = 0;

    int GetTeam() { return team; }

protected:
    int index;
    int team;
};

class KingPiece : public Piece {
public:
    KingPiece(int index, int team):
        Piece(index, team) {}
    
    bool Type() override { return true; }
};

class PawnPiece : public Piece {
public:
    PawnPiece(int index, int team):
        Piece(index, team) {}
    
    bool Type() override { return false; }
};
```
The only function that needs to be overridden is the Type function, which returns true when the piece is a king, and false if the piece is a pawn. This comes in handy when the Board class needs to generate possible moves:
```cpp
// "board.h"
class Board {
public:
    Board();
    
    int Winner();
    void AddPawn(int index, int team);
    void UpgradePawn(int index);
    void Remove(int index);
    void MovePiece(int indexi, int indexf);
    Piece* Get(int index) { return board[index]; }
    std::vector<int> GenerateMoves(int index, int team, Move* move, bool flag);

private:
    std::vector< Piece* > board;
    int num_red, num_black;
};
```
The Board class "knows the rules"; it generates potential moves when fed a starting & ending position. You might notice the flag parameter in the GenerateMoves function. When I was considering how to generate moves, I realized that a king can move in the "black direction" and the "red direction". The flag is used to run through the function again as though the piece could move in the direction opposite its typical direction (which, in the case of a king, it can). To keep things simple, I represented the teams using the integer 1 for red, and -1 for black. This way, I could use the team variable to specify moving direction (allowing a single function to handle all moves for all teams).
<br /><br />

## Future Expansion
In future expansions, there is a lot that I could improve. For starters, I would implement double jumps. When I was initially drawing up a structural plan for this engine, I was constantly coming up with new and more efficient ways to do things, but sometimes these ideas required that I fundamentally alter the structure of the code. For example, I initially had the GenerateMoves function as a member of the MoveHandler class, but I quickly realized that the Board class was better suited to implement it. Making these sorts of changes was disorienting when the structure was all in my head. For this reason, I found it helpful to draw up a structural diagram of my code, a sort of class diagram, if you will. Having a vision of what the code's structure will be, and how data will flow within it, is incredibly important.

*Thanks for reading. If you're interested, the full repo for this project is on my GitHub, which is linked in the About section of this website*