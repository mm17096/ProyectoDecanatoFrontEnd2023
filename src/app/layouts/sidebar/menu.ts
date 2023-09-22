import { MenuItem } from "./menu.model";

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
        label: "Listado",
        link: "/empleados/listar",
        parentId: 6,
      },
      {
        id: 8,
        label: "Cargos",
        link: "/cargo/listar",
        parentId: 6,
      },
      {
        id: 9,
        label: "Departamentos",
        link: "/depto/listar",
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
        id: 10,
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
        label: "Proveedor",
        link: "/proveedor",
        parentId: 8,
      },
      {
        id: 10,
        label: "Compras",
        link: "/compra",
        parentId: 8,
      },
      {
        id: 11,
        label: "Solicitud de Vales",
        link: "/solicitudes/solicitudvale",
        parentId: 8,
      },
      {
        id: 12,
        label: "Ajustes de Vales",
        link: "/devolucion-vale",
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
        label: "Listado",
        link: "/entrasalida/listar",
        parent: 10,
      },
      {
        id: 12,
        label: "Documento",
        link: "/document/vale",
        parent: 10,
      },
    ],
  },
  {
    id: 11,
    label: "Reportes",
    icon: "mdi mdi-file-document-outline",
    subItems: [
      {
        id: 12,
        label: "Consumo de Vales",
        link: "/solicitudes/solicitudv",
        parentId: 11,
      },
      {
        id: 13,
        label: "Solicitud de Transporte",
        link: "/solicitudes/solicitante",
        parentId: 11,
      },
    ],
  },
  {
    id: 12,
    label: "Vehiculos",
    icon: "mdi mdi-car-outline",
    link: "/vehiculo/listar"
  }
];



