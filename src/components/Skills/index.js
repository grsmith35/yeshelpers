import React from 'react';

export default function Payroll({ allSkills, setAllSkills }) {

    const handleDelete = (event) => {
        event.preventDefault();
        const toRemove = event.target.parentNode.parentNode.id
        setAllSkills(allSkills.filter(skill => skill.id !== toRemove))
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newArray = allSkills;
        let count = 0;
        let targeted = newArray.filter(each => each.id == event.target.parentNode.parentNode.id);
        for(let i = 0; i < newArray.length; i++) {
            if(newArray[i].id === targeted[0].id) {
                count = i;
            }
        }
        newArray[count][name] = value;
        setAllSkills(newArray);
    };

    return (
        <div onChange={handleChange}>
            {allSkills.map((each) => (
                
                    <div className="row" key={each.id} id={each.id}>
                        <div className="col-md-6">
                            <input className="form-control" name="skill" placeholder='Skill (e.g. "Forklift", "Lead experience")' />
                        </div>
                        <div className="col-md-2">    
                            <button className="btn deletebutton" onClick={handleDelete}>
                                🗑
                            </button>
                    </div>
                </div>
            ))}
        </div>
        
    )
}