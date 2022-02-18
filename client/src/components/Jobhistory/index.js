import React from 'react';

export default function Jobhistory({ oldJobs, setOldJobs }) {

    const handleDelete = (event) => {
        event.preventDefault();
        const toRemove = event.target.parentNode.parentNode.id
        setOldJobs(oldJobs.filter(job => job.id !== toRemove))
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newArray = oldJobs;
        let count = 0;
        let targeted = newArray.filter(each => each.id === event.target.parentNode.parentNode.parentNode.id);
        for(let i = 0; i < newArray.length; i++) {
            if(newArray[i].id === targeted[0].id) {
                count = i;
            }
        }        
        newArray[count][name] = value;
        setOldJobs(newArray);
    }

    return (
        <div onChange={handleChange}>
            {oldJobs.map((job) => (
                <div key={job.id} className="mb-3" id={job.id}>
                    <div className="row">
                        <button className="btn deletebutton" onClick={handleDelete}>
                        🗑
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="title" placeholder="Job Title" required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="company" placeholder="Company Name" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <textarea className="form-control" cols="50" rows="5" name="description" placeholder="Job Description" required></textarea>
                        </div>
                        <div className="col-md-3 pl-3">
                            <label htmlFor="startdate" className="row" required>Start Date</label>
                            <input className="form-control row" type="date" name="startdate" />
                        </div>
                        <div className="col-md-3 pl-3">
                            <label htmlFor="enddate" className="row" required>End Date</label>
                            <input className="form-control row" type="date" name="enddate" />
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}