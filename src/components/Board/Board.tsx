import type {ReactElement} from "react";
import Square from "./Square/Square.tsx";
import type {Player} from "../../hooks/useTicTacToe.ts";
import styles from './Board.module.scss';

type BoardProps = {
    board: Player[];
    winningLine: number[];
    onSquareClick: (index: number) => void;
};

function Board({board, winningLine, onSquareClick}: BoardProps): ReactElement {
    return (
        <div className={styles.board}>
            {board.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    isWinner={winningLine.includes(index)}
                    isGameOver={winningLine.length > 0 && !winningLine.includes(index)}
                    onClick={() => onSquareClick(index)}
                />
            ))}
        </div>
    );
}

export default Board;