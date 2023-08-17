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
        id: 5,
        label: 'Libros',
        icon: 'bx-share-alt',
        link: '/libros/mostrar'
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
      id: 6,
      label: "Solicitud Vehículo",
      icon: "bx-user-circle",
      subItems: [
        {
          id: 7,
          label: "Listado",
          link: "/solicitud-vehiculo/listar",
          parentId: 6,
        },
        {
          id: 8,
          label: "Mis solicitudes",
          link: "/solicitud-vehiculo/mis-solicitudes",
          parentId: 6,
        },
      ],
    },
    {
        id: 123,
        label: "MENUITEMS.MAPS.TEXT",
        icon: "bx-map",
        subItems: [
          {
            id: 124,
            label: "MENUITEMS.MAPS.LIST.GOOGLEMAP",
            link: "/maps/google",
            parentId: 123,
          },
        ],
      }
];

