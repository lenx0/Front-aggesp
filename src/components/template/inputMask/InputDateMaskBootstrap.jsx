import React, { useState } from "react";
import Moment from 'moment';

export default function DateMask() {
    const [value, onChange] = useState(new Moment().format('DD-MM-YYYY'));
    return (
        <div>
            <input className="form-control" onChange={onChange} value={value} />
        </div>
    );
};