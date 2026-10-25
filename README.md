# Tic Tac Toe - React Web Application

A modular, highly accessible, and feature-rich Tic Tac Toe game built with **React (Functional Components, Hooks)** and **SCSS**. It supports both Dual Player and Player-vs-Computer (PvE) modes, move history tracking, persistent scoreboards, smart AI priority logic, and full keyboard/screen-reader accessibility.

---

## Table of Contents

1. Project Overview
2. Tech Stack
3. Features Implemented
4. How to Run the Frontend Locally
5. How to Run Tests
6. AI Tools and Prompt Summary
7. Design Decisions
8. Clarifications and Assumptions
9. Known Limitations
10. Future Improvements
---

## 1. Project Overview

This project is an interactive, production-ready implementation of the classic Tic Tac Toe game. It emphasizes clean component decoupling, robust state management, responsive CSS grid layouts, and strict adherence to accessibility (a11y) standards.

---

## 2. Tech Stack

* **Framework:** React (Functional Components, Custom Hooks)
* **Styling:** SCSS (Modular component stylesheets)
* **Build Tool:** Vite
* **Testing:** Vitest & React Testing Library
* **State Persistence:** Browser `localStorage`

---

## 3. Features Implemented

* **Standard 3x3 Game Board:** Interactive cells that lock upon selection or game completion.
* **Dual Player & Computer Mode:** Play head-to-head or against an intelligent AI opponent (Player O).
* **Smart AI Heuristics:** Computer prioritizes winning, blocking user wins, taking the center, taking corners, and fallback moves.
* **Move History Log:** Chronological record of moves formatted precisely as `1. X : Row 1, Column 1`.
* **Smart Undo System:**
* *Dual Player Mode:* Undoes the single most recent move.
* *Computer Mode:* Undoes both the AI's move and the human's previous move together (2-step rollback).


* **Persistent Scoreboard:** Session-level tracking of X wins, O wins, and draws saved via `localStorage` with a separate reset option.
* **Full Accessibility (a11y):** ARIA live regions for dynamic turn announcements, grid roles, radiogroups for mode selection, and descriptive button labels.

---

## 4. How to Run the Frontend Locally

Follow these steps to run the application on your local machine:

1. **Clone the repository:**
```bash
git clone https://github.com/RAJKUMARSISINTY/tic-tac-toe.git
cd tic-tac-toe

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## 5. How to Run Tests

The application uses **Vitest** and **React Testing Library** for fast, native Vite-integrated testing.

To execute the test suite:

```bash
npm test

```

To run tests in interactive UI mode:

```bash
npx vitest

```

---

## 6. AI Tools and Prompt Summary

* **AI Collaborator:** Used during development for iterative architecture planning, breaking down components (`GameBoard`, `GameHistory`, `GameScore`, `GameMode`), writing core win-detection and AI priority logic, and crafting accessible ARIA attributes.
* **Prompt Summary:** Focused on incremental code refinement, decoupling AI logic into independent utilities (`/utils/game-logic.js`), optimizing undo mechanics for single vs. computer modes, and ensuring exact string formatting for move histories.

---

## 7. Design Decisions

* **Lifted State Architecture:** Game state (`squares`, `history`, `isXNext`, `vsComputer`) is managed in `App.jsx` to coordinate data flow seamlessly across independent child components (`GameMode`, `GameScore`, `GameBoard`, `GameHistory`).
* **Pure Utility Functions:** Win calculations and AI move selection are isolated in `utils/game-logic.js`, keeping components lightweight, testable, and free of side effects.
* **CSS Grid & SCSS Modules:** Used CSS grid for structural rigidity of the 3x3 board and SCSS nesting for maintainable, scoped styling rules.
* **Resilient Undo Handling:** Instead of complex history tree navigation (like React's official tutorial), history is stored as an array of structured move objects `{ player, index }`, allowing instant state reconstruction and reliable multi-step rollbacks.

---

## 8. Clarifications and Assumptions

* **Single-Page Architecture:** Built as a client-side React application with browser-based persistence (`localStorage`) replacing backend API storage.
* **AI Turn Delay:** A brief 500ms–700ms `setTimeout` delay is introduced during Computer mode so the AI feels like it's "thinking" rather than instantly snapping back.
---

## 9. Known Limitations

* **Single Difficulty Level:** The computer opponent uses a rule-based heuristic priority list (Win/Block/Center/Corner/Any) rather than an unbeatable Minimax algorithm, meaning it can occasionally be beaten by optimal human play.
* **Single-Device Play:** Multiplayer is restricted to local turn-taking on the same browser window rather than real-time online matchmaking.

---

## 10. Future Improvements

* **Minimax AI Difficulty Slider:** Introduce an "Easy", "Medium", and "Unbeatable (Minimax)" difficulty setting for computer mode.
* **Victory Animations:** Add confetti or smooth CSS transition effects when a winning line is completed.
* **Theme Customization:** Add a dark/light mode toggle via SCSS custom properties.