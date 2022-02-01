import React from 'react';

export default function Education({ education, setEducation }) {

    const handleDelete = (event) => {
        event.preventDefault();
        const toRemove = event.target.parentNode.parentNode.id
        setEducation(education.filter(education => education.id !== toRemove))
    }

    return (
        <div className="col-md-6">
            <div className="row">
                    <button className="btn deletebutton" onClick={handleDelete}>
                    🗑
                    </button>
                </div>
            <div className="row mt-2 mr-1">
                <input className="form-control" placeholder='Degree Earned (e.g. "GED", "Associates")' name="earned" />
            </div>
            <div className="row mt-2 mr-1">
                <input className="form-control" placeholder='School Name' name="school" />
            </div>
            <div className="row mt-2 mr-1">
                <input className="form-control" placeholder="Year Earned" name="year" />
            </div>
        </div>
    )
}