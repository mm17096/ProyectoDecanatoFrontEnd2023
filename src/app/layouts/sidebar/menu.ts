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
        ],
      }
];

