import { retrieveData } from '@/logic/apiRequest';
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
    const [returnedData, setReturnedData] = useState<any[]>();

    useEffect(() => {
        retrieveData("_aliases/", "").then((returned)=> {
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
                    retrieveData(setCounty.replaceAll(" ", "_").toLowerCase() + "/", query).then((
                        returned
                    ) => {
                        setReturnedData(returned.hits.hits)
                    })
                }}
            >Submit</button>
            <br></br>
            {returnedData?.filter((curr) => (!curr._index.startsWith('.')))
                .map((curr) => {
                    console.log(curr)
                    return (<p key={curr._id.toString()}>{curr._source.crime_desc}</p>);
                })

            }
        </>
    )
}