import React from 'react'

export default function Alert(props) {
    const capitalize = (word)=>{
        if (word==="danger") {
            word = "error";
        }
        let lowercase = word.toLowerCase();
        return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
    }
    return (
        <>
        <div style={{height:"60px"}}>
            {props.alert && <>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
                </div>
            </>}
        </div>
        </>
    )
}
