import { 
  Dashboard,
  Event,
  Person
} from '@mui/icons-material';

export const menuItems = [
  { 
    text: 'Dashboard', 
    breadcrumb: 'Inicio',
    icon: Dashboard, 
    href: '/cliente' 
  },
  
  { 
    text: 'Eventos', 
    icon: Event,
    subItems: [
      { 
        text: 'Realizados', 
        breadcrumb: 'Realizados',
        href: '/cliente/event-made' 
      },
      { 
        text: 'Por Realizar', 
        breadcrumb: 'Por Realizar',
        href: '/cliente/event-to-do' 
      }
    ]
  },
  { 
    text: 'Gestionar Perfil', 
    breadcrumb: 'Gestionar Perfil',
    icon: Person,
    href: '/cliente/edit-profile' 
  },
 
];
