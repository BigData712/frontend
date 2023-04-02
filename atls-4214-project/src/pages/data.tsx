import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { retrieveData } from '@/logic/apiRequest';
import { CrimeData } from '@/logic/types';
import { toTitleCase } from '@/logic/helperFunctions';
import moment from 'moment';
import { TableFooter, TablePagination } from '@mui/material';

let numPerPage = 25;

function getData(pageNumber: number, county: String, setSavedData: Function) {
    retrieveData(county, `
    {
        "from": ${(pageNumber * numPerPage)},
        "size": ${numPerPage},
        "query": {
    
            "match_all": {
            }
        }
    }
    `).then((returned)=> {
        let mainArr = returned.hits.hits
        const storage:CrimeData[] = []
        mainArr.forEach((curr:any) => {
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
        });
        setSavedData(storage); //save
    })
}

export default function DataViewer() {
    // STATE VARS
    const [pageNumber, setPageNumber] = React.useState(0);
    const [data, setData] = React.useState<CrimeData[]>([]);



    // USE EFFECT
    React.useEffect(() => {
        getData(pageNumber, "boulder", setData)
    }, [pageNumber])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
            <TablePagination 
                page={pageNumber} 
                onPageChange={(_, page) => {
                    console.log(page)
                    setPageNumber(Number(page));
                }} 
                count={-1} 
                rowsPerPage={numPerPage}
                rowsPerPageOptions={[-1]}
            />
          <TableRow>
            <TableCell>Incident ID</TableCell>
            <TableCell align="right">County</TableCell>
            <TableCell align="right">Time Occurred</TableCell>
            <TableCell align="right">Criminal Act Description</TableCell>
            <TableCell align="right">Location Type</TableCell>
            <TableCell align="right">Offense Code</TableCell>
            <TableCell align="right">Gun Violence</TableCell>
            <TableCell align="right">Sex Crime</TableCell>
            <TableCell align="right">Hate Crime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={String(row.id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {String(row.id)}
              </TableCell>
              <TableCell align="right">{toTitleCase(row.county)}</TableCell>
              <TableCell align="right">{moment(`${row.incident_time.incident_year} + ${row.incident_time.incident_month} + ${row.incident_time.incident_day} + ${row.incident_time.incident_hour}`, "YYYYMMDDHH").format('LLL')}</TableCell>
              <TableCell align="right">{row.crime_desc}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.off_code}</TableCell>
              <TableCell align="right">{(row.gun) ? ("Yes") : ("No")}</TableCell>
              <TableCell align="right">{(row.sex) ? ("Yes") : ("No")}</TableCell>
              <TableCell align="right">{(row.hate) ? ("Yes") : ("No")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
            

        </TableFooter>
      </Table>
    </TableContainer>
  );
}