import React, { useState } from 'react';

export default function Jobs() {

    const [templateComplete, setTemplateComplete] = useState(false);

    function hanldeConvert() {
        const theText = document.getElementById('jobinput').value.trim();
        console.log(theText);
    }

    return (
        <div className="container bg-color-lightgray">
            <div className="row">
                <h2 className="m-3">Job Template Converter</h2>
            </div>
            <div className="row">
                <div className="col-md-6 ">
                    <label htmlFor="textinput">Paste Job info here!</label>
                    <textarea className='form-control mb-3 jobinput' rows="10" id="jobinput" name="textinput"/>
                </div>
                <div className="col-md-6 verticallink">
                    <label htmlFor="textinput">Job Template</label>
                    <textarea className='form-control mb-3 jobinput' rows="10" name="textinput"/>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-secondary m-3" onClick={() => hanldeConvert()}>Create Template</button>
            </div>
        </div>
    )
}