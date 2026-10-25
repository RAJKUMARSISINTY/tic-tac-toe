import { describe, it, expect } from 'vitest';
import { calculateWinner, computerLogic } from './game-logic';

describe('Tic Tac Toe Game Logic & AI', () => {
  
  it('should detect when Player X wins across a row', () => {
    // Row 1 has three X's
    const board = ['X', 'X', 'X', null, 'O', null, 'O', null, null];
    const result = calculateWinner(board);
    
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 1, 2]);
  });

  it('should detect when Player O wins down a column', () => {
    // Column 1 has three O's
    const board = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
    const result = calculateWinner(board);
    
    expect(result.winner).toBe('O');
    expect(result.line).toEqual([0, 3, 6]);
  });

  it('should make the computer take an immediate winning move', () => {
    // Computer (O) can win by playing at index 2
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const aiMove = computerLogic(board);
    
    expect(aiMove).toBe(2);
  });

  it('should make the computer block Player X from winning', () => {
    // Player X is about to win at index 2, computer must block it
    const board = ['X', 'X', null, 'O', null, null, null, null, null];
    const aiMove = computerLogic(board);
    
    expect(aiMove).toBe(2);
  });

  it('should make the computer take the center square if it is free', () => {
    const board = ['X', null, null, null, null, null, null, null, null];
    const aiMove = computerLogic(board);
    
    expect(aiMove).toBe(4); // Center is index 4
  });

});