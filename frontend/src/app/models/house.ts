export interface HouseListItem {
    id: string;
    url: string;
    name: string;
    region: string;
    words: string;
}

export interface HouseDetails {
    id: string;
    url: string;
    name: string;
    region: string;
    coatOfArms: string;
    words: string;
    titles: string[];
    seats: string[];
    currentLord: string;
    heir: string;
    overlord: string;
    founded: string;
    founder: string;
    diedOut: string;
    ancestralWeapons: string[];
    cadetBranches: string[];
    swornMembers: string[];
}
