import React, { useState } from "react";

const FilterComponent = ({ onFilter }) => {
    const [selected, setSelected] = useState("1");

    const handleChange = (event) => {
        setSelected(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <div>
            <label htmlFor="timeFilter">Filter by time range:</label>
            <select id="timeFilter" value={selected} onChange={handleChange}>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
            </select>
        </div>
    );
};

export default FilterComponent;
