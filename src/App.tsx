import './App.module.scss'
import styles from './App.module.scss';
import Game from "./components/Game/Game.tsx";

function App() {
    return (
        <div className={styles.app}>
            <Game/>
        </div>
    );
}

export default App
