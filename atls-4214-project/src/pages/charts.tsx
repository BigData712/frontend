import BarGraph from '@/components/BarGraph';
import CountySelector from '@/components/countySelector';
import Loading from '@/components/loading';
import { retrieveCountyList, retrieveDataSQL } from '@/logic/apiRequest';
import { Status } from '@/logic/types';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { IconButton, Paper, Typography } from '@mui/material'
import React from 'react'


export default function Charts() {
    // ** STATE **
    const [counties, setCounties] = React.useState<string[]>([]);
    const [countyStatus, setCountyStatus] = React.useState(Status.Initial);
    const [selectedCounties, setSelectedCounties] = React.useState<string[]>(["Boulder"]);

    // ** USE EFFECT **
    // Load County Options
    React.useEffect(() => {
       retrieveCountyList(setCounties, setCountyStatus);
    },[]);

    // ** VISUALIZATIONS LIST **
    const visualizations:React.ReactElement[] = [
        // <BarGraph 
        //     key='top 5 crinmes' 
        //     title='Top 5 crimes'
        //     selectedCounties={selectedCounties} 
        //     sql="SELECT * FROM $CITY"
        //     prefix='hits.hits'
        //     width='35vw'
        //     height='33vh'
        //     limit={5}
        // />,
        <BarGraph 
            key='top5 crime' 
            title='Top 5 Crimes by number reported'
            selectedCounties={selectedCounties}  
            sql='SELECT * FROM $CITY GROUP BY crime_desc'
            prefix={['aggregations','crime_desc.keyword','buckets']}
            width='38vw'
            height='45vh'
            limit={5}
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
                <Typography variant='h2' align='center'>Charts</Typography>
                <Typography variant='body1' align='center'>Select County of Interest:</Typography>
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    {selectedCounties.map((curr, idx) => (
                        <CountySelector 
                            key={idx} 
                            counties={counties} 
                            selectedCounties={selectedCounties} 
                            setSelectedCounties={setSelectedCounties}
                            idx={idx} 
                        />
                    ))}
                    <div>
                    <IconButton 
                        color= 'primary'
                        onClick={() => {
                            setSelectedCounties(selectedCounties.splice(0,selectedCounties.length-1))
                        }}
                        disabled = {selectedCounties.length <= 1}
                    >
                        <RemoveCircle />
                    </IconButton>
                    <IconButton 
                        color= 'primary'
                        onClick={() => {
                            //get not selected county list
                            const notSelected = counties.filter((curr) => (!selectedCounties.includes(curr)));
                            setSelectedCounties([...selectedCounties, notSelected[Math.floor(Math.random() * notSelected.length)]]);
                        }}
                        disabled = {selectedCounties.length >= 3}
                    >
                        <AddCircle />
                    </IconButton>
                    </div>
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