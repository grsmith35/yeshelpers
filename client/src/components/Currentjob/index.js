import React from 'react';

export default function CurrentJob({ jobInfo, setJobInfo }) {

    const handleChange = (event) => {
        const { name, value } = event.target
        setJobInfo({
            ...jobInfo,
            [name]: value
        })
    }

    return (
        <div onChange={handleChange}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <input type="text" name="title" className="form-control" placeholder="Job Title" />
                </div>
                <div className="col-md-6">
                    <input type="text" name="company" className="form-control" placeholder="Company" />
                </div>
            </div>
            <div className="row">
                <div className=" col-md-6">
                    <textarea name="description" cols="50" rows="5" placeholder="Job Summary" className="form-control mt-3" />
                </div>
                <div className="col-md-3">
                    <div className="row">
                        <label htmlFor="dateinputfield" className="mx-3">Start Date</label>
                    </div>
                    <div className="row">
                        <input type="date" name="startdate" id="dateinputfield" className="form-control mx-3" />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}