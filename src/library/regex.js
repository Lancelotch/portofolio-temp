import React from 'react';

export const convertToCategoryName = (string) => {
    return <span style={{textTransform:"capitalize"}}>{string.replace(/[.*+?^${}()|[\]\\-]/g, ' ')}</span>
}

export const regexEmail = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const regexName = RegExp(/(?=.*[a-zA-Z])[a-zA-Z .]+$/)
export const regexPassword = RegExp(/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/);