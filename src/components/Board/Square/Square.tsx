import styles from './Square.module.scss';
import type {Player} from "../../../hooks/useTicTacToe.ts";

type SquareProps = {
    value: Player;
    isWinner: boolean;
    isGameOver: boolean;
    onClick: () => void;
};

function Square({value, isWinner, isGameOver, onClick}: SquareProps) {
    return (
        // <button className={`${styles.square} ${isWinner ? styles.isWinner : ""}`}
        <button className={getStyle()}
                onClick={onClick}
        >
            {value}
        </button>
    );

    function getStyle(): string {
        let result = `${styles.square} `

        if (isWinner) {
            result += styles.isWinner;
        }

        if (isGameOver && !isWinner) {
            result += styles.noWinner;
        }

        return result;
    }
}

export default Square;