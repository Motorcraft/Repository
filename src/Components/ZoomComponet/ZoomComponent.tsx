import React from "react";
import './styles.css'

function ZoomComponent(props: any) {
    const { scale, changeScale, zoomValue } = props

    const handleZoomIn = () => {
        if (scale < 1 || 1) {
            changeScale(scale + 0.1);
            // Установите значение селекта равным новому масштабу (scale)
            document.getElementById("zoomSelect")?.setAttribute("value", (scale + 0.1).toFixed(1));
        }
    };

    const handleZoomOut = () => {
        if (scale > 0.1) {
            changeScale(scale - 0.1);
            // Установите значение селекта равным новому масштабу (scale)
            document.getElementById("zoomSelect")?.setAttribute("value", (scale - 0.1).toFixed(1));
        }
    };

    const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newScale = parseFloat(e.target.value);
        if (!isNaN(newScale)) {
            if (newScale >= 0.1 && newScale <= 1) {
                changeScale(newScale);
            }
        }
    };

    return (
        <div className="controls">
            <button className='zoom-button' onClick={handleZoomIn}>+</button>
            <select id="zoomSelect" onChange={handleZoomChange} value={scale.toFixed(1)}>
                <option value="1">100%</option>
                <option value="0.9">90%</option>
                <option value="0.8">80%</option>
                <option value="0.7">70%</option>
                <option value="0.6">60%</option>
                <option value="0.5">50%</option>
                <option value="0.4">40%</option>
                <option value="0.3">30%</option>
                <option value="0.2">20%</option>
                <option value="0.1">10%</option>
            </select>
            <button className='zoom-button' onClick={handleZoomOut}>-</button>
        </div>
    )
}

export default ZoomComponent;
