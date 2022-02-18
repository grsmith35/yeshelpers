import React, { useState } from "react";

export default function Analysis() {

    const [fields, setFields] = useState({title: "", area: "", range: 5, count: 0})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({
            ...fields,
            [name]: value
        })
    }

    const options = [
        "5", "10", "15", "25", "50", "100"
    ];

    const quantities = [
        "10", "50", "100", "200", "300", "400"
    ];

    const handleClick = (event) => {
        event.preventDefault();
        fetchAff();
    }

    async function fetchAff() {
        const { count, title, area, range } = fields;
        let amount = 10;
        let reps = count/10;
        const resp = await fetch(`/api/site/${count}/${title}/${area}/${range}`);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-9 bg-color-lightgray">
                    <div className="row py-4">
                        <form  onChange={handleChange} className="col-md-6">
                            <label htmlFor="title">Keyword</label>
                            <input className="form-control" name="title" />
                            <label htmlFor="area">Area</label>
                            <input className="form-control" name="area" />
                            <label htmlFor="range">Range</label>
                            <select name="range" className="form-select form-select-lg form-control">
                                {options.map((each) => (
                                    <option key={each} value={each}>{each}</option>
                                ))}
                            </select>
                            <label htmlFor="count"># of Listings</label>
                            <select name="count" className="form-select form-select-lg form-control">
                                {quantities.map((counter) => (
                                    <option key={counter} value={counter}>{counter}</option>
                                ))}
                            </select>
                            <button className="btn btn-secondary mt-3" onClick={handleClick}>Run analysis</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-3 bg-color-blue"></div>
            </div>
        </div>
    )
}