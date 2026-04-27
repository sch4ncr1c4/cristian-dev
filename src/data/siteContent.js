import reactIcon from '../assets/skills/react.svg'
import typescriptIcon from '../assets/skills/typescript.svg'
import nodejsIcon from '../assets/skills/nodejs.svg'
import postgresqlIcon from '../assets/skills/postgresql.svg'
import tailwindIcon from '../assets/skills/tailwind.svg'
import expressIcon from '../assets/skills/express.svg'
import githubIcon from '../assets/icons/github.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import mailIcon from '../assets/icons/mail-svgrepo-com.svg'
import locationIcon from '../assets/icons/location-svgrepo-com.svg'
import calendarIcon from '../assets/icons/calender-svgrepo-com.svg'

export const brandName = 'Cristian Dev'

export const hero = {
  title: 'Cristian Dev',
  role: 'Sistemas web y automatizaciones a medida',
  description:
    'Desarrollo sistemas y automatizaciones a medida para ordenar procesos, reducir trabajo manual y ahorrar tiempo.',
  image: '/banner-660.webp',
}

export const socials = [
  { name: 'GitHub', url: 'https://github.com/sch4ncr1c4', iconSrc: githubIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/cristian.schx/?hl=es%2F', iconSrc: instagramIcon },
  { name: 'LinkedIn', url: '#contact', iconSrc: linkedinIcon },
]

export const skills = [
  { name: 'React', icon: 'R', iconSrc: reactIcon },
  { name: 'TypeScript', icon: 'TS', iconSrc: typescriptIcon },
  { name: 'Node.js', icon: 'JS', iconSrc: nodejsIcon },
  { name: 'Express', icon: 'E', iconSrc: expressIcon },
  { name: 'Tailwind CSS', icon: '~', iconSrc: tailwindIcon },
  { name: 'PostgreSQL', icon: 'PG', iconSrc: postgresqlIcon },
]

export const projects = [
  {
    title: 'TaskFlow',
    description: 'App de gestion de tareas con autenticacion, tableros y notificaciones.',
    tags: ['React', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    url: '#contact',
  },
  {
    title: 'ShopHub',
    description: 'E-commerce moderno con carrito, pagos y panel de administracion.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    url: '#contact',
  },
  {
    title: 'FitTrack',
    description: 'Dashboard de seguimiento de rutinas, ejercicios y estadisticas.',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
    url: '#contact',
  },
]

export const contactItems = [
  {
    id: 'mail',
    iconSrc: mailIcon,
    label: 'Email',
    value: 'crschinocca@gmail.com',
  },
  {
    id: 'location',
    iconSrc: locationIcon,
    label: 'Ubicacion',
    value: 'Buenos Aires, Argentina',
  },
  {
    id: 'availability',
    iconSrc: calendarIcon,
    label: 'Disponibilidad',
    value: 'Agenda abierta para nuevos proyectos',
  },
]
