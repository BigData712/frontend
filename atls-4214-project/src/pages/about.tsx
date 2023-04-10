import { Paper, Typography } from '@mui/material';
import React from 'react'


export default function AboutPage() {
    return (
        <>
            <div
                style={{
                    padding: 15
                }}
            >
                <Paper 
                    elevation={3}
                    style={{
                        maxWidth: '67vw',
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    <Typography
                        variant='h2'
                        textAlign='center'
                    >
                        About
                    </Typography>
                </Paper>
            </div>
        </>
    );
}