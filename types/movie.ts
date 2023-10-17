export interface Movie {
    id: number;
    url: string;
    description: string;
    name: string;
    genres?: Genre[];
    score?: Score[];
}

export type Genre = {
    id: number
    name: string;
    visible: any;
};

export type Score = {
    id: number;
    score: number;
}