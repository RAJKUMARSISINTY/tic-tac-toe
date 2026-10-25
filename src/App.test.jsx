import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('Tic Tac Toe App Component', () => {
  
  beforeEach(() => {
    localStorage.clear(); // Clear scores before each test
    render(<App />);
  });

  it('should display the title and start with Player X turn', () => {
    expect(screen.getByRole('heading', { name: /tic tac toe/i })).toBeInTheDocument();
    expect(screen.getByText(/current turn: player x/i)).toBeInTheDocument();
  });

  it('should alternate turns between X and O when empty squares are clicked', () => {
    const squares = screen.getAllByRole('button', { name: /empty square/i });
    
    // Click first square (Player X)
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText(/current turn: player o/i)).toBeInTheDocument();

    // Click second square (Player O)
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(screen.getByText(/current turn: player x/i)).toBeInTheDocument();
  });

  it('should not allow clicking an already filled square', () => {
    const squares = screen.getAllByRole('button', { name: /empty square/i });
    
    // Play X on square 0
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');

    // Click square 0 again — should stay X and turn should not change
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText(/current turn: player o/i)).toBeInTheDocument();
  });

  it('should undo the last move in 2-player mode', () => {
    const squares = screen.getAllByRole('button', { name: /empty square/i });
    
    fireEvent.click(squares[0]); // X plays
    fireEvent.click(squares[1]); // O plays
    expect(squares[1]).toHaveTextContent('O');

    // Click the Undo button
    const undoButton = screen.getByRole('button', { name: /undo last move/i });
    fireEvent.click(undoButton);

    // O's move should be removed and turn should return to O
    expect(squares[1]).toHaveTextContent('');
    expect(screen.getByText(/current turn: player o/i)).toBeInTheDocument();
  });

  it('should clear the board when Reset Game is clicked', () => {
    const squares = screen.getAllByRole('button', { name: /empty square/i });
    
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');

    // Click Reset Game
    const resetButton = screen.getByRole('button', { name: /reset current game/i });
    fireEvent.click(resetButton);

    // Board should be empty again
    expect(squares[0]).toHaveTextContent('');
    expect(screen.getByText(/current turn: player x/i)).toBeInTheDocument();
  });

});