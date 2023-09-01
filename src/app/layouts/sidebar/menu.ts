import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU PRINCIPAL',
        isTitle: true,
    },
    {
        id: 2,
        label: 'Inicio',
        icon: 'bx-home-circle',
        link: '/dashboard',
    },
    {
        id: 3,
        label: 'MODULOS',
        isTitle: true
    },
    {
        id: 6,
        label: "Empleados",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 7,
                label: "Lista",
                link: "/empleados/listar",
                parentId: 6,
            },
            {
                id: 8,
                label: "Cargos",
                link: "/empleados/cargos",
                parentId: 6,
            },
            {
                id: 9,
                label: "Departamentos",
                link: "/empleados/depto",
                parentId: 6,
            },
        ],
    },

    {
      id: 7,
      label: "Solicitud Vehículo",
      icon: "mdi mdi-car-outline",
      subItems: [
        {
          id: 8,
          label: "Listado",
          link: "/solicitud-vehiculo/listado",
          parentId: 7,
        },
        {
          id: 9,
          label: "Mis solicitudes",
          link: "/solicitud-vehiculo/mis-solicitudes",
          parentId: 7,
        },
      ],
    },
    {
      id: 8,
      label: "Vales",
      icon: "mdi mdi-gas-station",
      subItems: [
          {
              id: 9,
              label: "Solicitudes",
              link: "/empleados",
              parentId: 8,
          },
          {
              id: 10,
              label: "Asignaciones",
              link: "/asignacionVale/asignaciones",
              parentId: 8,
          },
      ],
  },
   {
        id: 10,
        label: "Entradas y Salidas",
        icon: "dripicons-document-edit",
        subItems: [
          {
            id: 11,
            label: "VER",
            link: "/entrasalida/listar",
            parent: 10,
          },
          {
            id: 12,
            label: "Documento",
            link: "/document/vale",
            parent: 10,
          }
        ]
  }
];

