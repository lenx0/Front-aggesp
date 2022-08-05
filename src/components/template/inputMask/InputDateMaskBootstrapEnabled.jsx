import React, { useState } from "react";
import Moment from 'moment';

export default function DateMask() {
    const [value, onChange] = useState(new Moment());
    return (
        <div>
            <input className="form-control" mask="99-99-9999" type="date" onChange={onChange} value={value} />
            
        </div>
    );
};