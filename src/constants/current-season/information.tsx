export enum TabsEnum {
  InfoGeneral = "Info General",
  Equipos = "Equipos",
  FaseDeGrupos = "Fase de grupos",
  EventoPrincipal = "Evento Principal",
}

// Configuración de pestañas habilitadas/deshabilitadas
export const TABS_CONFIG = {
  [TabsEnum.InfoGeneral]: { enabled: true },
  [TabsEnum.Equipos]: { enabled: true },
  [TabsEnum.FaseDeGrupos]: { enabled: true },
  [TabsEnum.EventoPrincipal]: { enabled: true },
} as const;

type Information = {
  subject?: string;
  title: string;
  description: string[];
};

export enum INFORMATION_ENUM {
  ARMADO_DE_EQUIPO = "Armado de equipos",
  CAPITANES = "Capitanes",
  CUENTAS_DE_STEAM = "Cuentas de Steam",
  FECHAS_DE_JUEGO = "Fechas de juego",
}

export const INFORMATION: Record<INFORMATION_ENUM, Information> = {
  [INFORMATION_ENUM.ARMADO_DE_EQUIPO]: {
    title: "Medalla libre",
    description: [
      "La medalla de los jugadores es libre. Los equipos pueden conformarse con jugadores de cualquier medalla, el único requisito es que el equipo en juego no debe superar la suma de 38.000 de mmr.",
      "El roster puede contar con 5 titulares y 3 suplentes.",
      "Esta limitado los jugadores peruanos nuevos por equipos a 2.",
    ],
  },
  [INFORMATION_ENUM.CAPITANES]: {
    title: "Capitanes",
    description: [
      "Todos los capitanes de un equipo deben ser hispanohablantes y comunicarse con el staff para poder ser notificados de los eventos de la season.",
    ],
  },
  [INFORMATION_ENUM.CUENTAS_DE_STEAM]: {
    title: "Players en la liga",
    description: [
      "Todas las cuentas tienen que estar calibradas, tener mas de 5k horas y 4k de partidas (cualquier duda consultar con el Staff).",
      "Perfil de dota y steam tienen que ser públicos al momento de la inscripción.",
    ],
  },
  [INFORMATION_ENUM.FECHAS_DE_JUEGO]: {
    title: "Días y horarios",
    description: [
      "El staff definirá las semanas en las que se deba jugar cada instancia de la season.",
      "Los días y horarios serán arreglados por los capitanes de los equipos y notificados al staff.",
      "En caso de no acordar un día y horario entre capitanes, el staff definirá uno por defecto.",
    ],
  },
};
