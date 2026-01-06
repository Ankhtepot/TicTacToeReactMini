import {useState } from "react";

export type Player = 'X' | 'O' | null;
export type GameBoard = Player[];

function getInitialBoard(boardSize: number = 3): GameBoard {
    return Array(boardSize * boardSize).fill(null);
}

function getLines(boardSize: number): number[][] {
    const lines: number[][] = [];

    // Rows
    for (let r = 0; r < boardSize; r++) {
        const row: number[] = [];
        for (let c = 0; c < boardSize; c++) {
            row.push(r * boardSize + c);
        }
        lines.push(row);
    }

    // Columns
    for (let c = 0; c < boardSize; c++) {
        const col: number[] = [];
        for (let r = 0; r < boardSize; r++) {
            col.push(r * boardSize + c);
        }
        lines.push(col);
    }

    // Diagonal \
    const diag1: number[] = [];
    for (let i = 0; i < boardSize; i++) {
        diag1.push(i * boardSize + i);
    }
    lines.push(diag1);

    // Diagonal /
    const diag2: number[] = [];
    for (let i = 0; i < boardSize; i++) {
        diag2.push(i * boardSize + (boardSize - 1 - i));
    }
    lines.push(diag2);

    return lines;
}

function calculateWinner(board: GameBoard, boardSize: number): {winner: Player, winningLine: number[]} {
    const lines: number[][] = getLines(boardSize);

    for (const line of lines) {
        const firstPlayer = board[line[0]];
        const firstPlayerWon = line.reduce((prev, curr) => prev && board[curr] === firstPlayer, true);
        if (firstPlayerWon && firstPlayer) {
            return { winner: firstPlayer, winningLine: line };
        }

        // if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        //     return { winner: board[a], winningLine: [a, b, c]};
        // }
    }

    return { winner:null, winningLine:[] };
}

export function useTicTacToe(initialSize: number = 3) {

    // boardSize = boardSize < 3 ? 3 : boardSize > 5 ? 5 : boardSize;
    const [boardSize, setBoardSizeState] = useState(initialSize);
    const [history, setHistory] = useState<GameBoard[]>([getInitialBoard(boardSize)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentBoard = history[currentMove];
    const {winner, winningLine} = calculateWinner(currentBoard,boardSize);
    const isXNext = currentMove % 2 === 0;

    const isDraw = !winner && currentBoard.every(square => square !== null);

    function setBoardSize(newSize: number) {
        const validatedSize = newSize < 3 ? 3 : newSize > 5 ? 5 : newSize;
        setBoardSizeState(validatedSize);
        setHistory([getInitialBoard(validatedSize)]); // Reset board
        setCurrentMove(0);                            // Reset moves
    }

    function handleSquareClick(index: number) {
        if (winner || currentBoard[index]) return;

        // Discard future moves if game timeline goes back
        const historyUntilNow: GameBoard[] = history.slice(0, currentMove + 1);

        const lastBoard: GameBoard = historyUntilNow[historyUntilNow.length - 1];
        const nextBoard: GameBoard = lastBoard.slice();
        nextBoard[index] = isXNext ? "X" : "O";

        const nextHistory: GameBoard[] = [...historyUntilNow, nextBoard];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    function reset() {
        setHistory([getInitialBoard(boardSize)]);
        setCurrentMove(0);
    }

    const status = winner
        ? `Winner: `
        : isDraw
            ? "Draw!"
            : `Next player: `;

    return {
        history,
        currentMove,
        currentBoard,
        isXNext,
        winner,
        isDraw,
        status,
        winningLine,
        boardSize,
        handleSquareClick,
        jumpTo,
        reset,
        setBoardSize,
    };
}