import '../ColorPicker/colorPicker.css';
import { useEffect, useState } from 'react';
import './colorPicker.css';

const ColorPicker = (props) => {
    const { colors, color, action } = props; // Destructuración de props

    return (
        <div className="colorContainer">
            <h5>Color: {color}</h5>
            <div className='colors'>
                {colors.map((color, index) => ( // Cambiado color a colorItem para evitar confusión
                    <button key={index} onClick={() => action(index)}>
                        <div className={color.color}></div> {/* Cambiado color a colorItem */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
