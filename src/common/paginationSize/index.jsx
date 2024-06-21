import React from 'react';
import {MenuItem, Select, useMediaQuery} from "@mui/material";

const PaginationSize = ({handleChange, value = 20}) => {
    const matches = useMediaQuery('(max-width:768px)');
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            sx={{
                '&.MuiInputBase-root': {
                    height: matches ? '30px !important' : '32px !important'
                }
            }}
            onChange={handleChange}
        >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
        </Select>
    );
};

export default PaginationSize;