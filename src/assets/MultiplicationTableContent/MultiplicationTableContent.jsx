/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './MultiplicationTableContent.css'

const MultiplicationTableContent = ({
    openPopup,
    resetAnswers,
    getCellStatusColor,
    isCellCorrect,
    isCellIncorrect,
}) => {
    const renderTable = () => (
        <table className='table-cells'>
            <thead>
                <tr>
                    <th>
                        <button className="reset-button" onClick={resetAnswers}>אתחול</button>
                    </th>
                    {Array.from({ length: 10 }, (_, col) => <th key={col + 1}>{col + 1}</th>)}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 10 }, (_, row) => (
                    <tr key={row + 1}>
                        <td>{row + 1}</td>
                        {Array.from({ length: 10 }, (_, col) => (
                            <td key={col + 1}>
                                <button
                                    className="initial-button"
                                    style={{ backgroundColor: getCellStatusColor(row, col) }}
                                    onClick={() => openPopup(row, col)}
                                >
                                    {isCellCorrect(row, col) ? (row + 1) * (col + 1) : (isCellIncorrect(row, col) ? 'X' : '?')}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            {renderTable()}
        </div>
    );
};

export default MultiplicationTableContent;
