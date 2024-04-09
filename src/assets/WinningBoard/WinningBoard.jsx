/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Crown from '/newCrown.png?url';
import './WinningBoard.css';
import '../QuitGame/QuitGame.jsx'
import QuitGame from '../QuitGame/QuitGame.jsx';


const WinningBoard = ({ userNameScore, userName }) => {
    const [winners, setWinners] = useState([]);
    const [emptyRows, setEmptyRows] = useState([1, 2, 3]); 

    const saveScore = (userName, userNameScore) => {
        setWinners(prevWinners => {
            const newWinners = [...prevWinners, { userName, userNameScore }];
            const sortedWinners = newWinners.sort((a, b) => b.userNameScore - a.userNameScore).slice(0, 3);
            localStorage.setItem('winners', JSON.stringify(sortedWinners));
            return sortedWinners;
        });
    };

    useEffect(() => {
        if (userNameScore > 0) {
            saveScore(userName, userNameScore);
            setEmptyRows([]); 
        }
    }, [userNameScore, userName]);

    const renderWinners = () => {
        return (
            winners.map((winner, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{winner.userName}</td>
                    <td>{winner.userNameScore}</td>
                </tr>
            ))
        );
    };

    const renderEmptyRows = () => {
        return (
            emptyRows.map((rowIndex) => (
                <tr key={rowIndex}>
                    <td>{rowIndex}</td>
                    <td></td>
                    <td></td>
                </tr>
            ))
        );
    };

    const renderTableHead = () => {
        return (
            <tr>
                <th>מקום</th>
                <th>שם</th>
                <th>ציון</th>
            </tr>
        );
    };

    return (
        <div className='winning-board-container'>
            <div className='crown'>
                <img src={Crown} alt="crown" className='img.crown'/>
            </div>
            <div>
                <table className='winners-table'>
                    <thead>
                        {renderTableHead()}
                    </thead>
                    <tbody>
                        {renderWinners()}
                        {renderEmptyRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WinningBoard;
