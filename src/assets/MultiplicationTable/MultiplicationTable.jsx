/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './MultiplicationTable.css';
import Popup from '../Popup/Popup';
import UserScore from '../UserScore/UserScore';
import WinningBoard from '../WinningBoard/WinningBoard';
import MultiplicationTableContent from '../MultiplicationTableContent/MultiplicationTableContent';
import QuitGame from '../QuitGame/QuitGame';


const MultiplicationTable = ({ userName, userGender }) => {
    const initialState = {
        correctAnswers: [],
        incorrectAnswers: [],
        guessingCell: null,
        openPopup: false,
        userGender: '',
        prevCorrectAnswersLength: (0),
        prevIncorrectAnswersLength: (0),
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
        const answer = { row, col };
        const answerType = isCorrect ? 'correctAnswers' : 'incorrectAnswers';
        handleStates(answerType, [...state[answerType], answer]);
    };

    const isCellCorrect = (row, col) => {
        const correctCell = state.correctAnswers.some(answer => answer.row === row && answer.col === col);
        return correctCell;
    };
    const isCellIncorrect = (row, col) => {
        const isCellIncorrect = state.incorrectAnswers.some(answer => answer.row === row && answer.col === col);
        return isCellIncorrect;
    };
    const getCellStatus = (row, col) => {
        const isCorrect = isCellCorrect(row, col);
        const isIncorrect = isCellIncorrect(row, col);

        return isCorrect
            ? !state.incorrectAnswers.some(answer => answer.row === row && answer.col === col)
                ? 'correct'
                : undefined
            : isIncorrect
                ? !state.correctAnswers.some(answer => answer.row === row && answer.col === col)
                    ? 'incorrect'
                    : undefined
                : 'initial-button';
    };

    const getCellStatusColor = (row, col) => {
        const cellStatus = getCellStatus(row, col);

        return cellStatus === 'correct' ? 'green' : cellStatus === 'incorrect'
            ? 'red'
            : 'initial-button';
    };

    useEffect(() => {
        console.log(
            state.correctAnswers.length === 0 && state.incorrectAnswers.length === 0
                ? 'No answers yet'
                : state.correctAnswers.length !== state.prevCorrectAnswersLength ||
                    state.incorrectAnswers.length !== state.prevIncorrectAnswersLength
                    ? `correctAnswers length is: ${state.correctAnswers.length}`
                    : `incorrectAnswers length is: ${state.incorrectAnswers.length}`
        );


        handleStates('PrevCorrectAnswersLength', state.correctAnswers.length);
        handleStates('PrevIncorrectAnswersLength', state.incorrectAnswers.length);
    }, [state.correctAnswers, state.incorrectAnswers, state.correctAnswersprevCorrectAnswersLength, state.prevIncorrectAnswersLength]);

    const openPopup = (row, col) => {
        const cellAlreadyAnswered =
            state.correctAnswers.some(answer => answer.row === row && answer.col === col) ||
            state.incorrectAnswers.some(answer => answer.row === row && answer.col === col);

        !cellAlreadyAnswered
            ? (
                handleStates('guessingCell', { row, col }),
                handleStates('openPopup', true),
                handleStates('userGender', userGender)
            )
            : alert('לא ניתן לענות על שאלה יותר מפעם אחת');
    };

    const closePopup = () => {
        handleStates('guessingCell', null);
        handleStates('openPopup', false);
    };
    return (
        <div className='Multiplication-main-container'>
            <div className="user-name-label">
                <label htmlFor="good-luck">בהצלחה {userName}! </label>
            </div>
            <div className="components-container">
                <div className='main-score-board'>
                    <div className='quit-game'>
                        <QuitGame
                            userNameScore={state.correctAnswers.length}
                            userName={userName}
                            userGender={userGender} />
                    </div>
                    <div>
                        <UserScore
                            correctAnswers={state.correctAnswers.length}
                        />
                    </div>
                    <div>
                        <WinningBoard
                            userNameScore={state.correctAnswers.length}
                            userName={userName}
                        />
                    </div>
                </div>
                <div className='multiplication-table-container'>
                    <MultiplicationTableContent
                        openPopup={openPopup}
                        resetAnswers={resetAnswers}
                        getCellStatusColor={getCellStatusColor}
                        isCellCorrect={isCellCorrect}
                        isCellIncorrect={isCellIncorrect}
                    />
                </div>
            </div>
            <div>
                <Popup
                    open={state.openPopup}
                    close={closePopup}
                    row={state.guessingCell?.row}
                    col={state.guessingCell?.col}
                    updateAnswers={updateAnswers}
                    userGender={state.userGender}
                />
            </div>
        </div>
    );
};
export default MultiplicationTable;
