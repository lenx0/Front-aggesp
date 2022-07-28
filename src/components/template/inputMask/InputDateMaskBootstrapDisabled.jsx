import React, { useState } from "react";
import Moment from 'moment';

export default function DateMask() {
    const [value, onChange] = useState(new Moment().format('YYYY-MM-DD'));
    return (
        <div>
            <input className="form-control" disabled="true" type="date" onChange={onChange} value={value} />
        </div>
    );
};