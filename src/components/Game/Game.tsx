import {useTicTacToe} from "../../hooks/useTicTacToe.ts";
import styles from './Game.module.scss';
import Board from "../Board/Board.tsx";
import HistoryList from "../HistoryList/HistoryList.tsx";
import {TriangleIcon} from "lucide-react";

export default function Game() {
    const {
        history,
        currentMove,
        currentBoard,
        status,
        winner,
        isDraw,
        winningLine,
        isXNext,
        boardSize,
        handleSquareClick,
        jumpTo,
        reset,
        setBoardSize,
    } = useTicTacToe();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tic Tac Toe</h1>
            <p className={getStatusStyles()}>
                {status}<span className={styles.player}>{getPlayerSymbol()}</span>
            </p>
            <button className={styles.resetButton} onClick={reset}>
                Reset game
            </button>
            <label style={{marginBottom: '-1.2em'}}>Board size (3-5): </label>
            <div className={styles.boardSizeSelection}>
                <button onClick={() => setBoardSize(boardSize - 1)}>
                    <TriangleIcon className={`${styles.icon} ${styles.iconDown}`}/>
                </button>
                <p className={styles.boardsizeValue}>{boardSize}</p>
                <button onClick={() => setBoardSize(boardSize + 1)}>
                    <TriangleIcon className={`${styles.icon}`}/>
                </button>
            </div>


            <div className={styles.gameLayout}>
                <Board
                    boardSize={boardSize}
                    board={currentBoard}
                    winningLine={winningLine}
                    onSquareClick={handleSquareClick}
                />

                <HistoryList
                    history={history}
                    currentMove={currentMove}
                    jumpTo={jumpTo}
                />

            </div>
        </div>
    );

    function getStatusStyles(): string {
        let result = `${styles.status} `;

        if (winner) {
            result += styles.isWinner;
        } else if (isDraw) {
            result += styles.isDraw;
        }

        return result;
    }

    function getPlayerSymbol(): string {
        if (isDraw) {
            return "";
        }

        if (winner) {
            return winner;
        }

        return isXNext ? "X" : "O";
    }
}