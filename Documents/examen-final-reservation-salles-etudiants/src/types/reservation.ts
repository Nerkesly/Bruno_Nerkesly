export type Periode = "matin" | "apres-midi" | "soir";

export interface Salle {
  id: number;
  nom: string;
  capacite: number;
  equipements: string[];
}

export interface NouvelleReservation {
  salleId: number;
  nomResponsable: string;
  date: string;
  periode: Periode;
}

export interface Reservation {
  id: number;
  salleId: number;
  nomSalle: string;
  nomResponsable: string;
  date: string;
  periode: Periode;
  annulee: boolean;
}
