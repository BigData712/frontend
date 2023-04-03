import { Status } from '@/logic/types';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

interface LoadingProps {
    status: Status
}

export default function Loading(props: LoadingProps) {
    if (props.status === Status.Initial || props.status === Status.Loading) {
        return (
            <div style={{textAlign: 'center', display: 'flex',  height: '250px'}}>
                <div style={{margin: 'auto'}} >
                    <CircularProgress />
                    <Typography variant="h5">
                    Loading Data
                    </Typography>
                </div>
            </div>
        );
    } else if (props.status === Status.Failed) {
        return (
            <div style={{textAlign: 'center', display: 'flex',  height: '250px'}}>
                <div style={{margin: 'auto'}} >
                    <ErrorIcon color='error' style={{width: "5vh", height: 'auto'}}/>
                    <Typography variant="h5">
                    An Error Occured Loading Data
                    </Typography>
                </div>
            </div>
        );
    } else {
        return (<></>);
    } 

}