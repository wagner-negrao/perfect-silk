export const NAV_ITEMS = [
  { label: 'Início', to: '/' },
  { label: 'Produção', to: '/producao' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Contato', to: '/contato' },
] as const

export const CONTACT = {
  phone: '(91) 98136-5656',
  email: 'sldossantosservicos@gmail.com',
  streetLine: 'Travessa WE 45-B, nº 371B',
  districtLine: 'Cidade Nova VIII · CEP 67133-805',
  city: 'Ananindeua / PA',
} as const

export interface Project {
  name: string
  image: string
  alt: string
}

export const PROJECTS: Project[] = [
  { name: 'Bonés personalizados', image: '/images/projeto-bones.webp', alt: 'Bonés personalizados produzidos pela Perfect Silk' },
  { name: 'Copos com tampa', image: '/images/projeto-copos-tampa.webp', alt: 'Copos com tampa personalizados produzidos pela Perfect Silk' },
  { name: 'Bolsas para eventos', image: '/images/projeto-bolsas-eventos.webp', alt: 'Bolsas personalizadas para eventos produzidas pela Perfect Silk' },
  { name: 'Ecobags personalizadas', image: '/images/projeto-ecobags.webp', alt: 'Ecobags personalizadas produzidas pela Perfect Silk' },
  { name: 'Uniformes esportivos', image: '/images/projeto-uniformes-esportivos.webp', alt: 'Uniformes esportivos personalizados produzidos pela Perfect Silk' },
  { name: 'Cadernos personalizados', image: '/images/projeto-cadernos.webp', alt: 'Cadernos personalizados produzidos pela Perfect Silk' },
]
