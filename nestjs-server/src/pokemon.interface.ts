export interface Pokemon{
    id: number;
    name: string;
}

export interface PokemonListResponse{
    list: Pokemon[];
    totalCount : number;
}

