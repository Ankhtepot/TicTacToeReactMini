import {useTicTacToe} from "../../hooks/useTicTacToe.ts";
import styles from './Game.module.css';
import Board from "../Board/Board.tsx";
import HistoryList from "../HistoryList/HistoryList.tsx";

export default function Game() {
    const {
        history,
        currentMove,
        currentBoard,
        status,
        winner,
        isDraw,
        winningLine,
        handleSquareClick,
        jumpTo,
        reset,
    } = useTicTacToe();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tic Tac Toe</h1>
            <p className={getStatusStyles()}>{status}</p>
            <button className={styles.resetButton} onClick={reset}>
                Reset game
            </button>

            <div className={styles.gameLayout}>
                <Board
                    board={currentBoard}
                    winningLine={winningLine}
                    onSquareClick={handleSquareClick}
                />

                <HistoryList history={history} move={currentMove} jumpTo={jumpTo}/>

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
}