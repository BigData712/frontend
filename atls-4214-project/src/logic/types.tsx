export interface CrimeData {
    county: String,
    id: Number,
    incident_time: {
        incident_hour: Number,
        incident_day: Number,
        incident_month: Number,
        incident_year: Number
    },
    crime_desc: String,
    gun: Boolean,
    hate: Boolean,
    sex: Boolean,
    location: String,
    off_code: String
}