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
    text: 'Gestionar Trabajadores', 
    icon: People,
    subItems: [
      { 
        text: 'Trabajadores', 
        breadcrumb: 'Trabajadores',
        href: '/admin/workers' 
      },
      { 
        text: 'Tipo de Trabajadores', 
        breadcrumb: 'Tipo de Trabajadores',
        href: '/admin/worker-types' 
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
