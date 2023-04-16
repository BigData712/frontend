import { retrieveDataSQL } from '@/logic/apiRequest';
import { getPopulation, toTitleCase } from '@/logic/helperFunctions';
import { Status, colors } from '@/logic/types';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import Loading from './loading';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface LineGraphProps {
    title: string,
    selectedCounties: string[],
    sql: string,
    prefix: string[],
    width?: string,
    height?: string,
    limit: number,
    perCapita: boolean,
    sort?:boolean,
}

function CustomizedTick(props: any) {
    const { x, y, stroke, payload, setNumLines, numLines, getLast } = props;

    const arrPayload = payload.value.toString().split(/[(\/)\s]+/);
    setNumLines(Math.max(numLines, arrPayload.length));
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fill="#666">
         {
            arrPayload.map((curr: any, idx: number) => (
                (getLast(payload.value)) ? (
                    <tspan key={curr} fontSize={14} textAnchor="middle" dx="-10" dy="20">
                        {curr}
                    </tspan>
                ) : (
                    <tspan key={curr} fontSize={14} textAnchor="middle" x="0" dy="20">
                        {curr}
                    </tspan>
                )
                
            ))
        }
        </text>
      </g>
    );
}

export default function LineGraph(props: LineGraphProps) {
    
    // ** STATE ** 
    const [rawData, setRawData] = React.useState<any[]>([]);
    const [processedData, setProcessedData] = React.useState<any[]>([]);
    const [requestStatus, setRequestStatus] = React.useState(Status.Initial);
    const [numLines, setNumLines] = React.useState(2);
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
        setTimeout(() => {
            const storage = []
            if (requestStatus === Status.Succeeded){
                console.log(rawData)
                if (props.selectedCounties.length === 1 && rawData.length === 1) {
                    const d1Pop = getPopulation(props.selectedCounties[0]);
                    for (let x = 0; x < Math.min(props.limit, rawData[0].length); x++) {
                        storage.push({
                            name: rawData[0][x].key,
                            d1: (props.perCapita) ? (rawData[0][x].doc_count/d1Pop) : (rawData[0][x].doc_count),
                        })
                    }
                } else if (props.selectedCounties.length === 2 && rawData.length === 2) {
                    const d1Pop = getPopulation(props.selectedCounties[0]);
                    const d2Pop = getPopulation(props.selectedCounties[1]);
                    for (let x = 0; x < Math.min(props.limit, rawData[0].length); x++) {
                        storage.push({
                            name: rawData[0][x].key,
                            d1: (props.perCapita) ? (rawData[0][x].doc_count/d1Pop) : (rawData[0][x].doc_count),
                            d2: (props.perCapita) ? (rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count/d2Pop) : (rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count),
                        })
                    }
                } else if (props.selectedCounties.length === 3 && rawData.length === 3) {
                    const d1Pop = getPopulation(props.selectedCounties[0]);
                    const d2Pop = getPopulation(props.selectedCounties[1]);
                    const d3Pop = getPopulation(props.selectedCounties[2]);
                    for (let x = 0; x < Math.min(props.limit, rawData[0].length); x++) {
                        storage.push({
                            name: rawData[0][x].key,
                            d1: (props.perCapita) ? (rawData[0][x].doc_count/d1Pop) : (rawData[0][x].doc_count),
                            d2: (props.perCapita) ? (rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count/d2Pop) : (rawData[1].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count),
                            d3: (props.perCapita) ? (rawData[2].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count/d3Pop) : (rawData[2].find((curr:any) => (curr.key === rawData[0][x].key))?.doc_count),
                        })
                    }
                }
            }
            if (props.sort) {
                storage.sort((a,b) => (a.name < b.name) ? -1 : 0)
            }
            setProcessedData(storage);
        }, 100);
    }, [rawData])

    function getLast(value:string) {
        return (rawData.length > 0) ? (rawData[0][rawData.length-1].key === value) : (false)
    }

    return (
        <div style={{
            padding: 15,
        }}>
            <Paper
                elevation={3}
                style={{
                    margin: 'auto',
                    padding: '10px',
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
                    <ResponsiveContainer width="95%" height="95%" >
                        <LineChart margin={{ top: 10, left: 10, right: 10, bottom: 10 }} data={processedData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis width={200} dataKey="name" height={20+(30*numLines)} interval={0} tick={<CustomizedTick setNumLines={setNumLines} numLines={numLines} getLast={getLast}/>}/>
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top"/>
                            {props.selectedCounties.map((curr, idx) => (
                                <Line dataKey={`d${idx+1}`} key={props.selectedCounties[idx]} stroke={colors[idx]} name={curr} strokeWidth={10}/>
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Paper>
        </div>
    );
}