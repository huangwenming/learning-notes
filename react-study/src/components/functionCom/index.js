import React from 'react';
function FormatedDate(props) {
    return (<p>生日是 {props.date.toLocaleTimeString()}</p>);
}

export default  FormatedDate;
