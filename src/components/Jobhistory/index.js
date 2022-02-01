import React, { useState } from 'react';

export default function Jobhistory({ oldJobs, setOldJobs }) {

    const handleDelete = (event) => {
        event.preventDefault();
        const toRemove = event.target.parentNode.parentNode.id
        setOldJobs(oldJobs.filter(job => job.id !== toRemove))
    }

    return (
        <div>
            {oldJobs.map((job) => (
                <div key={job.id} className="mb-3" id={job.id}>
                    <div className="row">
                        <button className="btn deletebutton" onClick={handleDelete}>
                        🗑
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="title" placeholder="Job Title" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="company" placeholder="Company Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <textarea className="form-control" cols="50" rows="5" name="description" placeholder="Job Description"></textarea>
                        </div>
                        <div className="col-md-2 ml-3">
                            <label htmlFor="startdate" className="row">Start Date</label>
                            <input className="form-control row" type="date" name="startdate" />
                        </div>
                        <div className="col-md-2 ml-3">
                            <label htmlFor="enddate" className="row">End Date</label>
                            <input className="form-control row" type="date" name="enddate" />
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}