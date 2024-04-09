/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Popup.css';
import IncorrectBoyImg from '/wrongBoy.JPG?url';
import CorrectBoyImg from '/correctBoy.JPG?url';
import IncorrectGirlImg from '/wrongGirl.jpg?url';
import CorrectGirlImg from '/correctGirl.jpg?url';
import { ImgButton } from '../Buttons/ImgButton';
import SubmitImg from '/submit.jpg?url';
import BackImg from '/backButton.jpg?url';

function Popup({ open, close, row, col, userGender, updateAnswers }) {

    const [backgroundColor, setBackgroundColor] = useState('backgroundColor');
    const [input, setInput] = useState("");
    const [answerState, setAnswerState] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    const handleInputChange = (e) => setInput(e.target.value);

    if (!open || isNaN(row) || isNaN(col)) {
        return null;
    }
    const handleBackgroundColor = (newBackgroundColor) => setBackgroundColor(newBackgroundColor);


    const handleSubmit = () => {
        const userAnswer = parseInt(input, 10);
        userAnswer === correctAnswer ? handleCorrectAnswer() : handleIncorrectAnswer();
        setInput("");
    };

    const correctAnswer = (row + 1) * (col + 1);

    const updateArray = (Boolean, input) => Boolean ? setCorrectAnswers(prevCorrectAnswers => [...prevCorrectAnswers, input]) : setIncorrectAnswers(prevIncorrectAnswers => [...prevIncorrectAnswers, input]);
    const handleCorrectAnswer = () => {
        handleBackgroundColor('green');
        setAnswerState(true);
        updateArray(true, input);
        updateAnswers(row, col, true);
    };

    const handleIncorrectAnswer = () => {
        handleBackgroundColor('red');
        setAnswerState(false);
        updateArray(false, input);
        updateAnswers(row, col, false);
    };

    const renderAnswerImage = (userGender, answer, className) => {
        const isCorrect = (answer === true);

        return (
            isCorrect ?
                (userGender === 'girl' ?
                    <img src={CorrectGirlImg} alt="correct" />
                    :
                    <img src={CorrectBoyImg} alt="correct" />)
                :
                (userGender === 'girl' ?
                    <img src={IncorrectGirlImg} alt="incorrect" />
                    :
                    <img src={IncorrectBoyImg} alt="incorrect" />)
        );

    };

    const handleClose = () => {
        close();
        handleBackgroundColor('popup');
        setAnswerState(null);
    };

    const renderInitialPopup = () => (
        <>
            <div className="question-container">
                <h4>תרגיל:</h4>
                <h4>{row + 1} * {col + 1}?</h4><br></br>
                <label htmlFor="userAnswer">תשובה:</label><br />
                <input
                    type="number"
                    value={input}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="הקלד כאן את תשובה"
                />
            </div>
            <div className="BtnContainer">
                <ImgButton src={BackImg} alt="back" onClick={handleClose} className="buttons" />
                <ImgButton src={SubmitImg} alt="submit" onClick={handleSubmit} className="buttons" />
            </div>
        </>
    );

    const renderCorrectAnswer = () => (
        <>
            <div className="answerFeedback">
                <h4>כל הכבוד!</h4>
                <p>התשובה הנכונה היא: {correctAnswer}</p>
                <div className='rendered-image'>
                    {renderAnswerImage(userGender, true, 'rendered-image')}
                </div>
            </div>
            <div className="close-button-container">
                <button className="close-button" onClick={handleClose}>סגירה</button>
            </div>
        </>
    );

    const renderInCorrectAnswer = () => (
        <>
            <div className="answerFeedback">
                <div>
                    <h4>אוי לא...</h4>
                    <p>התשובה הנכונה היא: {correctAnswer}</p>
                    <span>בהצלחה בפעם הבאה</span>
                </div>
                <div>
                    {renderAnswerImage(userGender, false, 'rendered-image')}</div>
            </div>
            <div className="close-button-container">
                <button className="close-button" onClick={handleClose}>סגירה</button>
            </div>
        </>
    );

    return (
        <div className={`popup ${backgroundColor}`}>
            <div>
                {answerState === null ?
                    renderInitialPopup() : answerState === true ? renderCorrectAnswer() : renderInCorrectAnswer()}
            </div>
        </div>
    );
}

export default Popup;
