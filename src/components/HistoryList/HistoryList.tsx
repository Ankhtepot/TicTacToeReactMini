import styles from './HistoryList.module.css';
import type {GameBoard} from "../../hooks/useTicTacToe.ts";

type GameBoardProps = {
    history: GameBoard[];
    move: number;
    jumpTo: (move: number) => void;
};

export default function HistoryList({history, move, jumpTo}: GameBoardProps) {
    return (
        <>
            <ol className={styles.historyList}>
                {history.map((_, index) => {
                    const description =
                        index === 0 ? "Go to game start" : `Go to move #${index}`;
                    return (
                        <li key={index}>
                            <button
                                className={styles.historyButton}
                                onClick={() => jumpTo(index)}
                                disabled={index === move}
                            >
                                {description}
                            </button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}