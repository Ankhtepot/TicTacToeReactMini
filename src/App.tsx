import './App.module.scss'
import Board from "./components/Board/Board.tsx";
import {useTicTacToe} from "./hooks/useTicTacToe.ts";
import styles from './App.module.scss';

function App() {
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
        <div className={styles.app}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tic Tac Toe</h1>
                <p className={getStatusStyles()}>{status}</p>

                <div className={styles.gameLayout}>
                    <Board
                        board={currentBoard}
                        winningLine={winningLine}
                        onSquareClick={handleSquareClick}
                    />

                    <div>
                        <ol className={styles.historyList}>
                            {history.map((_, move) => {
                                const description =
                                    move === 0 ? "Go to game start" : `Go to move #${move}`;
                                return (
                                    <li key={move}>
                                        <button
                                            className={styles.historyButton}
                                            onClick={() => jumpTo(move)}
                                            disabled={move === currentMove}
                                        >
                                            {description}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>

                    </div>
                    <button className={styles.resetButton} onClick={reset}>
                        Reset game
                    </button>
                </div>
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

export default App
