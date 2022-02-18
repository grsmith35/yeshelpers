import React from 'react';

export default function Personal({ myInfo, setMyInfo }) {
    const handleChange = (event) => {
        const { name, value } = event.target;

        setMyInfo({
            ...myInfo,
            [name]: value
        })
    }

    const states = [
    "Select a State",
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    " North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"]

    return (
        <div onChange={handleChange}>
            <h3 className="mt-3">Personal Information</h3>
            <div className="row mt-3">
                <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Full Name" name="fullname" className="form-control"  required/>
                </div>
                <div className="col-md-6 mb-3">
                    <input type="tel" placeholder="Phone Number" name="number" className="form-control" required/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <input type="text" placeholder="Address" name="address" className="form-control" required/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <input type="text" placeholder="City" name="city" className="form-control" required/>
                </div>
                <div className="col-md-3 mb-3">
                    <select name="state" className="form-select form-select-lg form-control" required>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <input type="text" placeholder="Zip Code" name="zip" className="form-control" required/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <input type="text" placeholder="Email Address" name="email" className="form-control" required/>
                </div>
            </div>
            <hr />
        </div>
    )
}