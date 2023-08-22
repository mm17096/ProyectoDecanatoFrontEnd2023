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
      icon: "bx-user-circle",
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
      icon: "bx-user-circle",
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
            link: "/entrasalida/vista_es",
            parent: 10,
          },
        ]
    },
    {
        id: 20,
        label: "MENUITEMS.MAPS.TEXT",
        icon: "bx-map",
        subItems: [
            {
                id: 21,
                label: "Solicitudes",
                link: "/empleados",
                parentId: 20,
            },
            {
                id: 22,
                label: "Asignaciones",
                link: "/asignacionVale/asignaciones",
                parentId: 20,
            },
        ],
    },
];

