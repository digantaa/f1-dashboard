export interface Driver {
  id: string;
  number: number;
  name: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
  countryCode: string;
  image: string;
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  points: number;
  color: string;
  logo: string;
  drivers: number[];
}

export interface Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  countryCode: string;
  date: string;
  status: 'completed' | 'upcoming' | 'live';
  winnerId?: string;
  poleId?: string;
}

export const TEAMS: Team[] = [
  { id: 't1', name: 'Red Bull Racing', points: 345, color: '#3671C6', logo: 'RBR', drivers: [1, 11] },
  { id: 't2', name: 'Ferrari', points: 312, color: '#E80020', logo: 'FER', drivers: [16, 44] },
  { id: 't3', name: 'McLaren', points: 298, color: '#FF8000', logo: 'MCL', drivers: [4, 81] },
  { id: 't4', name: 'Mercedes', points: 240, color: '#27F4D2', logo: 'MER', drivers: [63, 12] },
  { id: 't5', name: 'Aston Martin', points: 95, color: '#229971', logo: 'AST', drivers: [14, 18] },
];

export const DRIVERS: Driver[] = [
  { id: 'd1', number: 1, name: 'Max Verstappen', team: 't1', points: 195, wins: 5, podiums: 7, countryCode: 'NL', image: 'https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
  { id: 'd2', number: 16, name: 'Charles Leclerc', team: 't2', points: 160, wins: 2, podiums: 5, countryCode: 'MC', image: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
  { id: 'd3', number: 4, name: 'Lando Norris', team: 't3', points: 155, wins: 2, podiums: 6, countryCode: 'GB', image: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png' },
  { id: 'd4', number: 44, name: 'Lewis Hamilton', team: 't2', points: 152, wins: 1, podiums: 4, countryCode: 'GB', image: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' },
  { id: 'd5', number: 81, name: 'Oscar Piastri', team: 't3', points: 143, wins: 1, podiums: 4, countryCode: 'AU', image: 'https://media.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png' },
  { id: 'd6', number: 63, name: 'George Russell', team: 't4', points: 120, wins: 0, podiums: 2, countryCode: 'GB', image: 'https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png' },
  { id: 'd7', number: 12, name: 'Andrea Kimi Antonelli', team: 't4', points: 120, wins: 0, podiums: 1, countryCode: 'IT', image: 'https://media.formula1.com/d_driver_fallback_image.png.transform/2col/image.png' },
];

export const RACES: Race[] = [
  { id: 'r1', round: 1, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', countryCode: 'BH', date: '2026-03-01', status: 'completed', winnerId: 'd1', poleId: 'd1' },
  { id: 'r2', round: 2, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', countryCode: 'SA', date: '2026-03-08', status: 'completed', winnerId: 'd3', poleId: 'd2' },
  { id: 'r3', round: 3, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', countryCode: 'AU', date: '2026-03-22', status: 'completed', winnerId: 'd2', poleId: 'd4' },
  { id: 'r4', round: 4, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', countryCode: 'JP', date: '2026-04-05', status: 'completed', winnerId: 'd1', poleId: 'd1' },
  { id: 'r5', round: 5, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', countryCode: 'CN', date: '2026-04-19', status: 'completed', winnerId: 'd5', poleId: 'd3' },
  { id: 'r6', round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', countryCode: 'US', date: '2026-05-03', status: 'completed', winnerId: 'd4', poleId: 'd1' },
  { id: 'r7', round: 7, name: 'Emilia Romagna GP', circuit: 'Autodromo Enzo e Dino Ferrari', countryCode: 'IT', date: '2026-05-17', status: 'completed', winnerId: 'd1', poleId: 'd2' },
  { id: 'r8', round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', countryCode: 'MC', date: '2026-05-24', status: 'live', poleId: 'd2' },
  { id: 'r9', round: 9, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles-Villeneuve', countryCode: 'CA', date: '2026-06-07', status: 'upcoming' },
];

export const TELEMETRY_DATA = Array.from({ length: 60 }).map((_, i) => ({
  time: i,
  verstappenSpeed: 100 + Math.random() * 220,
  leclercSpeed: 100 + Math.random() * 218,
  norrisSpeed: 100 + Math.random() * 219,
}));
