import { retrieveDataDSL, retrieveDataSQL } from '@/logic/apiRequest';
import React, { useEffect, useState } from 'react';


export default function ApiTest() {
    const [counties, setCounties] = useState<String[]>([]);
    const [setCounty, setSetCounty] = useState<String>("");
    const [query, setQuery] = useState<String>(`{
        "query": {
            "match_all": {
            }
        }
    }`);
    const [querySQL, setQuerySQL] = useState<String>(`{
        "query": "SHOW tables LIKE %"
        }`);
    const [returnedData, setReturnedData] = useState<any[]>();
    const [returnedDataSQL, setReturnedDataSQL] = useState<any[]>();

    useEffect(() => {
        retrieveDataDSL("_aliases/", "").then((returned)=> {
            let mainArr = Object.keys(returned) //Get only keys (city names)
                            .filter((curr) => (curr[0] !== '.')) // Remove opensearch options
                            .map((curr) => (
                                curr.replaceAll('_', ' ') // Replace underscores with spaces
                                .split(' ') //split on spaces
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //capitalize first letter
                                .join(' ') //combine strings
                            ))
                            .sort(); //alphabetize
            setCounties(mainArr); //save
        })
    }, []);



    return (
        <>
        <h1>SQL</h1>
        <h2>Query:</h2>
            <textarea
                rows={12}
                value={querySQL.toString()}
                onChange={(event) => {
                    setQuerySQL(event.target.value);
                }}/>
            <br></br>
            <button
                onClick={() => {
                    retrieveDataSQL(querySQL).then((
                        returned
                    ) => {
                        setReturnedDataSQL(returned)
                    })
                }}
            >Submit</button>
            <br></br>
            {JSON.stringify(returnedDataSQL)}
        <h1>DSL</h1>
            {(counties.length > 0) ? (<h1>County:</h1>) : (<h1>Loading Counties</h1>)}
            <select value={setCounty.toString()} onChange={(event) => {
                setSetCounty(event.target.value);
            }}>
                {
                    counties.map((curr) => (
                        <option key={curr as React.Key} value={curr.toString()}>{curr}</option>
                    ))
                }
                
            </select>
            
            <h2>Query:</h2>
            <textarea
                rows={12}
                value={query.toString()}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}/>
            <br></br>
            <button
                onClick={() => {
                    retrieveDataDSL(setCounty.replaceAll(" ", "_").toLowerCase(), query).then((
                        returned
                    ) => {
                        setReturnedData(returned.hits.hits)
                    })
                }}
            >Submit</button>
            <br></br>
            {returnedData?.filter((curr) => (!curr._index.startsWith('.')))
                .map((curr) => {
                    return (<p key={curr._id.toString()}>{curr._source.crime_desc}</p>);
                })

            }
        </>
    )
}