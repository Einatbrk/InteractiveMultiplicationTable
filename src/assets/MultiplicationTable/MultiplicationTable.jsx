/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './MultiplicationTable.css';
import Popup from '../Popup/Popup';
import UserScore from '../UserScore/UserScore';
import MultiplicationTableContent from '../MultiplicationTableContent/MultiplicationTableContent';

const MultiplicationTable = ({ userName, userGender }) => {
    const initialState = {
        correctAnswers: [],
        incorrectAnswers: [],
        guessingCell: null,
        openPopup: false,
        userGender: '',
    };

    const [state, setState] = useState(initialState);

    const handleStates = (prop, value) => {
        setState((prevState) => ({ ...prevState, [prop]: value }));
    };

    const handleBackgroundReset = () => {
        const cells = document.querySelectorAll('.initial-button');
        return cells.forEach(cell => cell.style.backgroundColor = '#3498db');
    };

    const resetAnswers = () => {
        handleStates('correctAnswers', []);
        handleStates('incorrectAnswers', []);
        handleBackgroundReset();
    };

    const updateAnswers = (row, col, isCorrect) => {
        console.log(`Updating answers - Cells: row ${row}, col: ${col}, IsCorrect: ${isCorrect}`);
        const answer = { row, col };

        if (isCorrect) {
            handleStates('correctAnswers', [...state.correctAnswers, answer]);

        } else {
            handleStates('incorrectAnswers', [...state.incorrectAnswers, answer]);
        }
    };

    const isCellCorrect = (row, col) => {
        const correctCell = state.correctAnswers.some(answer => answer.row === row && answer.col === col);
        console.log(`correct cell found ${correctCell}`);
        return correctCell;
    };
    const isCellIncorrect = (row, col) => {
        const isCellIncorrect = state.incorrectAnswers.some(answer => answer.row === row && answer.col === col);
        return isCellIncorrect;
    };
    const getCellStatus = (row, col) => {
        const isCorrect = isCellCorrect(row, col);
        const isIncorrect = isCellIncorrect(row, col);

        if (isCorrect) {
            if (!state.incorrectAnswers.some(answer => answer.row === row && answer.col === col)) {
                return 'correct';
            }
        } else if (isIncorrect) {
            if (!state.correctAnswers.some(answer => answer.row === row && answer.col === col)) {
                return 'incorrect';
            }
        } else {
            return 'initial-button';
        }
    };
    const getCellStatusColor = (row, col) => {

        const cellStatus = getCellStatus(row, col);

        if (cellStatus === 'correct') {
            return 'green';
        } else if (cellStatus === 'incorrect') {
            return 'red';
        } else {
            return 'initial-button';
        }
    };
    useEffect(() => {
        if (state.correctAnswers.length === 0 && state.incorrectAnswers.length === 0) {
            console.log('No answers yet');
        } else if (state.correctAnswers.length === state.correctAnswers.length + 1 || state.incorrectAnswers.length === state.incorrectAnswers.length + 1) {
            console.log(`new correctAnswers.length is: ${state.correctAnswers.length}`);
            console.log(`new incorrectAnswers.length is: ${state.incorrectAnswers.length}`);
        }
    }, [state.correctAnswers, state.incorrectAnswers]);

    const openPopup = (row, col) => {
        const cellAlreadyAnswered =
            state.correctAnswers.some(answer => answer.row === row && answer.col === col) ||
            state.incorrectAnswers.some(answer => answer.row === row && answer.col === col);

        if (!cellAlreadyAnswered) {
            handleStates('guessingCell', { row, col });
            handleStates('openPopup', true);
            handleStates('userGender', userGender);
        }
    };
    const closePopup = () => {
        handleStates('guessingCell', null);
        handleStates('openPopup', false);
    };
    return (
        <div className='main-game-container'>
            <div className="multiplication-container">
                <div className="user-name-label rubik-scribble-regular">
                    <label htmlFor="test-yourself">בהצלחה {userName}! </label>
                </div>
                <MultiplicationTableContent
                    openPopup={openPopup}
                    resetAnswers={resetAnswers}
                    getCellStatusColor={getCellStatusColor}
                    isCellCorrect={isCellCorrect}
                    isCellIncorrect={isCellIncorrect}
                />
                <Popup
                    open={state.openPopup}
                    close={closePopup}
                    row={state.guessingCell?.row}
                    col={state.guessingCell?.col}
                    updateAnswers={updateAnswers}
                    userGender={state.userGender}
                />
            </div>
            <div>
                <UserScore
                    correctAnswers={state.correctAnswers.length}
                />
            </div>

        </div>
    );
};
export default MultiplicationTable;
