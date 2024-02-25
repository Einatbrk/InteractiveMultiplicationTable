/* eslint-disable no-unused-vars */

import React, { useState } from 'react';


export const MultiplicationTable = () => {
    const [showAnswers, setShowAnswers] = useState(
        Array.from({ length: 10 }, (_, col) => Array(10).fill(false))
    );

    //Array.from method create a new array with 10 elements- that mean that it creates 10 columns of 10 elements.
    //the first argument is the length of the new array. the second argument is a function that will be called for each element in the array. the first argument of the function is the current element 
    //and the second argument is the index of the current element.
    // (_, col) means that there is no need to pass the index of the current element to the function. 
    // '_' is a convention for a throwaway variable, indicating that it's not used. 
    //because the index of the current element is the same as the index of the current element in the array.
    //the function returns an array of arrays (10 columns with 10 rows and each cell is an element). each array is a column of 10 elements.

    const resetAnswers = () => {
        setShowAnswers(
            Array.from({ length: 10 }, () => Array(10).fill(false))
        );
    };


    const handleToggleAnswer = (row, col) => { //row and col are indexes of the current element.
        setShowAnswers((prevShowAnswers) => prevShowAnswers.map((rowArray, rowIndex) => //rowArray-row index, rowIndex-column index.
            rowIndex === row //rowIndex(column index) is equal to row argument? 
                ? rowArray.map((value, colIndex) => //mapping the row array (row number) and looking for the desire column index.
                    colIndex === col ? !value : value //when find the desire index of current element, compare it to col argument if true, it will change to false and opposite.
                )
                : rowArray
        )
        );
    };




    return (
        <div>

            <h3>Multiplication Table</h3>
            <table>
                <thead> {/*Header container*/}
                    <tr> {/* Header row - contains 1 cell for the reset button + 10 cells representing col index+1 to ignore reset button cell */}
                        <th> {/*First column*/}
                            <button onClick={resetAnswers}>Reset</button> {/*implement reset button*/}
                        </th> {/*End of first column*/}
                        {/*in the rest of the columns starting to create an array of 10 columns*/}
                        {/*each column get key of +1 so we wont use the index for visibility*/}
                        {/*column 1 will be keyed as 1 with index 0 and so on*/}
                        {Array.from({ length: 10 }, (_, col) => (
                            <th key={col + 1}>{col + 1}</th>
                        ))}
                    </tr> {/*End of creating columns*/}
                </thead>{/*End of header*/}
                <tbody>{/*Table body-creates 10 rows under header- with header total 11 rows visibility*/}
                    {/*Table body-creates 10 cells defined as column for each row- with header total 11 columns visibility*/}

                    {/*creating another 10 rows*/}
                    {Array.from({ length: 10 }, (_, row) => (
                        <tr key={row + 1}> {/*tr is a row, starting to represent from 1*/}
                            <td>{row + 1}</td> {/*td is a cell in the row, starting to represent from 1*/}
                            {/*creating 10 columns*/}
                            {Array.from({ length: 10 }, (_, col) => (
                                <td key={col + 1}> {/*td is a cell in the column, starting to represent from 1*/}
                                    {/*adding correspond to toggle function now after we created rows and columns*/}
                                    {/*css to create background based of shoeAnswers current state after pressing toggle*/}
                                    <button
                                        onClick={() => handleToggleAnswer(row, col)}
                                        style={{
                                            cursor: 'pointer',
                                            background: showAnswers[row][col] ? '#e6e6e6' : 'transparent',
                                        }}
                                    >
                                        {showAnswers[row][col] ? (row + 1) * (col + 1) : '?'}

                                    </button>
                                    {/*if row and col locations in the showAnswers array, color background*/}
                                    {/*if row and col locations are not in showAnswers current array, transparent background*/}
                                    {/*if row and col locations in the showAnswers array, will multiple row index+1  with col index+1* and display it*/}
                                    {/*if row and col locations are not in showAnswers current array, will display ???*/}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
