import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width':'60px',
    'height':'60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'black'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'black',
    'fontSize': '16px',
    'borderRadius': '1em',
    'border': 'none',
    'shadowBox': '3px 3px 10px rgba(0,0,0,.5)'
}

const initialBoard = Array(9).fill(null);

function generateLines(n) {
    let array = [];

    for(let row = 0; row < n; row++) {
        let newRow = [];
        for (let column = 0; column < n; column++) {
            newRow.push(row * n + column);
        }

        array.push(newRow);
    }

    console.log(array);

    for (let line = 0; line < n; line++) {
        let newLine = [];
        for(let column = 0; column < n; column++) {
            newLine.push(line + column * n)
        }

        array.push(newLine);
    }

    console.log(array);
}

// generateLines(5);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return null;
}

function Square({value, onClick}) {

    console.log('rendering square:', value);

    return (
        <div
            className="square"
            style={squareStyle}
            onClick={onClick}
        >
            {value}
        </div>
    );
}

function Board({board, nextPlayer, winner, disabledReset, onSquareClick, onResetClick}) {
    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player:
                <span>{winner ? '-' : nextPlayer}</span>
            </div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>Winner:
                <span>{winner ?? 'None'}
        </span>
            </div>
            <button
                style={buttonStyle}
                onClick={onResetClick}
                disabled={disabledReset}
            >Reset</button>
            <div style={boardStyle}>
                {board.map((item, index) => {

                    <Square value={item} onClick={() => onSquareClick(index)} key={index}/>
                })}
                <div className="board-row" style={rowStyle}>
                    <Square value={board[0]} onClick={() => onSquareClick(0)} />
                    <Square value={board[1]} onClick={() => onSquareClick(1)}/>
                    <Square value={board[2]} onClick={() => onSquareClick(2)}/>
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square value={board[3]} onClick={() => onSquareClick(3)}/>
                    <Square value={board[4]} onClick={() => onSquareClick(4)}/>
                    <Square value={board[5]} onClick={() => onSquareClick(5)}/>
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square value={board[6]} onClick={() => onSquareClick(6)}/>
                    <Square value={board[7]} onClick={() => onSquareClick(7)}/>
                    <Square value={board[8]} onClick={() => onSquareClick(8)}/>
                </div>
            </div>
        </div>
    );
}

function Game() {
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const [isFirstRound, setIsFirstRound] = useState(true);

    const winner = calculateWinner(board);
    const nextPlayer = xIsNext ? 'X' : "O";

    function handleSquareClick(index) {
        if (board[index] || winner) {
            return;
        }

        const nextBoard = board.slice();
        nextBoard[index] = xIsNext ? 'X' : 'O'
        setBoard(nextBoard);
        setXIsNext(!xIsNext);
        setIsFirstRound(false);
    }

    function handleResetClick() {
        setBoard(initialBoard);
        setXIsNext(true);
        setIsFirstRound(true);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    board={board}
                    nextPlayer={nextPlayer}
                    winner={winner}
                    disabledReset={isFirstRound}
                    onSquareClick={handleSquareClick}
                    onResetClick={handleResetClick}
                />
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);