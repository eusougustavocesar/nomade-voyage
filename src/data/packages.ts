export type Destination = "Lisboa" | "Madrid" | "Dublin" | "Multi-destino";
export type DurationRange = "ate-7" | "8-12" | "13-20";
export type Badge = "Mais pedido" | "Últimas vagas" | "Novo";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  meals?: string[];
}

export interface TravelPackage {
  slug: string;
  name: string;
  tagline: string;
  destination: Destination;
  countries: string[];
  cities: string[];
  duration: number;
  photo: string;
  badge?: Badge;
  profile: string;
  includes: string[];
  notIncludes: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
}

export const packages: TravelPackage[] = [
  {
    slug: "lisboa-essencial",
    name: "Lisboa Essencial",
    tagline: "A melhor primeira vez na Europa",
    destination: "Lisboa",
    countries: ["Portugal"],
    cities: ["Lisboa", "Sintra"],
    duration: 7,
    photo: "/dest-lisboa.jpg",
    badge: "Mais pedido",
    profile: "Ideal para primeira viagem",
    includes: [
      "Passagem aérea ida e volta",
      "Hotel 3★ no centro histórico (6 noites)",
      "Transfer aeroporto/hotel",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação (exceto café da manhã)",
      "Passeios opcionais pagos",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer do aeroporto, check-in e primeiro passeio pelo Chiado e Bairro Alto. Jantar livre.", accommodation: "Hotel no centro histórico" },
      { day: 2, title: "Alfama e Castelo de São Jorge", description: "Manhã no Castelo, tarde descendo pelo bairro de Alfama. Fado ao entardecer num bar da rua.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém", description: "Torre de Belém, Mosteiro dos Jerônimos e pastel de Belém no original. Tarde no Museu de Arte Antiga.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Dia inteiro em Sintra: Palácio da Pena, Quinta da Regaleira e vila histórica. Um dos dias mais bonitos da viagem.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa livre", description: "Dia livre: Mercado da Ribeira, LX Factory no sábado, ou explorar Mouraria e Intendente.", meals: ["Café da manhã"] },
      { day: 6, title: "Cascais e Linha do Estoril", description: "Tarde na Linha de Cascais: passeio à beira-mar, praias e seafood num restaurante local.", meals: ["Café da manhã"] },
      { day: 7, title: "Retorno", description: "Café da manhã, transfer para o aeroporto e embarque de volta.", meals: ["Café da manhã"] },
    ],
    highlights: ["Castelo de São Jorge", "Bairro de Alfama", "Sintra", "Torre de Belém", "LX Factory"],
  },
  {
    slug: "lisboa-completa",
    name: "Lisboa Completa",
    tagline: "Lisboa sem pressa, com tudo que importa",
    destination: "Lisboa",
    countries: ["Portugal"],
    cities: ["Lisboa", "Sintra", "Óbidos", "Cascais"],
    duration: 10,
    photo: "/dest-lisboa.jpg",
    badge: undefined,
    profile: "Para casais e quem quer ir fundo",
    includes: [
      "Passagem aérea ida e volta",
      "Hotel 4★ no centro histórico (9 noites)",
      "Transfer aeroporto/hotel",
      "Roteiro personalizado dia a dia",
      "Passeio de barco pelo Rio Tejo",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação (exceto café da manhã)",
      "Passeios opcionais adicionais",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer, check-in e jantar no Chiado.", accommodation: "Hotel 4★ centro histórico" },
      { day: 2, title: "Alfama e Mouraria", description: "Castelo de São Jorge, Alfama e Mouraria. Fado na Tasca do Chico.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Ajuda", description: "Torre, Mosteiro dos Jerônimos, MAAT e Palácio de Ajuda.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Dia completo: Palácio da Pena, Quinta da Regaleira e Palácio de Monserrate.", meals: ["Café da manhã"] },
      { day: 5, title: "Óbidos e Caldas da Rainha", description: "Vila medieval de Óbidos com muralhas e ginja. Tarde em Caldas.", meals: ["Café da manhã"] },
      { day: 6, title: "Passeio pelo Tejo", description: "Manhã livre. Tarde: passeio de barco pelo Tejo com vista para a cidade.", meals: ["Café da manhã"] },
      { day: 7, title: "Linha de Cascais", description: "Estoril, Cascais e Praia do Guincho.", meals: ["Café da manhã"] },
      { day: 8, title: "Setúbal e Arrábida", description: "Mar cristalino da Arrábida e almoço com peixe fresco em Setúbal.", meals: ["Café da manhã"] },
      { day: 9, title: "Lisboa livre", description: "LX Factory, Mercado da Ribeira, compras e despedida da cidade.", meals: ["Café da manhã"] },
      { day: 10, title: "Retorno", description: "Café da manhã e transfer para o aeroporto.", meals: ["Café da manhã"] },
    ],
    highlights: ["Sintra", "Passeio pelo Tejo", "Óbidos", "Arrábida", "Cascais"],
  },
  {
    slug: "portugal-espanha",
    name: "Portugal e Espanha",
    tagline: "Dois países no mesmo fôlego",
    destination: "Multi-destino",
    countries: ["Portugal", "Espanha"],
    cities: ["Lisboa", "Sintra", "Sevilha", "Madrid"],
    duration: 12,
    photo: "/dest-madrid.jpg",
    badge: undefined,
    profile: "Para quem quer explorar",
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis 3★ em Lisboa e Madrid (11 noites)",
      "Transfer aeroporto/hotel nas duas cidades",
      "Trem Lisboa, Sevilha (ou voo interno)",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação",
      "Entradas em museus (exceto os incluídos)",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e primeiro contato com a cidade.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Lisboa histórica", description: "Alfama, Castelo de São Jorge e Miradouro da Graça.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Sintra", description: "Manhã em Belém, tarde em Sintra.", meals: ["Café da manhã"] },
      { day: 4, title: "Lisboa livre", description: "Chiado, LX Factory e Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa, Sevilha", description: "Transfer para Sevilha: Catedral e Giralda ao entardecer.", accommodation: "Hotel Sevilha", meals: ["Café da manhã"] },
      { day: 6, title: "Sevilha completa", description: "Real Alcázar, bairro de Santa Cruz e tapas no mercado.", meals: ["Café da manhã"] },
      { day: 7, title: "Sevilha, Madrid", description: "AVE para Madrid. Chegada, check-in e passeio pelo Gran Vía.", accommodation: "Hotel Madrid", meals: ["Café da manhã"] },
      { day: 8, title: "Museus de Madrid", description: "Prado ou Reina Sofía pela manhã. Retiro à tarde.", meals: ["Café da manhã"] },
      { day: 9, title: "Madrid gastrômica", description: "Mercado de San Miguel, Malasaña e La Latina.", meals: ["Café da manhã"] },
      { day: 10, title: "Toledo (day trip)", description: "Toledo medieval a 30 minutos de Madrid.", meals: ["Café da manhã"] },
      { day: 11, title: "Madrid livre", description: "Bairros El Rastro, Chueca ou Lavapiés. Última noite.", meals: ["Café da manhã"] },
      { day: 12, title: "Retorno", description: "Transfer e embarque de Madrid.", meals: ["Café da manhã"] },
    ],
    highlights: ["Real Alcázar de Sevilha", "Museu do Prado", "Gran Vía", "Toledo", "Sintra"],
  },
  {
    slug: "lisboa-madrid-14",
    name: "Lisboa e Madrid",
    tagline: "Duas capitais, ritmos diferentes",
    destination: "Multi-destino",
    countries: ["Portugal", "Espanha"],
    cities: ["Lisboa", "Sintra", "Cascais", "Madrid", "Toledo"],
    duration: 14,
    photo: "/dest-lisboa.jpg",
    badge: undefined,
    profile: "Para usar bem as duas semanas de férias",
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis 4★ em Lisboa e Madrid (13 noites)",
      "Transfer aeroporto/hotel nas duas cidades",
      "Voo ou trem entre Portugal e Espanha",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação",
      "Passeios opcionais",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer, check-in, passeio pelo Chiado.", accommodation: "Hotel 4★ Lisboa" },
      { day: 2, title: "Alfama e Mouraria", description: "Manhã no Castelo, tarde em Alfama. Fado à noite.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém", description: "Torre de Belém, Mosteiro dos Jerônimos e pastéis.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Palácio da Pena e Quinta da Regaleira.", meals: ["Café da manhã"] },
      { day: 5, title: "Cascais e Estoril", description: "Linha do Estoril: praias e frutos do mar.", meals: ["Café da manhã"] },
      { day: 6, title: "Óbidos e arredores", description: "Vila medieval de Óbidos e ginja na rua.", meals: ["Café da manhã"] },
      { day: 7, title: "Lisboa livre", description: "LX Factory, Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 8, title: "Lisboa, Madrid", description: "Voo para Madrid. Tarde no Gran Vía.", accommodation: "Hotel 4★ Madrid", meals: ["Café da manhã"] },
      { day: 9, title: "Museus de Madrid", description: "Museu do Prado ou Reina Sofía.", meals: ["Café da manhã"] },
      { day: 10, title: "Bairros de Madrid", description: "Malasaña, Lavapiés, El Rastro.", meals: ["Café da manhã"] },
      { day: 11, title: "Toledo", description: "Day trip para Toledo medieval.", meals: ["Café da manhã"] },
      { day: 12, title: "Segóvia ou Ávila", description: "Aqueduto Romano de Segóvia ou muralhas de Ávila.", meals: ["Café da manhã"] },
      { day: 13, title: "Madrid gastrômica", description: "Mercado de San Miguel e última noite.", meals: ["Café da manhã"] },
      { day: 14, title: "Retorno", description: "Transfer e embarque de Madrid.", meals: ["Café da manhã"] },
    ],
    highlights: ["Sintra", "Real Alcázar", "Museu do Prado", "Toledo", "Segóvia"],
  },
  {
    slug: "dublin-lisboa",
    name: "Dublin e Lisboa",
    tagline: "Do verde da Irlanda ao sol de Portugal",
    destination: "Multi-destino",
    countries: ["Irlanda", "Portugal"],
    cities: ["Dublin", "Galway", "Lisboa", "Sintra"],
    duration: 14,
    photo: "/dest-dublin.jpg",
    badge: "Novo",
    profile: "Aventura e cultura",
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Dublin e Lisboa (13 noites)",
      "Voo interno Dublin, Lisboa",
      "Transfer aeroporto/hotel nas duas cidades",
      "Excursão Cliffs of Moher",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação",
      "Passeios opcionais adicionais",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Dublin", description: "Transfer, check-in e primeiro passeio pelo Temple Bar.", accommodation: "Hotel Dublin centro" },
      { day: 2, title: "Dublin histórica", description: "Dublin Castle, Trinity College e Book of Kells.", meals: ["Café da manhã"] },
      { day: 3, title: "Pubs e Guinness", description: "Guinness Storehouse, bairro Liberties e pub quiz à noite.", meals: ["Café da manhã"] },
      { day: 4, title: "Howth", description: "Vilarejo de pescadores a 30 min de Dublin. Fish and chips na beira do mar.", meals: ["Café da manhã"] },
      { day: 5, title: "Wicklow e Glendalough", description: "Montanhas de Wicklow e mosteiro medieval de Glendalough.", meals: ["Café da manhã"] },
      { day: 6, title: "Galway", description: "Trem para Galway: cidade mais animada da Irlanda.", accommodation: "Hotel Galway", meals: ["Café da manhã"] },
      { day: 7, title: "Cliffs of Moher", description: "Excursão inclusa: falésias de 200m com vista para o Atlântico. Um dos dias mais impressionantes.", meals: ["Café da manhã"] },
      { day: 8, title: "Dublin, Lisboa", description: "Retorno a Dublin e voo para Lisboa.", accommodation: "Hotel Lisboa", meals: ["Café da manhã"] },
      { day: 9, title: "Lisboa histórica", description: "Alfama, Castelo de São Jorge e fado.", meals: ["Café da manhã"] },
      { day: 10, title: "Belém", description: "Torre de Belém, Mosteiro dos Jerônimos, pastel original.", meals: ["Café da manhã"] },
      { day: 11, title: "Sintra", description: "Palácio da Pena e Quinta da Regaleira.", meals: ["Café da manhã"] },
      { day: 12, title: "Cascais", description: "Linha do Estoril e frutos do mar.", meals: ["Café da manhã"] },
      { day: 13, title: "Lisboa livre", description: "LX Factory, Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 14, title: "Retorno", description: "Transfer e embarque de Lisboa.", meals: ["Café da manhã"] },
    ],
    highlights: ["Cliffs of Moher", "Temple Bar", "Glendalough", "Sintra", "Alfama"],
  },
  {
    slug: "europa-3-paises",
    name: "Europa em 3 Países",
    tagline: "Portugal, Espanha e Irlanda numa única viagem",
    destination: "Multi-destino",
    countries: ["Portugal", "Espanha", "Irlanda"],
    cities: ["Lisboa", "Madrid", "Dublin"],
    duration: 15,
    photo: "/hero-window.jpg",
    badge: "Últimas vagas",
    profile: "Para usar bem as férias do ano",
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Lisboa, Madrid e Dublin (14 noites)",
      "Voos internos entre os destinos",
      "Transfer aeroporto/hotel em todas as cidades",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: [
      "Alimentação",
      "Passeios opcionais",
      "Despesas pessoais",
    ],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e primeiro passeio pelo Chiado.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Alfama e Castelo", description: "Castelo de São Jorge, Alfama, fado.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Sintra", description: "Torre, Mosteiro e tarde em Sintra.", meals: ["Café da manhã"] },
      { day: 4, title: "Lisboa livre", description: "LX Factory e Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa, Madrid", description: "Voo para Madrid. Gran Vía.", accommodation: "Hotel Madrid", meals: ["Café da manhã"] },
      { day: 6, title: "Museus de Madrid", description: "Prado ou Reina Sofía, Parque do Retiro.", meals: ["Café da manhã"] },
      { day: 7, title: "Toledo", description: "Day trip para Toledo medieval.", meals: ["Café da manhã"] },
      { day: 8, title: "Madrid gastrômica", description: "Mercado San Miguel, Malasaña.", meals: ["Café da manhã"] },
      { day: 9, title: "Madrid, Dublin", description: "Voo para Dublin. Temple Bar à noite.", accommodation: "Hotel Dublin", meals: ["Café da manhã"] },
      { day: 10, title: "Dublin histórica", description: "Dublin Castle, Trinity College, Book of Kells.", meals: ["Café da manhã"] },
      { day: 11, title: "Guinness e pubs", description: "Guinness Storehouse e pub crawl no Temple Bar.", meals: ["Café da manhã"] },
      { day: 12, title: "Cliffs of Moher", description: "Excursão às falésias mais dramáticas da Europa.", meals: ["Café da manhã"] },
      { day: 13, title: "Howth", description: "Vilarejo de pescadores e costa irlandesa.", meals: ["Café da manhã"] },
      { day: 14, title: "Dublin livre", description: "Última compra, último pint.", meals: ["Café da manhã"] },
      { day: 15, title: "Retorno", description: "Transfer e embarque de Dublin.", meals: ["Café da manhã"] },
    ],
    highlights: ["Sintra", "Museu do Prado", "Cliffs of Moher", "Alfama", "Toledo"],
  },
];

export function getPackage(slug: string): TravelPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function filterPackages(params: {
  destination?: Destination | "Todos";
  duration?: DurationRange | "todos";
}): TravelPackage[] {
  return packages.filter((p) => {
    if (params.destination && params.destination !== "Todos") {
      if (p.destination !== params.destination) return false;
    }
    if (params.duration && params.duration !== "todos") {
      if (params.duration === "ate-7" && p.duration > 7) return false;
      if (params.duration === "8-12" && (p.duration < 8 || p.duration > 12)) return false;
      if (params.duration === "13-20" && p.duration < 13) return false;
    }
    return true;
  });
}
