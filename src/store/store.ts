import { create } from 'zustand';
import { DRIVERS, RACES, TEAMS, Driver, Team, Race } from '../lib/mockData';

interface F1State {
  drivers: Driver[];
  teams: Team[];
  races: Race[];
  currentRace: Race | null;
  season: number;
}

export const useF1Store = create<F1State>((set) => ({
  drivers: DRIVERS,
  teams: TEAMS,
  races: RACES,
  currentRace: RACES.find(r => r.status === 'live') || null,
  season: 2026,
}));
