import {useState } from "react";

export type Player = 'X' | 'O' | null;
export type GameBoard = Player[];

const initialBoard: GameBoard = Array(9).fill(null);

function calculateWinner(board: GameBoard): {winner: Player, winningLine: number[]} {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], winningLine: [a, b, c]};
        }
    }

    return { winner:null, winningLine:[] };
}

export function useTicTacToe() {
    const [history, setHistory] = useState<GameBoard[]>([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentBoard = history[currentMove];
    const {winner, winningLine} = calculateWinner(currentBoard);
    const isXNext = currentMove % 2 === 0;

    const isDraw = !winner && currentBoard.every(square => square !== null);

    function handleSquareClick(index: number) {
        if (winner || currentBoard[index]) return;

        // Discard "future" moves if we are time‑traveling
        const historyUntilNow = history.slice(0, currentMove + 1);

        const lastBoard = historyUntilNow[historyUntilNow.length - 1];
        const nextBoard = lastBoard.slice() as GameBoard;
        nextBoard[index] = isXNext ? "X" : "O";

        const nextHistory = [...historyUntilNow, nextBoard];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    function reset() {
        setHistory([initialBoard]);
        setCurrentMove(0);
    }

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "Draw!"
            : `Next player: ${isXNext ? "X" : "O"}`;

    return {
        history,
        currentMove,
        currentBoard,
        isXNext,
        winner,
        isDraw,
        status,
        winningLine,
        handleSquareClick,
        jumpTo,
        reset,
    };
}