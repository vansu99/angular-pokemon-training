interface PokemonBase {
  Attack: number;
  HP: number;
  Defense: number;
  SpAttack: number;
  SpDefense: number;
  Speed: number;
}

interface PokemonName {
  chinese: string;
  english: string;
  french: string;
  japanese: string;
}

export interface PokemonList {
  base: PokemonBase;
  id: number | string;
  img: string;
  name: PokemonName;
  type: string[];
}
