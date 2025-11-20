export type JeuxVideo = {
    id?: string;
    nom: string;
    platforme: string[];
    dateSortieinitial: Date;
    nombreCopieVendu:number;
    prix:number;
    developpeur:string[];
    editeur:string[];
    genre:string[];
    ESRB?:string;
    modeDeJeu: string[];
    dureeJeux:number;
    disponible:boolean;
    Metacritic?:number;
};