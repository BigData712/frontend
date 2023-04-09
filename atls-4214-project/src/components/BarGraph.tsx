import { retrieveDataSQL } from '@/logic/apiRequest';
import { toTitleCase } from '@/logic/helperFunctions';
import { Status, colors } from '@/logic/types';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import Loading from './loading';
import data from '@/pages/data';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';

interface BarGraphProps {
    title: string,
    selectedCounties: string[],
    sql: string,
    prefix: string[],
    width?: string,
    height?: string,
    limit: number,
    
}

export default function BarGraph(props: BarGraphProps) {
    // ** STATE ** 
    const [rawData, setRawData] = React.useState<any[]>([]);
    const [processedData, setProcessedData] = React.useState<any[]>([]);
    const [requestStatus, setRequestStatus] = React.useState(Status.Initial);

    // ** USE EFFECT **
    React.useEffect(() => {
        setRawData(Array(props.selectedCounties.length).fill([]))
    }, [props.selectedCounties])
    React.useEffect(() => {
        const getData = async () => {
            setRequestStatus(Status.Loading)
            //Retrieve needed data
            let err = false
            const storage:any[] = []
            for (const county of props.selectedCounties) {
                await retrieveDataSQL(props.sql.replaceAll('$CITY', county.toLowerCase().replaceAll(' ', '_')))
                    .then((response) => {
                        // Process data
                        function index(obj:any,i:any) {
                            return obj[i]
                        }
                        storage.push(props.prefix.reduce(index, response));
                    })
                    .catch((error) => {
                        err = true
                    })
            }
            console.log('yo')
            if (err) {
                setRequestStatus(Status.Failed)
            } else {
                setRawData(storage)
                setRequestStatus(Status.Succeeded)
            }
        }
        
        getData();
    }, [props])
    React.useEffect(() => {
        const storage = []
        if (requestStatus === Status.Succeeded){
            if (props.selectedCounties.length === 1) {
                for (let x = 0; x < props.limit; x++) {
                    storage.push({
                        name: rawData[0][x].key,
                        d1: rawData[0][x].doc_count,
                    })
                }
            } else if (props.selectedCounties.length === 2) {
                console.log('2')
                for (let x = 0; x < props.limit; x++) {
                    storage.push({
                        name: rawData[0][x].key,
                        d1: rawData[0][x].doc_count,
                        d2: rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count,
                    })
                }
            } else if (props.selectedCounties.length === 3) {
                for (let x = 0; x < props.limit; x++) {
                    storage.push({
                        name: rawData[0][x].key,
                        d1: rawData[0][x].doc_count,
                        d2: rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count,
                        d3: rawData[2].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count,
                    })
                }
            }
        }
        console.log(storage);
        setProcessedData(storage);
    }, [rawData])

    return (
        <div style={{
            padding: 15,
        }}>
            <Paper
                elevation={3}
                style={{
                    margin: 'auto',
                    padding: '20px',
                    width: props.width,
                    height: props.height
                }}
            >
                <Typography 
                    variant='h5'
                    textAlign={'center'}
                >
                    {toTitleCase(props.title)}
                </Typography>
                {(
                    requestStatus !== Status.Succeeded
                ) ? (
                    <Loading status={requestStatus}/>
                ) : (
                    <ResponsiveContainer width="95%" height="95%">
                        <BarChart data={processedData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {props.selectedCounties.map((curr, idx) => (
                                <Bar dataKey={`d${idx+1}`} key={props.selectedCounties[idx]} fill={colors[idx]} name={curr}/>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Paper>
        </div>
    );
}