import React from 'react';

export default function Education({ allEducation, setAllEducation }) {

    const handleDelete = (event) => {
        event.preventDefault();
        const toRemove = event.target.parentNode.parentNode.id
        setAllEducation(allEducation.filter(education => education.id !== toRemove))
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newArray = allEducation;
        let count = 0;
        let targeted = newArray.filter(each => each.id === event.target.parentNode.parentNode.id);
        for(let i = 0; i < newArray.length; i++) {
            if(newArray[i].id === targeted[0].id) {
                count = i;
            }
        }
        newArray[count][name] = value;
        setAllEducation(newArray);
    };

    return (
        <div onChange={handleChange}>
            {allEducation.map((each) => (
                <div className="col-md-6" key={each.id} id={each.id}>
                    <div className="row">
                        <button className="btn deletebutton" onClick={handleDelete}>
                        🗑
                        </button>
                    </div>
                    <div className="row mt-2 mr-1">
                        <input className="form-control" placeholder='Degree Earned (e.g. "GED", "Associates")' name="degree" />
                    </div>
                    <div className="row mt-2 mr-1">
                        <input className="form-control" placeholder='School Name' name="school" />
                    </div>
                    <div className="row mt-2 mr-1">
                        <input className="form-control" placeholder="Year Earned" name="year" />
                    </div>
                </div>
            ))}
                
        </div>
        
    )
}