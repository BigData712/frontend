import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { retrieveData } from '@/logic/apiRequest';
import { CrimeData, Status } from '@/logic/types';
import { toTitleCase } from '@/logic/helperFunctions';
import moment from 'moment';
import { TableFooter, TablePagination, TextField } from '@mui/material';
import Loading from '@/components/loading';
import { debounce } from 'lodash';

let numPerPage = 25;

function getData(pagenumber: number, county: String, setSavedData: Function, setDataStatus: Function, setHits: Function) {
    setDataStatus(Status.Loading);
    retrieveData(county, `
    {
        "from": ${(pagenumber * numPerPage)},
        "size": ${numPerPage},
        "track_total_hits": "true",
        "query": {
    
            "match_all": {
            }
        }
    }
    `).then((returned)=> {
        setHits(returned.hits.total.value)
        let mainArr = returned.hits.hits
        const storage:CrimeData[] = []
        mainArr.forEach((curr:any) => {
            if (!curr._index.startsWith(".")){
            let newCrimeData: CrimeData = {
                county: curr._index,
                id: curr._id,
                incident_time: {
                    incident_hour: curr._source.inc_time.inc_hour,
                    incident_day: curr._source.inc_time.inc_day,
                    incident_month: curr._source.inc_time.inc_month,
                    incident_year: curr._source.inc_time.inc_year
                },
                crime_desc: curr._source.crime_desc,
                gun: curr._source.gun_violence,
                hate: curr._source.hate_crime,
                sex: curr._source.sex_crime,
                location: curr._source.loc_id,
                off_code: curr._source.off_code
            }
            storage.push(newCrimeData);
        }
        });
        setDataStatus(Status.Succeeded);
        setSavedData(storage); //save
    }).catch(() => {
        setDataStatus(Status.Failed);
    })
}

function searchData(pagenumber: number, county: String, setSavedData: Function, setDataStatus: Function, setHits: Function, search: String) {
  setDataStatus(Status.Loading);
    retrieveData(county, `
    {
        "from": ${(pagenumber * numPerPage)},
        "size": ${numPerPage},
        "track_total_hits": "true",
        "query": {
            "query_string": {
              "query": "${search}"
            }
        }
    }
    `).then((returned)=> {
        setHits(returned.hits.total.value)
        let mainArr = returned.hits.hits
        const storage:CrimeData[] = []
        mainArr.forEach((curr:any) => {
            if (!curr._index.startsWith(".")){
            let newCrimeData: CrimeData = {
                county: curr._index,
                id: curr._id,
                incident_time: {
                    incident_hour: curr._source.inc_time.inc_hour,
                    incident_day: curr._source.inc_time.inc_day,
                    incident_month: curr._source.inc_time.inc_month,
                    incident_year: curr._source.inc_time.inc_year
                },
                crime_desc: curr._source.crime_desc,
                gun: curr._source.gun_violence,
                hate: curr._source.hate_crime,
                sex: curr._source.sex_crime,
                location: curr._source.loc_id,
                off_code: curr._source.off_code
            }
            storage.push(newCrimeData);
        }
        });
        setDataStatus(Status.Succeeded);
        setSavedData(storage); //save
    }).catch(() => {
        setDataStatus(Status.Failed);
    })
}

const searchDataDebounced = debounce((
  pagenumber: number, 
  county: String, 
  setSavedData: Function, 
  setDataStatus: Function, 
  setHits: Function, 
  search: String
) => {
  searchData(
    pagenumber,
    county, 
    setSavedData, 
    setDataStatus, 
    setHits, 
    search
  );
}, 500, { leading: false });

export default function DataViewer() {
    // STATE VARS
    const [pagenumber, setPagenumber] = React.useState(0);
    const [data, setData] = React.useState<CrimeData[]>([]);
    const [dataStatus, setDataStatus] = React.useState(Status.Initial);
    const [hits, setHits] = React.useState<number>(0);
    const [search, setSearch] = React.useState<String>("");
    const [prevSearch, setPrevSearch] = React.useState<String>("");


    // USE EFFECT
    React.useEffect(() => {
      let localPageNumber = pagenumber
      if ((prevSearch == "" && search != "") || (prevSearch != "" && search == "")) {
        console.log(prevSearch, search, prevSearch == "" && search != "")
        setPagenumber(0);
        localPageNumber = 0
      }
      setPrevSearch(search);
      if (search == "") {
        getData(localPageNumber, "", setData, setDataStatus, setHits);
      } else {
        searchDataDebounced(localPageNumber, "", setData, setDataStatus, setHits, search);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, pagenumber])

    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
        <TableCell colSpan={6}>
          <TextField
            id="filled-search"
            label="Search data"
            type="search"
            variant="outlined"
            fullWidth
            value = {search}
            onChange={(event) => {
              setSearch(event.target.value)
            }}
          />
        </TableCell>
            <TablePagination 
                page={pagenumber} 
                onPageChange={(_, page) => {
                    setPagenumber(page);
                }} 
                count={hits} 
                rowsPerPage={numPerPage}
                rowsPerPageOptions={[-1]}
            />
          <TableRow>
            <TableCell>Incident ID</TableCell>
            <TableCell >County</TableCell>
            <TableCell >Time Occurred</TableCell>
            <TableCell >Criminal Act Description</TableCell>
            <TableCell >Location Type</TableCell>
            <TableCell >Offense Code</TableCell>
            <TableCell >Gun Violence</TableCell>
            <TableCell >Sex Crime</TableCell>
            <TableCell >Hate Crime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {(dataStatus !== Status.Succeeded) ? (
                <TableCell colSpan={10}>
                <Loading status={dataStatus}/>
                </TableCell>
            ) : (
          data?.map((row) => (
            <TableRow
              key={String(row.id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {String(row.id)}
              </TableCell>
              <TableCell >{toTitleCase(row.county)}</TableCell>
              <TableCell >{moment(`${row.incident_time.incident_year} + ${row.incident_time.incident_month} + ${row.incident_time.incident_day} + ${row.incident_time.incident_hour}`, "YYYYMMDDHH").format('LLL')}</TableCell>
              <TableCell >{row.crime_desc}</TableCell>
              <TableCell >{row.location}</TableCell>
              <TableCell >{row.off_code}</TableCell>
              <TableCell >{(row.gun) ? ("Yes") : ("No")}</TableCell>
              <TableCell >{(row.sex) ? ("Yes") : ("No")}</TableCell>
              <TableCell >{(row.hate) ? ("Yes") : ("No")}</TableCell>
            </TableRow>
          )))}
        </TableBody>
        <TableFooter>
            

        </TableFooter>
      </Table>
    </TableContainer>
  );
}