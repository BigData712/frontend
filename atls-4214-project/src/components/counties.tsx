import { retrieveDataSQL } from '@/logic/apiRequest';
import { Select, MenuItem } from '@mui/material';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, LabelList } from 'recharts';
import data from '../pages/data';


export default function Counties() {
    const [counties, setCounties] = React.useState<any[]>([]);
    const [selectedCounty, setSelectedCounty] = React.useState<string>("Boulder");
    const [selectedCounty2, setSelectedCounty2] = React.useState<string>("Adams");
    const [selectedCounty3, setSelectedCounty3] = React.useState<string>("Jefferson");
    const [loadedData, setLoadedData] = React.useState<{key: string, doc_count: number}[]>([]);
    const [loadedData2, setLoadedData2] = React.useState<{key: string, doc_count: number}[]>([]);
    const [loadedData3, setLoadedData3] = React.useState<{key: string, doc_count: number}[]>([]);
    const [data, setData] = React.useState<any[]>([]);

    // Retrieves County list
    React.useEffect(() => {
        retrieveDataSQL("SHOW tables LIKE %").then(((returned) => {
            setCounties(
                Object.keys(returned).
                filter((curr) => (curr[0] !== '.')) // Remove opensearch options
                .map((curr) => (
                    curr.replaceAll('_', ' ') // Replace underscores with spaces
                    .split(' ') //split on spaces
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //capitalize first letter
                    .join(' ') //combine strings
                ))
                .sort() //alphabetize
            );
        }))
    }, [])

    //Retrieves data on change of county
    React.useEffect(() => {
        retrieveDataSQL(`SELECT * FROM ${selectedCounty.toLowerCase().replaceAll(" ", "_")} GROUP BY crime_desc`).then(((returned) => {
            setLoadedData(returned.aggregations["crime_desc.keyword"].buckets);
        }))
    }, [selectedCounty])
    React.useEffect(() => {
        retrieveDataSQL(`SELECT * FROM ${selectedCounty2.toLowerCase().replaceAll(" ", "_")} GROUP BY crime_desc`).then(((returned) => {
            setLoadedData2(returned.aggregations["crime_desc.keyword"].buckets);
        }))
    }, [selectedCounty2])
    React.useEffect(() => {
        retrieveDataSQL(`SELECT * FROM ${selectedCounty3.toLowerCase().replaceAll(" ", "_")} GROUP BY crime_desc`).then(((returned) => {
            setLoadedData3(returned.aggregations["crime_desc.keyword"].buckets);
        }))
    }, [selectedCounty3])

    React.useEffect(() => {
        if (loadedData.length > 0 && loadedData2.length > 0){
            const storage = [];
            for (let x = 0; x < 10; x++) {
                console.log(loadedData[x].key);
                storage.push({
                    name: loadedData[x].key,
                    d1: loadedData[x].doc_count,
                    d2: loadedData2.find((curr) => (curr.key === loadedData[x].key))?.doc_count,
                    d3: loadedData3.find((curr) => (curr.key === loadedData[x].key))?.doc_count,
                })
            }
            setData(storage);
        }
    }, [loadedData, loadedData2])

    let countySelector = (
        <Select
            value={selectedCounty}
            label="County"
            onChange={(event) => {
                setSelectedCounty(event.target.value)
            }}
        >
            {
                counties
                .map((curr) => (<MenuItem value={curr} key={curr}>{curr}</MenuItem>))
            }
        </Select>
    );

    let countySelector2 = (
        <Select
            value={selectedCounty2}
            label="County"
            onChange={(event) => {
                setSelectedCounty2(event.target.value)
            }}
        >
            {
                counties
                .map((curr) => (<MenuItem value={curr} key={curr}>{curr}</MenuItem>))
            }
        </Select>
    );
    let countySelector3 = (
        <Select
            value={selectedCounty3}
            label="County"
            onChange={(event) => {
                setSelectedCounty3(event.target.value)
            }}
        >
            {
                counties
                .map((curr) => (<MenuItem value={curr} key={curr}>{curr}</MenuItem>))
            }
        </Select>
    );

    return (
        <>
            <h1>Counties</h1> {countySelector} {countySelector2} {countySelector3}
            <BarChart width={1700} height={750} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="d1" fill="#8884d8" name={selectedCounty}/>
                <Bar dataKey="d2" fill="#82ca9d" name={selectedCounty2} />
                <Bar dataKey="d3" fill="#ca9d82" name={selectedCounty3} />
            </BarChart>
        </>
    );
}