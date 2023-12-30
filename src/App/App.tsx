import React, { useState } from 'react';
import './App.css';

const gridSize = 6;
 
interface Item {
  hasItem: boolean;
  clicked: boolean;
}
 
const createItems = (): Item[] => {
  const items: Item[] = Array.from({ length: gridSize * gridSize }, () => ({
    hasItem: false,
    clicked: false,
  }));
 
  const randomIndex = Math.floor(Math.random() * items.length);
  items[randomIndex].hasItem = true;

  return items;
};
 
const Cell: React.FC<{ item: Item; onClick: () => void }> = ({ item, onClick }) => (
  <div className={`cell ${item.clicked ? 'clicked' : ''}`} onClick={onClick}>
    {item.clicked && item.hasItem && 'O'}
  </div>
);
 
const Grid: React.FC<{ items: Item[]; onCellClick: (index: number) => void }> = ({ items, onCellClick }) => (
  <div className="grid">
    {/* Визуализация клеток с использованием компонента Cell */}
    {items.map((item, index) => (
      <Cell key={index} item={item} onClick={() => onCellClick(index)} />
    ))}
  </div>
);
 
const App: React.FC = () => { 
  const [items, setItems] = useState<Item[]>(createItems());
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
 
  const handleCellClick = (index: number) => {
    if (gameOver) return;
 
    const updatedItems = [...items];
    updatedItems[index].clicked = true;
    setItems(updatedItems);
 
    setAttempts((prevAttempts) => prevAttempts + 1);
 
    if (updatedItems[index].hasItem) {
      setGameOver(true);
      alert(`Элемент найден! Количество попыток: ${attempts + 1}.`);
    }
  };
 
  const handleReset = () => { 
    setItems(createItems()); 
    setAttempts(0);
    setGameOver(false);
  };
 
  return (
    <div>
      <div>
        <h2>Количество попыток: {attempts}</h2>
        {gameOver && <p>Элемент найден! Сбросите игру для новой попытки.</p>}
        <button onClick={handleReset}>Сбросить игру</button>
      </div>
      {/* Визуализация игрового поля с использованием компонента Grid */}
      <Grid items={items} onCellClick={handleCellClick} />
    </div>
  );
};
 
export default App;
