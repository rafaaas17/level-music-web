import { 
  Dashboard,
  Event,
  People,
  VolumeUp,
  Store,
  RoomService
} from '@mui/icons-material';

export const menuItems = [
  { 
    text: 'Dashboard', 
    breadcrumb: 'Inicio',
    icon: Dashboard, 
    href: '/admin' 
  },
  { 
    text: 'Gestionar Eventos', 
    icon: Event, 
    subItems: [
      { 
        text: 'Eventos', 
        breadcrumb: 'Eventos',
        href: '/admin/events'
      },
      { 
        text: 'Tipo de Eventos', 
        breadcrumb: 'Tipo de Eventos',
        href: '/admin/event-types' 
      },
      { 
        text: 'Cotizaciones',
        breadcrumb: 'Cotizaciones',
        href: '/admin/quotes' 
      }
    ]
  },
  
  { 
    text: 'Gestionar Servicios', 
    icon: RoomService,
    subItems: [
      { 
        text: 'Servicios', 
        breadcrumb: 'Servicios',
        href: '/admin/service' 
      },
      { 
        text: 'Tipo de Servicios', 
        breadcrumb: 'Tipo de Servicios',
        href: '/admin/service-type' 
      }
    ]
  },
  { 
    text: 'Gestionar Proveedores', 
    icon: Store,
    subItems: [
      { 
        text: 'Proveedores', 
        breadcrumb: 'Proveedores',
        href: '/admin/provider' 
      }
    ]
  },
  { 
    text: 'Gestionar Equipos', 
    icon: VolumeUp, 
    subItems: [
      { 
        text: 'Equipos', 
        breadcrumb: 'Equipos',
        href: '/admin/equipment' 
      },
      { 
        text: 'Mantenimiento', 
        breadcrumb: 'Mantenimiento de Equipos',
        href: '/admin/equipment-maintenance' 
      }
    ]
  },
  { 
    text: 'Gestionar Servicios', 
    breadcrumb: 'Servicios',
    icon: RoomService, 
    href: '/admin/services' 
  },
  { 
    text: 'Almacén', 
    breadcrumb: 'Almacén',
    icon: Store, 
    href: '/admin/storehouse'
  }
];
