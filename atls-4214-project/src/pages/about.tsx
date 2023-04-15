import { PausePresentationRounded } from '@mui/icons-material';
import { Paper, Typography, Grid, Button, Stack, Divider } from '@mui/material';
import Image from 'next/image';
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
                    elevation={2}
                    style={{
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
                <br/>
                <div
                    style={{
                        height: 'fit-content'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <Paper
                                elevation={3}
                                style={{
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '100%'
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    textAlign='center'
                                >
                                    What is Crime Crunch?
                                </Typography>
                                <Divider/> <br/>
                                <Typography
                                    variant='body1'
                                    textAlign='left'
                                >
                                    Crime Crunch is an app designed to help Coloradans learn more about the different kinds of crimes
                                    occurring across the state.  Utilizing data from the <a href="https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home">FBI Crime Data Explorer</a>,
                                    users can view crime statistics from the various counties in Colorado and compare how types of crime compare or how they number reported has changed over time.  
                                </Typography>
                                
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Paper
                                elevation={3}
                                style={{
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '100%'
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    textAlign='center'
                                >
                                    Why did we make Crime Crunch?
                                </Typography>
                                <Divider/> <br/>
                                <Typography
                                    variant='body1'
                                    textAlign='left'
                                >
                                    With reports of crimes on the rise, particularly in the cases of hate crimes and those involving violence, 
                                    it is important for residents to be aware and informed on what is happening around them. Part of this is 
                                    knowing current and historic trends to help inform actions taken, both in daily life and in politics. 
                                </Typography>
                                
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <Paper 
                    elevation={3}
                    style={{
                        margin: 'auto',
                        padding: '20px',
                        height: 'fit-content'
                    }}
                >
                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Where is the Data From?
                    </Typography>
                    <Divider/> <br/>
                    <Grid container alignItems="center">
                        <Grid item xs={6} md={5}>
                        <Typography 
                            variant="body1" 
                            align="left"
                        >
                            Data is collected from the FBI&apos;s Crime Data Explorer, which hosts data from the Natiognal Incident-Based Reporting System (NIBRS).  The data used spans the years 2016-2021 
                            as data stored in years prior to 2016 were stored with a different database schema.  The data was transformed into a standardized format and uploaded via curl to AWS 
                            OpenSearch.  At time of writing, this consists of 2.55 million records and is viewable on the <a href="https://crime-crunch-kwd2.onrender.com/data">RAW DATA</a> page. 
                            OpenSearch can then be queried with SQL.
                        </Typography>
                        <br/>
                        <Typography 
                            variant="body1" 
                            align="left"
                        >
                            OpenSearch has support for either SQL or their own query domain-specific language(DSL).  For this project, queries from the frontend are provided to the data store as SQL queries, 
                            which return the aggregated results back to the frontend to be used in visualization and comparison. 
                        </Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                        <div
                                style={{
                                    position: 'relative',
                                    width: '40vw',
                                    height: '30vh',
                                    margin: 'auto',
                                    textAlign: 'center'
                                }}
                            > 
                                <Image style={{height: "100%", width:"100%"}}  src={'/Datastore.png'} alt="Data Pipeline" fill objectFit='contain'/> 
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <br/>
                <Paper 
                    elevation={3}
                    style={{
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Viewing the Data
                    </Typography>
                    <Divider/> <br/>
                    <Typography
                        variant='body1'
                        textAlign='left'
                    >
                        Crime statistics based on the collected data can be viewed on the <a href="https://crime-crunch-kwd2.onrender.com/charts">CHARTS</a> page.  Using the interactive map, users can select 
                        which county they would like to view, up to three counties at at time.  The site will then query OpenSearch and display relevant statistics such as most
                        common crimes, most common crime locations, crime frequency by time of day, and volume of crimes year over year. These visualizations can help users get a 
                        better understanding of what kinds of crime are happening where and how their frequency may be changing over time. 
                    </Typography>
                </Paper>
                <br/>
                <Paper 
                    elevation={3}
                    style={{
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Technologies Used
                    </Typography>
                    <Divider/> <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '10vw',
                                        height: '10vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image loader={() => "https://opensearch.org/assets/opensearch-twitter-card.png"} style={{height: "100%", width:"100%"}}  src={'https://opensearch.org/assets/opensearch-twitter-card.png'} alt="OpenSearch" fill/> 
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '10vw',
                                        height: '10vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image src={'/next.svg'} alt="NextJS" fill/> 
                                    </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '11.5vw',
                                        height: '10vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                <Image loader={() => "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png"} style={{height: "100%", width:"100%"}}  src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'} alt="React" fill/> 
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '10vw',
                                        height: '10vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image loader={() => "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"} style={{height: "100%", width:"100%"}}  src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png'} alt="Python" fill/> 
                                
                                    </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '8vw',
                                        height: '8vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image loader={() => "https://cdn-icons-png.flaticon.com/512/25/25231.png"} style={{height: "100%", width:"100%"}}  src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'} alt="GitHub" fill/> 
                                
                                    </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '18vw',
                                        height: '9.45vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image loader={() => "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"} style={{height: "100%", width:"100%"}}  src={'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png'} alt="AWS" fill/> 
                                
                                    </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Paper
                                elevation={0}
                                style={{
                                    // maxWidth: '67vw',
                                    margin: 'auto',
                                    padding: '20px',
                                    height: '20vh'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '9vw',
                                        height: '9vw',
                                        margin: 'auto',
                                        textAlign: 'center'
                                    }}
                                > 
                                    <Image loader={() => "https://avatars.githubusercontent.com/u/42682871?s=200&v=4"} style={{height: "100%", width:"100%"}}  src={'https://avatars.githubusercontent.com/u/42682871?s=200&v=4'} alt="Render" fill/> 
                                
                                    </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
                <br/>
                <Paper 
                    elevation={3}
                    style={{
                        margin: 'auto',
                        padding: '20px'
                    }}
                >
                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Additional Resources
                    </Typography>
                    <Divider/> <br/>
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <Button href="https://github.com/BigData712">GitHub</Button>
                        <Button href="https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home">Data</Button>
                        <Button href="https://www.colorado-demographics.com/counties_by_population">CO Population Demographics</Button>
                        <Button href="https://ucr.fbi.gov/nibrs/2012/resources/nibrs-offense-definitions">NIBRS Offense Definitions</Button>
                        <Button href="https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/ucr/nibrs">NIBRS Resources</Button>
                    </Stack>
                </Paper>
                

            </div>
        </>
    );
}