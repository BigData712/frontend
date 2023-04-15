import BarGraph from '@/components/BarGraph';
import LineGraph from '@/components/LineGraph';
import CountyMap from '@/components/countyMap';
import CountySelector from '@/components/countySelector';
import Loading from '@/components/loading';
import { retrieveCountyList, retrieveDataSQL } from '@/logic/apiRequest';
import { Status } from '@/logic/types';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { FormControlLabel, FormGroup, IconButton, Paper, Switch, Typography } from '@mui/material'
import router from 'next/router';
import React from 'react'


export default function Charts() {
    // ** STATE **
    const [counties, setCounties] = React.useState<string[]>([]);
    const [countyStatus, setCountyStatus] = React.useState(Status.Initial);
    const [selectedCounties, setSelectedCounties] = React.useState<string[]>([]);
    const [perCapita, setPerCapita] = React.useState(true);

    // ** USE EFFECT **
    // Load County Options
    React.useEffect(() => {
       retrieveCountyList(setCounties, setCountyStatus);
    },[]);

    const maxCounties = 3;

    // ** VISUALIZATIONS LIST **
    const visualizations:React.ReactElement[] = [
        <BarGraph 
            key='top5 crime' 
            title='Top 5 Crimes by number reported'
            selectedCounties={selectedCounties}  
            sql='SELECT * FROM $CITY GROUP BY crime_desc'
            prefix={['aggregations','crime_desc.keyword','buckets']}
            width='38vw'
            height='45vh'
            limit={5}
            perCapita={perCapita}
        />,
        <BarGraph 
            key='top5 location' 
            title='Top 5 locations for crimes reported'
            selectedCounties={selectedCounties}  
            sql='SELECT * FROM $CITY GROUP BY loc_id'
            prefix={['aggregations','loc_id.keyword','buckets']}
            width='38vw'
            height='45vh'
            limit={5}
            perCapita={perCapita}
        />,
        <BarGraph 
            key='top hour' 
            title='crime reports grouped by hour of day'
            selectedCounties={selectedCounties}  
            sql='SELECT * FROM $CITY GROUP BY inc_time.inc_hour'
            prefix={['aggregations','inc_time.inc_hour','buckets']}
            width='77vw'
            height='45vh'
            limit={24}
            perCapita={perCapita}
            sort
        />,
        <LineGraph 
            key='year by year' 
            title='crime reports by year'
            selectedCounties={selectedCounties}  
            sql='SELECT * FROM $CITY GROUP BY inc_time.inc_year'
            prefix={['aggregations','inc_time.inc_year','buckets']}
            width='77vw'
            height='45vh'
            limit={6}
            perCapita={perCapita}
            sort
        />
    ]

   
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
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        position: 'relative'
                    }}
                >
                    <div>
                <Typography variant='h2' align='center'>Charts</Typography>
                <Typography variant='body1' align='center'>Select County of Interest:</Typography>
                </div>
                <FormControlLabel 
                    style={{position: 'absolute', right: 0}}
                            control={
                                <Switch 
                                    value={perCapita}
                                    defaultChecked
                                    onChange={(event) => {
                                        setPerCapita(event.target.checked)
                                    }} 
                                />
                            } 
                            label="Per Capita" 
                        />
                </div>
                            <div 
                                style={{
                                    maxWidth: "33vw",
                                    margin: 'auto'
                                }}
                            >
                            <CountyMap
                                
                                clickFunction={(event: any) => {
                                    event.preventDefault()
                                    if (selectedCounties.includes(event.target.id.replaceAll('-', ' '))) {
                                        setSelectedCounties(
                                            (selectedCounties.filter((curr) => curr != event.target.id.replaceAll('-', ' ')).length > 0) ? 
                                            (selectedCounties.filter((curr) => curr != event.target.id.replaceAll('-', ' '))) : 
                                            ([])
                                        );
                                    } else if (selectedCounties.length < maxCounties) {
                                        setSelectedCounties([... selectedCounties, event.target.id.replaceAll('-', ' ')])
                                    }
                                }}
                                selectedCounties={selectedCounties}
                                numMaxCounties={3}
                            />
                        </div>
                    <div>
                        
                </div>
            </Paper>
            </div>
            {(countyStatus !== Status.Succeeded) ? (
                <></>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '80vw',
                        margin: 'auto',
                        flexWrap: 'wrap'
                    }}
                >
                {visualizations}
                </div>
            )}
            
        </>
    );
}