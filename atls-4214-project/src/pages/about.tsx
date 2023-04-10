import { PausePresentationRounded } from '@mui/icons-material';
import { Paper, Typography,Grid } from '@mui/material';
import React from 'react'


export default function AboutPage() {
    return (
        <>
            <div
                style={{
                    padding: 15,
                    maxWidth: '80vw',
                    margin: 'auto'
                }}
            >
                <Paper 
                    elevation={3}
                    style={{
                        // maxWidth: '80vw',
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    <Typography
                        variant='h2'
                        textAlign='center'
                    >
                        About Crime Crunch
                    </Typography>
                </Paper>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={7}>
                        <Paper
                            elevation={3}
                            style={{
                                // maxWidth: '67vw',
                                margin: 'auto',
                                padding: '20px',
                                height: '250px'
                            }}
                        >
                            <Typography
                                variant='h3'
                                textAlign='left'
                            >
                                What is Crime Crunch?
                            </Typography>
                            <br></br>
                            <Typography
                                variant='body1'
                                textAlign='left'
                            >
                                Crime Crunch is an app designed to help Coloradans learn more about the different kinds of crimes
                                occurring across the state.  Utilizing data from the <a href="https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home">FBI Crime Data Explorer</a>,
                                <div style={{color: 'blue'}}> <b> wewo</b></div>
                            </Typography>
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <Paper
                            elevation={3}
                            style={{
                                // maxWidth: '67vw',
                                margin: 'auto',
                                padding: '20px',
                                height: '250px'
                            }}
                        >
                            <Typography
                                variant='h4'
                                textAlign='left'
                            >
                                Why did we make Crime Crunch?
                            </Typography>
                            <br></br>
                            <Typography
                                variant='body1'
                                textAlign='left'
                            >
                                With reports of crimes on the rise, particularly in the cases of hate crimes or those involving violence, 
                                it is important for residents to be aware and informed on what is happening around them. 
                            </Typography>
                            
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}