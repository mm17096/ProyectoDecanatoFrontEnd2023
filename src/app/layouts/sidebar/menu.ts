import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Inicio',
        icon: 'bx-home-circle',
        link: '/dashboard',

    },

    {
        id: 3,
        label: 'Modulos',
        isTitle: true
    },
    {
        id: 4,
        label: 'Empleados',
        icon: 'bx-user-circle',
        link: '/empleados/mostrar'
    },
    {
      id: 5,
      label: 'Libros',
      icon: 'bx-user-circle',
      link: '/libros/mostrar'
  }
];

