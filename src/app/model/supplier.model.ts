export interface Supplier {
  id : number ;
  name : string ;
  description : string ;
  rating : number;
  number_of_projects : number;
  sector: industrySector;
   website  : string;
   phone : string;
   email  : string;
}
export enum industrySector {
  Sector1 = 'Sector1',
  Sector2 = 'Sector2',
  Sector3 = 'Sector3',
  Sector4 = 'Sector4',
  Sector5 = 'Sector5',
  Sector6 = 'Sector6',
  Sector7 = 'Sector7',
  Sector8 = 'Sector8',
  Sector9 = 'Sector9',
  Sector10 = 'Sector10',
}
