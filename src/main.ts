type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' |
  'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese'
}

// Type guard per Actress
function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === 'object' &&
    'id' in data &&
    typeof data.id === 'number' &&
    'name' in data &&
    typeof data.name === 'string' &&
    'birth_year' in data &&
    typeof data.birth_year === 'number' &&
    'death_year' in data &&
    (typeof data.death_year === 'number' || typeof data.death_year === undefined) &&
    'biography' in data &&
    typeof data.biography === 'string' &&
    'image' in data &&
    typeof data.image === 'string' &&
    'most_famous_movies' in data &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(movie => typeof movie === 'string') &&
    'awards' in data &&
    typeof data.awards === 'string' &&
    'nationality' in data &&
    typeof data.nationality === 'string' &&
    ['American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese'].includes(data.nationality)
  ) {
    return true
  }
  return false
}

// Funzione di chiamata per attrice con id
async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()    // Se la response è ok risolvo la chiamata in data

    if (!isActress(data)) {
      throw new Error('Invalid data received')
    }
    return data  // Se data rispetta la struttura di un'attrice, la ritorno 
  }
  catch (err) {
    if (err instanceof Error) {   // Se l'errore è di tipo errore stampo il messaggio
      console.error('Error fetching actress:', err.message)
    } else {
      console.error('Unknown error:', err)
    }
    return null   // Se c'è un errore ritorno null
  }
}

const marilyn = await getActress(6)
console.log(marilyn)

