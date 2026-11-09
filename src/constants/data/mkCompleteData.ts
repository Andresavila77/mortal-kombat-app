export type CharacterType = "fighter" | "boss" | "secret";

export interface Character {
  id: string;
  name: string;
  origin: string;
  bio: string;
  powers: string[];
  weapon: string;
  alignment: string;
  fatality: string;
  babality: string;
  friendship: string;
  type: CharacterType;
}

export interface Realm {
  id: string;
  name: string;
  description: string;
  ruler: string;
}

export interface Stage {
  id: string;
  name: string;
  description: string;
  hasStageFatality: boolean;
}

export const mkCompleteData: Character[] = [
  {
    id: "1",
    name: "Liu Kang",
    origin: "Monjes Shaolin (Earthrealm)",
    bio: "Monje guerrero que defiende la Tierra y se enfrenta a las fuerzas de Outworld.",
    powers: ["Bola de fuego", "Patada voladora", "Patada bicicleta"],
    weapon: "Artes marciales",
    alignment: "Bueno",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "2",
    name: "Kung Lao",
    origin: "Earthrealm",
    bio: "Monje Shaolin y descendiente del Gran Kung Lao. Combate con su característico sombrero.",
    powers: ["Sombrero cortante", "Teletransportación", "Patada torbellino"],
    weapon: "Sombrero afilado",
    alignment: "Bueno",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "3",
    name: "Johnny Cage",
    origin: "Hollywood (Earthrealm)",
    bio: "Actor de cine y experto en artes marciales que demuestra que sus habilidades son reales.",
    powers: ["Bola de energía", "Golpe bajo", "Patada de sombra"],
    weapon: "Artes marciales",
    alignment: "Bueno",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "4",
    name: "Reptile",
    origin: "Zaterra (Outworld)",
    bio: "Guerrero sauriano al servicio de Shang Tsung que busca preservar a su especie.",
    powers: ["Ácido", "Bola de energía", "Invisibilidad"],
    weapon: "Garras y ácido",
    alignment: "Variable",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "5",
    name: "Sub-Zero",
    origin: "Lin Kuei (Earthrealm)",
    bio: "Guerrero Lin Kuei que domina el hielo y lucha en el torneo de Outworld.",
    powers: ["Congelación", "Deslizamiento", "Clon de hielo"],
    weapon: "Poderes de hielo",
    alignment: "Variable",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "6",
    name: "Shang Tsung",
    origin: "Outworld",
    bio: "Hechicero que roba almas y puede adoptar la apariencia de otros combatientes.",
    powers: ["Bolas de fuego", "Transformación", "Magia de almas"],
    weapon: "Hechicería",
    alignment: "Malvado",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "7",
    name: "Kitana",
    origin: "Edenia / Outworld",
    bio: "Princesa edeniana adoptada por Shao Kahn que descubre la verdad sobre su reino.",
    powers: ["Abanicos cortantes", "Elevación con abanico", "Ataques aéreos"],
    weapon: "Abanicos afilados",
    alignment: "Buena",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "8",
    name: "Jax Briggs",
    origin: "Fuerzas Especiales (Earthrealm)",
    bio: "Militar que participa en el conflicto para ayudar a sus compañeros y defender la Tierra.",
    powers: ["Onda sísmica", "Golpes potentes", "Agarres"],
    weapon: "Brazos reforzados",
    alignment: "Bueno",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "9",
    name: "Mileena",
    origin: "Outworld",
    bio: "Guerrera creada por hechicería, relacionada con Kitana y leal a Shao Kahn.",
    powers: ["Sai", "Teletransportación", "Ataques giratorios"],
    weapon: "Sai gemelas",
    alignment: "Malvada",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "10",
    name: "Baraka",
    origin: "Outworld",
    bio: "Guerrero tarkatano que combate con cuchillas retráctiles en los brazos.",
    powers: ["Cortes rápidos", "Ataques con cuchillas"],
    weapon: "Cuchillas retráctiles",
    alignment: "Malvado",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "11",
    name: "Scorpion",
    origin: "Netherrealm",
    bio: "Espectro ninja que busca venganza y utiliza un arpón y fuego infernal.",
    powers: ["Arpón", "Teletransportación", "Fuego"],
    weapon: "Kunai con cadena",
    alignment: "Neutral",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "12",
    name: "Raiden",
    origin: "Cielos (Earthrealm)",
    bio: "Dios del trueno que guía y protege a los campeones de la Tierra.",
    powers: ["Rayos", "Torpedo eléctrico", "Teletransportación"],
    weapon: "Poder del trueno",
    alignment: "Bueno",
    fatality: "Consulta los movimientos de la versión que estás jugando.",
    babality: "Consulta los movimientos de la versión que estás jugando.",
    friendship: "Consulta los movimientos de la versión que estás jugando.",
    type: "fighter",
  },
  {
    id: "13",
    name: "Shao Kahn",
    origin: "Outworld",
    bio: "Emperador conquistador que organiza el torneo para someter la Tierra.",
    powers: ["Embestida", "Proyectiles", "Golpes poderosos"],
    weapon: "Martillo de guerra",
    alignment: "Malvado",
    fatality: "No corresponde como a un personaje seleccionable normal en esta versión.",
    babality: "No disponible como personaje seleccionable normal.",
    friendship: "No disponible como personaje seleccionable normal.",
    type: "boss",
  },
  {
    id: "14",
    name: "Kintaro",
    origin: "Outworld (Shokan)",
    bio: "Guerrero Shokan de cuatro brazos y subjefe del torneo.",
    powers: ["Bolas de fuego", "Saltos aplastantes", "Fuerza Shokan"],
    weapon: "Garras y fuerza física",
    alignment: "Malvado",
    fatality: "No corresponde como a un personaje seleccionable normal en esta versión.",
    babality: "No disponible como personaje seleccionable normal.",
    friendship: "No disponible como personaje seleccionable normal.",
    type: "boss",
  },
  {
    id: "15",
    name: "Smoke",
    origin: "Lin Kuei",
    bio: "Ninja asociado al humo y a los encuentros secretos del juego.",
    powers: ["Movimientos ninja", "Técnicas relacionadas con el humo"],
    weapon: "Técnicas ninja",
    alignment: "Variable",
    fatality: "Consulta los requisitos de la versión específica.",
    babality: "Puede variar según la versión.",
    friendship: "Puede variar según la versión.",
    type: "secret",
  },
  {
    id: "16",
    name: "Jade",
    origin: "Edenia / Outworld",
    bio: "Guerrera relacionada con Kitana y con encuentros secretos en Mortal Kombat II.",
    powers: ["Velocidad", "Ataques con bastón", "Técnicas defensivas"],
    weapon: "Bastón",
    alignment: "Variable",
    fatality: "Consulta los requisitos de la versión específica.",
    babality: "Puede variar según la versión.",
    friendship: "Puede variar según la versión.",
    type: "secret",
  },
  {
    id: "17",
    name: "Noob Saibot",
    origin: "Netherrealm",
    bio: "Combatiente sombrío que aparece como personaje oculto en determinadas versiones.",
    powers: ["Ataques de sombra", "Técnicas oscuras"],
    weapon: "Poderes de sombra",
    alignment: "Malvado",
    fatality: "Consulta los requisitos de la versión específica.",
    babality: "Puede variar según la versión.",
    friendship: "Puede variar según la versión.",
    type: "secret",
  },
];

export const mkRealmsData: Realm[] = [
  {
    id: "r1",
    name: "Earthrealm (La Tierra)",
    description: "El reino de los humanos, protegido por Raiden y los campeones de la Tierra.",
    ruler: "Raiden actúa como protector",
  },
  {
    id: "r2",
    name: "Outworld (Mundo Exterior)",
    description: "Un reino peligroso gobernado por Shao Kahn, que busca conquistar otros mundos.",
    ruler: "Emperador Shao Kahn",
  },
  {
    id: "r3",
    name: "Edenia",
    description: "Reino de origen de Kitana, conquistado y sometido por Shao Kahn.",
    ruler: "Shao Kahn tras la conquista",
  },
  {
    id: "r4",
    name: "Netherrealm",
    description: "Reino infernal vinculado a espectros, demonios y fuerzas oscuras.",
    ruler: "Diversas fuerzas sobrenaturales",
  },
];

export const mkStagesData: Stage[] = [
  {
    id: "s1",
    name: "Dead Pool",
    description: "Escenario con un estanque mortal y una ambientación industrial.",
    hasStageFatality: true,
  },
  {
    id: "s2",
    name: "Kombat Tomb",
    description: "Tumba oscura con trampas y elementos ceremoniales.",
    hasStageFatality: true,
  },
  {
    id: "s3",
    name: "Wastelands",
    description: "Territorio desértico y peligroso de Outworld.",
    hasStageFatality: false,
  },
  {
    id: "s4",
    name: "The Portal",
    description: "Portal místico entre reinos, relacionado con encuentros secretos.",
    hasStageFatality: false,
  },
  {
    id: "s5",
    name: "The Pit II",
    description: "Puente elevado bajo la luna sobre un peligroso abismo.",
    hasStageFatality: true,
  },
  {
    id: "s6",
    name: "Armory",
    description: "Armería de Outworld con armas y elementos de forja.",
    hasStageFatality: false,
  },
  {
    id: "s7",
    name: "Tower",
    description: "Torre elevada de combate con arquitectura imponente.",
    hasStageFatality: false,
  },
  {
    id: "s8",
    name: "Living Forest",
    description: "Bosque místico cuyos árboles parecen tener vida.",
    hasStageFatality: false,
  },
  {
    id: "s9",
    name: "Kahn's Arena",
    description: "Arena imperial de Shao Kahn.",
    hasStageFatality: false,
  },
  {
    id: "s10",
    name: "Goro's Lair",
    description: "Guarida oscura que recuerda los combates del primer torneo.",
    hasStageFatality: false,
  },
];
