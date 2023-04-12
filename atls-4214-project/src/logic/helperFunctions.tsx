gexport function toTitleCase(input: String):String {
        return (
                input // Replace underscores with spaces
                .split(' ') //split on spaces
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //capitalize first letter
                .join(' ') //combine strings
                );
        }
        
        // population values courtesy of https://www.colorado-demographics.com/counties_by_population
        export function getPopulation(input: string):number {
                switch (input) {
                        case "Adams":
                                return 514969;
                        
                        case "Alamosa":
                                return 16377;
                        
                        case "Arapahoe":
                                return 651621;
                        
                        case "Archuleta":
                                return 13267;
                        
                        case "Baca":
                                return 3519;
                        
                        case "Bent":
                                return 5861;
                        
                        case "Boulder":
                                return 328713;
                        
                        case "Broomfield":
                                return 72697;
                        
                        case "Chaffee":
                                return 19436;
                        
                        case "Cheyenne":
                                return 1691;
                        
                        case "Clear Creek":
                                return 9427;
                        
                        case "Conejos":
                                return 7579;
                        
                        case "Crowley":
                                return 6018;
                        
                        case "Custer":
                                return 4720;
                        
                        case "Delta":
                                return 31133;
                        
                        case "Denver":
                                return 706799;
                        
                        case "Dolores":
                                return 2288;
                        
                        case "Douglas":
                                return 351929;
                        
                        case "Eagle":
                                return 55693;
                        
                        case "El Paso":
                                return 722736;
                        
                        case "Elbert":
                                return 25897;
                        
                        case "Fremont":
                                return 49007;
                        
                        case "Garfield":
                                return 61221;
                        
                        case "Gilpin":
                                return 5812;
                        
                        case "Grand":
                                return 15629;
                        
                        case "Gunnison":
                                return 16851;
                        
                        case "Hinsdale":
                                return 858;
                        
                        case "Huerfano":
                                return 6787;
                        
                        case "Jackson":
                                return 1375;
                        
                        case "Jefferson":
                                return 580130;
                        
                        case "Kiowa":
                                return 1414;
                        
                        case "Kit Carson":
                                return 7071;
                        
                        case "La Plata":
                                return 55673;
                        
                        case "Lake":
                                return 7417;
                        
                        case "Larimer":
                                return 354670;
                        
                        case "Las Animas":
                                return 14531;
                        
                        case "Lincoln":
                                return 5630;
                        
                        case "Logan":
                                return 21765;
                        
                        case "Mesa":
                                return 154685;
                        
                        case "Mineral":
                                return 794;
                        
                        case "Moffat":
                                return 13240;
                        
                        case "Montezuma":
                                return 25916;
                        
                        case "Montrose":
                                return 42328;
                        
                        case "Morgan":
                                return 28868;
                        
                        case "Not Specified":
                                return 1;
                        
                        case "Otero":
                                return 18665;
                        
                        case "Ouray":
                                return 4850;
                        
                        case "Park":
                                return 17384;
                        
                        case "Phillips":
                                return 4497;
                        
                        case "Pitkin":
                                return 17471;
                        
                        case "Prowers":
                                return 11966;
                        
                        case "Pueblo":
                                return 167453;
                        
                        case "Rio Blanco":
                                return 6495;
                        
                        case "Rio Grande":
                                return 11476;
                        
                        case "Routt":
                                return 24899;
                        
                        case "Saguache":
                                return 6369;
                        
                        case "San Juan":
                                return 698;
                        
                        case "San Miguel":
                                return 8084;
                        
                        case "Sedgwick":
                                return 2459;
                        
                        case "Summit":
                                return 31042;
                        
                        case "Teller":
                                return 24607;
                        
                        case "Washington":
                                return 4834;
                        
                        case "Weld":
                                return 322424;
                        
                        case "Yuma":
                                return 9944;
                }
                return -1;
        }