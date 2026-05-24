export type Destination = "Lisboa" | "Madrid" | "Dublin" | "Multi-destino" | "Custom";
export type DurationRange = "ate-7" | "8-12" | "13-20";
export type Badge = "Mais pedido" | "Últimas vagas" | "Novo" | "Mais procurado" | "Favorito de casais" | "Melhor custo-benefício";

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
  popular?: boolean;
  includes: string[];
  notIncludes: string[];
  itinerary: ItineraryDay[];
  highlights: string[];
}

// ── Pacotes próprios ──────────────────────────────────────────────────────────

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
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotel 3★ no centro histórico (6 noites)",
      "Transfer aeroporto/hotel",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação (exceto café da manhã)", "Passeios opcionais pagos", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer do aeroporto, check-in e primeiro passeio pelo Chiado e Bairro Alto.", accommodation: "Hotel no centro histórico" },
      { day: 2, title: "Alfama e Castelo de São Jorge", description: "Manhã no Castelo, tarde em Alfama. Fado ao entardecer.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém", description: "Torre de Belém, Mosteiro dos Jerônimos e pastel de Belém no original.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Dia inteiro em Sintra: Palácio da Pena e Quinta da Regaleira.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa livre", description: "Mercado da Ribeira, LX Factory ou explorar Mouraria.", meals: ["Café da manhã"] },
      { day: 6, title: "Cascais e Estoril", description: "Linha do Estoril, praias e seafood na beira-mar.", meals: ["Café da manhã"] },
      { day: 7, title: "Retorno", description: "Café da manhã, transfer para o aeroporto.", meals: ["Café da manhã"] },
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
    notIncludes: ["Alimentação (exceto café da manhã)", "Passeios opcionais adicionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer, check-in e jantar no Chiado.", accommodation: "Hotel 4★ centro histórico" },
      { day: 2, title: "Alfama e Mouraria", description: "Castelo de São Jorge, Alfama e Mouraria. Fado na Tasca do Chico.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Ajuda", description: "Torre, Mosteiro dos Jerônimos, MAAT e Palácio de Ajuda.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Palácio da Pena, Quinta da Regaleira e Palácio de Monserrate.", meals: ["Café da manhã"] },
      { day: 5, title: "Óbidos e Caldas", description: "Vila medieval de Óbidos com ginja e muralhas.", meals: ["Café da manhã"] },
      { day: 6, title: "Passeio pelo Tejo", description: "Tarde: passeio de barco pelo Tejo incluso.", meals: ["Café da manhã"] },
      { day: 7, title: "Cascais", description: "Estoril, Cascais e Praia do Guincho.", meals: ["Café da manhã"] },
      { day: 8, title: "Arrábida", description: "Mar cristalino da Arrábida e almoço em Setúbal.", meals: ["Café da manhã"] },
      { day: 9, title: "Lisboa livre", description: "LX Factory, Mercado da Ribeira.", meals: ["Café da manhã"] },
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
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis 3★ em Lisboa e Madrid (11 noites)",
      "Transfer aeroporto/hotel nas duas cidades",
      "Trem Lisboa, Sevilha",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Entradas em museus", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e primeiro contato com a cidade.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Lisboa histórica", description: "Alfama, Castelo de São Jorge e Miradouro da Graça.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Sintra", description: "Manhã em Belém, tarde em Sintra.", meals: ["Café da manhã"] },
      { day: 4, title: "Lisboa livre", description: "Chiado, LX Factory e Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa, Sevilha", description: "Transfer para Sevilha: Catedral e Giralda ao entardecer.", accommodation: "Hotel Sevilha", meals: ["Café da manhã"] },
      { day: 6, title: "Sevilha completa", description: "Real Alcázar, bairro de Santa Cruz e tapas.", meals: ["Café da manhã"] },
      { day: 7, title: "Sevilha, Madrid", description: "AVE para Madrid. Gran Vía.", accommodation: "Hotel Madrid", meals: ["Café da manhã"] },
      { day: 8, title: "Museus de Madrid", description: "Prado ou Reina Sofía, Parque do Retiro.", meals: ["Café da manhã"] },
      { day: 9, title: "Madrid gastronômica", description: "Mercado de San Miguel, Malasaña e La Latina.", meals: ["Café da manhã"] },
      { day: 10, title: "Toledo", description: "Toledo medieval a 30 min de Madrid.", meals: ["Café da manhã"] },
      { day: 11, title: "Madrid livre", description: "Bairros El Rastro, Chueca ou Lavapiés.", meals: ["Café da manhã"] },
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
    notIncludes: ["Alimentação", "Passeios opcionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer, check-in, passeio pelo Chiado.", accommodation: "Hotel 4★ Lisboa" },
      { day: 2, title: "Alfama e Mouraria", description: "Manhã no Castelo, tarde em Alfama. Fado à noite.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém", description: "Torre de Belém, Mosteiro dos Jerônimos e pastéis.", meals: ["Café da manhã"] },
      { day: 4, title: "Sintra", description: "Palácio da Pena e Quinta da Regaleira.", meals: ["Café da manhã"] },
      { day: 5, title: "Cascais e Estoril", description: "Linha do Estoril: praias e frutos do mar.", meals: ["Café da manhã"] },
      { day: 6, title: "Óbidos", description: "Vila medieval de Óbidos e ginja na rua.", meals: ["Café da manhã"] },
      { day: 7, title: "Lisboa livre", description: "LX Factory, Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 8, title: "Lisboa, Madrid", description: "Voo para Madrid. Tarde no Gran Vía.", accommodation: "Hotel 4★ Madrid", meals: ["Café da manhã"] },
      { day: 9, title: "Museus de Madrid", description: "Museu do Prado ou Reina Sofía.", meals: ["Café da manhã"] },
      { day: 10, title: "Bairros de Madrid", description: "Malasaña, Lavapiés, El Rastro.", meals: ["Café da manhã"] },
      { day: 11, title: "Toledo", description: "Day trip para Toledo medieval.", meals: ["Café da manhã"] },
      { day: 12, title: "Segóvia", description: "Aqueduto Romano de Segóvia.", meals: ["Café da manhã"] },
      { day: 13, title: "Madrid livre", description: "Mercado de San Miguel e última noite.", meals: ["Café da manhã"] },
      { day: 14, title: "Retorno", description: "Transfer e embarque de Madrid.", meals: ["Café da manhã"] },
    ],
    highlights: ["Sintra", "Museu do Prado", "Toledo", "Segóvia", "Gran Vía"],
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
      "Excursão Cliffs of Moher inclusa",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Passeios opcionais adicionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Dublin", description: "Transfer, check-in e primeiro passeio pelo Temple Bar.", accommodation: "Hotel Dublin centro" },
      { day: 2, title: "Dublin histórica", description: "Dublin Castle, Trinity College e Book of Kells.", meals: ["Café da manhã"] },
      { day: 3, title: "Pubs e Guinness", description: "Guinness Storehouse e pub quiz à noite.", meals: ["Café da manhã"] },
      { day: 4, title: "Howth", description: "Vilarejo de pescadores. Fish and chips na beira do mar.", meals: ["Café da manhã"] },
      { day: 5, title: "Wicklow e Glendalough", description: "Montanhas de Wicklow e mosteiro medieval.", meals: ["Café da manhã"] },
      { day: 6, title: "Galway", description: "Trem para Galway: cidade mais animada da Irlanda.", accommodation: "Hotel Galway", meals: ["Café da manhã"] },
      { day: 7, title: "Cliffs of Moher", description: "Excursão inclusa: falésias de 200m com vista para o Atlântico.", meals: ["Café da manhã"] },
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
    notIncludes: ["Alimentação", "Passeios opcionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e primeiro passeio pelo Chiado.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Alfama e Castelo", description: "Castelo de São Jorge, Alfama, fado.", meals: ["Café da manhã"] },
      { day: 3, title: "Belém e Sintra", description: "Torre, Mosteiro e tarde em Sintra.", meals: ["Café da manhã"] },
      { day: 4, title: "Lisboa livre", description: "LX Factory e Mercado da Ribeira.", meals: ["Café da manhã"] },
      { day: 5, title: "Lisboa, Madrid", description: "Voo para Madrid. Gran Vía.", accommodation: "Hotel Madrid", meals: ["Café da manhã"] },
      { day: 6, title: "Museus de Madrid", description: "Prado ou Reina Sofía, Parque do Retiro.", meals: ["Café da manhã"] },
      { day: 7, title: "Toledo", description: "Day trip para Toledo medieval.", meals: ["Café da manhã"] },
      { day: 8, title: "Madrid livre", description: "Mercado San Miguel, Malasaña.", meals: ["Café da manhã"] },
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

  // ── Pacotes mais famosos do mercado ──────────────────────────────────────────

  {
    slug: "portugal-completo",
    name: "Portugal Completo",
    tagline: "Lisboa, Porto e o melhor de Portugal",
    destination: "Multi-destino",
    countries: ["Portugal"],
    cities: ["Lisboa", "Fátima", "Coimbra", "Porto", "Guimarães"],
    duration: 10,
    photo: "/dest-lisboa.jpg",
    badge: "Mais procurado",
    profile: "O mais procurado pelos brasileiros",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Lisboa e Porto (9 noites)",
      "Transfer aeroporto/hotel",
      "Transporte terrestre entre cidades",
      "Guia em português em excursões",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação (exceto indicado)", "Passeios opcionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e check-in. Passeio pelo Chiado.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Lisboa — Alfama e Belém", description: "Castelo de São Jorge, Alfama e Torre de Belém.", meals: ["Café da manhã"] },
      { day: 3, title: "Sintra e Cascais", description: "Palácio da Pena em Sintra e tarde em Cascais.", meals: ["Café da manhã"] },
      { day: 4, title: "Fátima", description: "Santuário de Fátima — local de peregrinação mais importante de Portugal.", meals: ["Café da manhã"] },
      { day: 5, title: "Coimbra", description: "Universidade de Coimbra (patrimônio UNESCO) e centro histórico.", meals: ["Café da manhã"] },
      { day: 6, title: "Chegada ao Porto", description: "Transfer para o Porto. Passeio na Ribeira.", accommodation: "Hotel Porto", meals: ["Café da manhã"] },
      { day: 7, title: "Porto histórico", description: "Livraria Lello, Clérigos, Palácio da Bolsa e cruzeiro pelo Douro.", meals: ["Café da manhã"] },
      { day: 8, title: "Caves de Vinho do Porto", description: "Visita às caves de Vila Nova de Gaia e degustação.", meals: ["Café da manhã"] },
      { day: 9, title: "Guimarães", description: "Berço de Portugal: castelo e centro histórico medieval.", meals: ["Café da manhã"] },
      { day: 10, title: "Retorno", description: "Transfer para o aeroporto do Porto.", meals: ["Café da manhã"] },
    ],
    highlights: ["Porto histórico", "Sintra", "Fátima", "Caves de Vinho do Porto", "Coimbra"],
  },
  {
    slug: "peninsula-iberica",
    name: "Península Ibérica",
    tagline: "Lisboa, Madrid e Barcelona numa só viagem",
    destination: "Multi-destino",
    countries: ["Portugal", "Espanha"],
    cities: ["Lisboa", "Sevilha", "Madrid", "Barcelona"],
    duration: 14,
    photo: "/dest-madrid.jpg",
    badge: "Mais procurado",
    profile: "O clássico da Europa para brasileiros",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Lisboa, Sevilha, Madrid e Barcelona",
      "Transfer aeroporto/hotel",
      "Trens entre cidades (Sevilha-Madrid-Barcelona)",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Entradas em museus", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Lisboa", description: "Transfer e check-in. Chiado e Bairro Alto.", accommodation: "Hotel Lisboa" },
      { day: 2, title: "Lisboa histórica", description: "Alfama, Castelo de São Jorge, Torre de Belém.", meals: ["Café da manhã"] },
      { day: 3, title: "Sintra", description: "Palácio da Pena e Quinta da Regaleira.", meals: ["Café da manhã"] },
      { day: 4, title: "Lisboa, Sevilha", description: "Voo para Sevilha. Catedral à noite.", accommodation: "Hotel Sevilha", meals: ["Café da manhã"] },
      { day: 5, title: "Sevilha", description: "Real Alcázar, bairro de Santa Cruz.", meals: ["Café da manhã"] },
      { day: 6, title: "Sevilha, Madrid", description: "AVE para Madrid. Gran Vía.", accommodation: "Hotel Madrid", meals: ["Café da manhã"] },
      { day: 7, title: "Madrid — museus", description: "Prado ou Reina Sofía, Parque do Retiro.", meals: ["Café da manhã"] },
      { day: 8, title: "Toledo", description: "Day trip para Toledo medieval.", meals: ["Café da manhã"] },
      { day: 9, title: "Madrid livre", description: "Malasaña, Mercado de San Miguel.", meals: ["Café da manhã"] },
      { day: 10, title: "Madrid, Barcelona", description: "AVE para Barcelona. La Barceloneta.", accommodation: "Hotel Barcelona", meals: ["Café da manhã"] },
      { day: 11, title: "Barcelona — Gaudí", description: "Sagrada Família, Parque Güell.", meals: ["Café da manhã"] },
      { day: 12, title: "Barcelona — Bairros", description: "Gothic Quarter, La Boqueria, Montjuïc.", meals: ["Café da manhã"] },
      { day: 13, title: "Barcelona livre", description: "Passeig de Gràcia e Eixample.", meals: ["Café da manhã"] },
      { day: 14, title: "Retorno", description: "Transfer e embarque de Barcelona.", meals: ["Café da manhã"] },
    ],
    highlights: ["Sagrada Família", "Real Alcázar", "Museu do Prado", "Sintra", "La Boqueria"],
  },
  {
    slug: "italia-essencial",
    name: "Itália Essencial",
    tagline: "Roma, Florença e Veneza — a tríade perfeita",
    destination: "Multi-destino",
    countries: ["Itália"],
    cities: ["Roma", "Florença", "Veneza"],
    duration: 12,
    photo: "/hero-window.jpg",
    badge: "Mais procurado",
    profile: "O país mais procurado na Europa",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Roma, Florença e Veneza (11 noites)",
      "Transfer aeroporto/hotel",
      "Trens entre cidades",
      "Entrada no Coliseu e Vaticano",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Outros passeios opcionais", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Roma", description: "Transfer, check-in. Passeio noturno pela Fontana di Trevi.", accommodation: "Hotel Roma centro" },
      { day: 2, title: "Roma Antiga", description: "Coliseu, Foro Romano e Palatino.", meals: ["Café da manhã"] },
      { day: 3, title: "Vaticano", description: "Museus do Vaticano, Sistina e Basílica de São Pedro.", meals: ["Café da manhã"] },
      { day: 4, title: "Roma moderna", description: "Piazza Navona, Campo de' Fiori e Trastevere.", meals: ["Café da manhã"] },
      { day: 5, title: "Roma, Florença", description: "Trem para Florença. Passeio pelo centro.", accommodation: "Hotel Florença", meals: ["Café da manhã"] },
      { day: 6, title: "Florença — arte", description: "Galleria degli Uffizi, Duomo e Ponte Vecchio.", meals: ["Café da manhã"] },
      { day: 7, title: "Florença e Toscana", description: "Piazzale Michelangelo e excursão opcional à Toscana.", meals: ["Café da manhã"] },
      { day: 8, title: "Florença, Veneza", description: "Trem para Veneza. Passeio de vaporetto.", accommodation: "Hotel Veneza", meals: ["Café da manhã"] },
      { day: 9, title: "Veneza", description: "Praça São Marcos, Palazzo Ducale e passeio de gôndola.", meals: ["Café da manhã"] },
      { day: 10, title: "Ilhas de Veneza", description: "Murano (vidros) e Burano (casas coloridas).", meals: ["Café da manhã"] },
      { day: 11, title: "Veneza livre", description: "Explorar calli e sestieri no seu ritmo.", meals: ["Café da manhã"] },
      { day: 12, title: "Retorno", description: "Transfer e embarque de Veneza.", meals: ["Café da manhã"] },
    ],
    highlights: ["Coliseu", "Vaticano", "Uffizi", "Ponte Vecchio", "Gôndola em Veneza"],
  },
  {
    slug: "trio-classico",
    name: "Trio Clássico",
    tagline: "Paris, Roma e Londres — o sonho europeu",
    destination: "Multi-destino",
    countries: ["França", "Itália", "Reino Unido"],
    cities: ["Paris", "Roma", "Londres"],
    duration: 12,
    photo: "/hero-window.jpg",
    badge: "Mais procurado",
    profile: "Ideal para a primeira viagem à Europa",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Paris, Roma e Londres (11 noites)",
      "Transfer aeroporto/hotel",
      "Voos internos entre as cidades",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Entradas em museus", "Eurostar Paris-Londres (opcional)"],
    itinerary: [
      { day: 1, title: "Chegada em Paris", description: "Transfer, check-in. Torre Eiffel iluminada à noite.", accommodation: "Hotel Paris" },
      { day: 2, title: "Paris clássica", description: "Louvre, Arco do Triunfo e Champs-Élysées.", meals: ["Café da manhã"] },
      { day: 3, title: "Paris romântica", description: "Montmartre, Sacré-Coeur e Le Marais.", meals: ["Café da manhã"] },
      { day: 4, title: "Versailles", description: "Palácio e jardins de Versailles.", meals: ["Café da manhã"] },
      { day: 5, title: "Paris, Roma", description: "Voo para Roma. Fontana di Trevi ao entardecer.", accommodation: "Hotel Roma", meals: ["Café da manhã"] },
      { day: 6, title: "Roma Antiga", description: "Coliseu, Foro Romano e Palatino.", meals: ["Café da manhã"] },
      { day: 7, title: "Vaticano", description: "Museus do Vaticano, Sistina e Basílica.", meals: ["Café da manhã"] },
      { day: 8, title: "Roma livre", description: "Piazza Navona, Trastevere e gelato.", meals: ["Café da manhã"] },
      { day: 9, title: "Roma, Londres", description: "Voo para Londres. Chegada e Tower Bridge.", accommodation: "Hotel Londres", meals: ["Café da manhã"] },
      { day: 10, title: "Londres clássica", description: "Big Ben, Westminster, Buckingham e Trafalgar Square.", meals: ["Café da manhã"] },
      { day: 11, title: "Londres cultural", description: "British Museum, Covent Garden e South Bank.", meals: ["Café da manhã"] },
      { day: 12, title: "Retorno", description: "Transfer e embarque de Londres.", meals: ["Café da manhã"] },
    ],
    highlights: ["Torre Eiffel", "Louvre", "Coliseu", "Vaticano", "Big Ben"],
  },
  {
    slug: "grecia-classica",
    name: "Grécia Clássica",
    tagline: "Atenas, Santorini e Mykonos",
    destination: "Multi-destino",
    countries: ["Grécia"],
    cities: ["Atenas", "Santorini", "Mykonos"],
    duration: 10,
    photo: "/hero-window.jpg",
    badge: "Favorito de casais",
    profile: "Favorito entre casais e lua de mel",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Atenas, Santorini e Mykonos (9 noites)",
      "Transfer aeroporto/hotel",
      "Ferries entre ilhas",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Entradas em museus", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Atenas", description: "Transfer, check-in. Bairro de Monastiraki.", accommodation: "Hotel Atenas" },
      { day: 2, title: "Acrópole", description: "Partenon, Erecteion e Museu da Acrópole.", meals: ["Café da manhã"] },
      { day: 3, title: "Atenas livre", description: "Plaka, mercado e Cape Sounion ao pôr do sol.", meals: ["Café da manhã"] },
      { day: 4, title: "Atenas, Santorini", description: "Ferry ou voo para Santorini. Oia ao entardecer.", accommodation: "Hotel Santorini", meals: ["Café da manhã"] },
      { day: 5, title: "Santorini", description: "Oia, caldera e pôr do sol famoso do mundo.", meals: ["Café da manhã"] },
      { day: 6, title: "Santorini — ilhas e praias", description: "Praia de Perissa, vulcão e termas naturais.", meals: ["Café da manhã"] },
      { day: 7, title: "Santorini, Mykonos", description: "Ferry para Mykonos. Bairro de Chora.", accommodation: "Hotel Mykonos", meals: ["Café da manhã"] },
      { day: 8, title: "Mykonos", description: "Little Venice, moinhos de vento e praias.", meals: ["Café da manhã"] },
      { day: 9, title: "Mykonos livre", description: "Praias, compras e última noite grega.", meals: ["Café da manhã"] },
      { day: 10, title: "Retorno", description: "Transfer e embarque de Mykonos ou Atenas.", meals: ["Café da manhã"] },
    ],
    highlights: ["Acrópole", "Pôr do sol em Oia", "Caldera de Santorini", "Little Venice", "Termas de Santorini"],
  },
  {
    slug: "leste-europeu",
    name: "Leste Europeu",
    tagline: "Praga, Viena e Budapeste — o melhor custo-benefício",
    destination: "Multi-destino",
    countries: ["República Tcheca", "Áustria", "Hungria"],
    cities: ["Praga", "Viena", "Budapeste"],
    duration: 12,
    photo: "/hero-window.jpg",
    badge: "Melhor custo-benefício",
    profile: "Melhor custo-benefício na Europa",
    popular: true,
    includes: [
      "Passagem aérea ida e volta",
      "Hotéis em Praga, Viena e Budapeste (11 noites)",
      "Transfer aeroporto/hotel",
      "Trens entre cidades",
      "Roteiro personalizado dia a dia",
      "Seguro viagem completo",
      "Suporte via WhatsApp 24h",
    ],
    notIncludes: ["Alimentação", "Entradas em museus", "Despesas pessoais"],
    itinerary: [
      { day: 1, title: "Chegada em Praga", description: "Transfer, check-in. Passeio pela Cidade Velha.", accommodation: "Hotel Praga" },
      { day: 2, title: "Praga histórica", description: "Castelo de Praga, Catedral e Bairro Judeu.", meals: ["Café da manhã"] },
      { day: 3, title: "Praga — Ponte Carlos", description: "Ponte Carlos, Malá Strana e cerveja tcheca.", meals: ["Café da manhã"] },
      { day: 4, title: "Praga, Viena", description: "Trem para Viena. Ringstrasse ao entardecer.", accommodation: "Hotel Viena", meals: ["Café da manhã"] },
      { day: 5, title: "Viena imperial", description: "Palácio de Schönbrunn, Hofburg e Kunsthistorisches Museum.", meals: ["Café da manhã"] },
      { day: 6, title: "Viena — música e café", description: "Ópera Estatal, cafés históricos e Belvedere.", meals: ["Café da manhã"] },
      { day: 7, title: "Viena, Budapeste", description: "Trem para Budapeste. Ruin bars à noite.", accommodation: "Hotel Budapeste", meals: ["Café da manhã"] },
      { day: 8, title: "Budapeste — colinas", description: "Colina do Castelo, Bastião dos Pescadores e Matias.", meals: ["Café da manhã"] },
      { day: 9, title: "Budapeste — parlamento", description: "Parlamento húngaro, Grande Sinagoga e Margit-sziget.", meals: ["Café da manhã"] },
      { day: 10, title: "Banhos termais", description: "Széchenyi ou Gellért — os famosos banhos termais de Budapeste.", meals: ["Café da manhã"] },
      { day: 11, title: "Budapeste livre", description: "Mercado central e última noite.", meals: ["Café da manhã"] },
      { day: 12, title: "Retorno", description: "Transfer e embarque de Budapeste.", meals: ["Café da manhã"] },
    ],
    highlights: ["Castelo de Praga", "Palácio de Schönbrunn", "Parlamento húngaro", "Banhos termais", "Ponte Carlos"],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getPackage(slug: string): TravelPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPopularPackages(): TravelPackage[] {
  return packages.filter((p) => p.popular);
}

export function searchPackages(query: string): TravelPackage[] {
  if (!query.trim()) return packages;
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const q = normalize(query);
  return packages.filter((p) => {
    const fields = normalize(
      [p.name, p.destination, ...p.countries, ...p.cities, p.tagline].join(" ")
    );
    return fields.includes(q);
  });
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

// Destinos europeus para autocomplete
export const EUROPEAN_DESTINATIONS = [
  "Lisboa", "Porto", "Sintra", "Faro", "Funchal",
  "Madrid", "Barcelona", "Sevilha", "Granada", "Valencia", "Málaga", "Bilbao",
  "Roma", "Florença", "Veneza", "Milão", "Nápoles", "Amalfi", "Cinque Terre",
  "Paris", "Nice", "Lyon", "Bordeaux", "Versailles",
  "Londres", "Edimburgo",
  "Dublin", "Galway",
  "Berlim", "Munique", "Frankfurt",
  "Amsterdã",
  "Praga",
  "Viena",
  "Budapeste",
  "Atenas", "Santorini", "Mykonos",
  "Zurique", "Berna", "Lucerna",
  "Dubrovnik", "Split",
  "Cracóvia",
  "Istambul",
  "Bruxelas",
  "Copenhague",
  "Estocolmo",
  "Oslo",
];
