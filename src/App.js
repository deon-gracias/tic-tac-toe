import GameView from 'components/GameView/GameView';
import SetupView from 'components/SetupView/SetupView';
import { useState } from 'react';

function App() {
  const [isDurringGame, setIsDurringGame] = useState(false);

  const [players, setPlayers] = useState({
    X: 'player',
    O: 'player',
  });

  return isDurringGame ? (
    <GameView players={players} setIsDurringGame={setIsDurringGame} />
  ) : (
    <SetupView setIsDurringGame={setIsDurringGame} setPlayers={setPlayers} />
  );
}

export default App;
