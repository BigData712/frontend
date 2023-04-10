export interface CrimeData {
    county: String,
    id: number,
    incident_time: {
        incident_hour: number,
        incident_day: number,
        incident_month: number,
        incident_year: number
    },
    crime_desc: String,
    gun: Boolean,
    hate: Boolean,
    sex: Boolean,
    location: String,
    off_code: String
}

export enum Status {Initial, Loading, Succeeded, Failed}


export const colors = [
    "#99FCC8",
    "#ff9c5a",
    "#4caafd",
    "#f24775"
]