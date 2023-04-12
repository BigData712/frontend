import { retrieveDataDSL, retrieveDataSQL } from '@/logic/apiRequest';
import Image from 'next/image';
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
    const [querySQL, setQuerySQL] = useState<String>(`SHOW tables LIKE %`);
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
        <svg width="100%" height="100%" viewBox="0 0 3840 2160" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}}>
            <a href="x" onClick={(event) => {
                event.preventDefault();
                console.log('ayyo')
                }}
            ><path fill="#f00" d="M2793.12,300L682.989,300L682.989,2037.49L2793.12,2037.49L2793.12,1644.45L2348.79,1644.45L2348.79,804.639L2793.12,804.639L2793.12,300Z"/></a>
            <path fill="#0f0tg" d="M2793.12,2037.49L3648.55,2037.49L3648.55,300L2793.12,300L2793.12,804.639L2348.79,804.639L2348.79,1644.45L2793.12,1644.45L2793.12,2037.49Z"/>
        </svg>
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