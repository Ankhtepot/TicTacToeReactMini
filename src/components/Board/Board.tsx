import Square from "./Square/Square.tsx";
import type {Player} from "../../hooks/useTicTacToe.ts";
import styles from './Board.module.scss';
import type {CSSProperties} from "react";

type BoardProps = {
    boardSize: number;
    board: Player[];
    winningLine: number[];
    onSquareClick: (index: number) => void;
};

function Board({boardSize, board, winningLine, onSquareClick}: BoardProps) {
    return (
        <div className={styles.board} style={{ '--board-size': boardSize } as CSSProperties}>
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