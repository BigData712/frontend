import { Select, MenuItem } from '@mui/material';
import React from 'react';

interface CountySelectorProps {
    counties: string[],
    selectedCounties: string[],
    setSelectedCounties: Function,
    idx: number
}

export default function CountySelector(props: CountySelectorProps) {

    return (
        <div
            style={{
                padding: '20px'
            }}
        >
            <Select
                value={props.selectedCounties[props.idx]}
                style={{
                    width: '15vw'
                }}
                onChange={(event: any) => {
                    let tempArr = [...props.selectedCounties];
                    tempArr[props.idx] = event.target.value;
                    props.setSelectedCounties(tempArr)
                }}
            >
                {
                    props.counties
                    .map((curr) => (<MenuItem value={curr} key={curr}>{curr}</MenuItem>))
                }
            </Select>
        </div>
    );
}