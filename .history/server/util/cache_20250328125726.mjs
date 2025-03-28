// Durée de validité du cache en millisecondes (1 heure)
const CACHE_DURATION = 60 * 60 * 1000

// Vérifie si les données en cache sont périmées
const isCacheStale = (lastUpdated) => {
  if (!lastUpdated) return true
  const now = new Date()
  const timeDiff = now - new Date(lastUpdated)
  return timeDiff > CACHE_DURATION
}

// Récupère les données du cache ou de l'API TMDB
export const getFromCacheOrFetch = async (category, fetchFunction, Model) => {
  try {
    // Chercher dans le cache
    const cachedData = await Model.find({ category })

    // Si on a des données en cache et qu'elles ne sont pas périmées
    if (cachedData.length > 0 && !isCacheStale(cachedData[0].lastUpdated)) {
      console.log(`Serving ${category} from cache`)
      return cachedData
    }

    // Si pas de cache ou cache périmé, récupérer de TMDB
    console.log(`Fetching ${category} from TMDB`)
    const freshData = await fetchFunction()

    // Préparer les données pour la sauvegarde
    const dataToSave = freshData.map((item) => ({
      tmdb_id: item.id,
      title: item.title || item.name,
      overview: item.overview,
      release_date: item.release_date || item.first_air_date,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      popularity: item.popularity,
      genres: item.genres || [],
      category,
      lastUpdated: new Date(),
    }))

    // Mettre à jour le cache
    await Model.deleteMany({ category })
    await Model.insertMany(dataToSave)

    return dataToSave
  } catch (error) {
    console.error('Cache error:', error)
    throw error
  }
}

// Récupère les détails d'un film/série du cache ou de l'API TMDB
export const getDetailsFromCacheOrFetch = async (id, fetchFunction, Model) => {
  try {
    // Chercher dans le cache
    const cachedItem = await Model.findOne({ tmdb_id: id })

    // Si on a les données en cache et qu'elles ne sont pas périmées
    if (cachedItem && !isCacheStale(cachedItem.lastUpdated)) {
      console.log(`Serving details for ${id} from cache`)
      return cachedItem
    }

    // Si pas de cache ou cache périmé, récupérer de TMDB
    console.log(`Fetching details for ${id} from TMDB`)
    const freshData = await fetchFunction()

    // Préparer les données pour la sauvegarde
    const dataToSave = {
      tmdb_id: freshData.id,
      title: freshData.title || freshData.name,
      overview: freshData.overview,
      release_date: freshData.release_date || freshData.first_air_date,
      poster_path: freshData.poster_path,
      backdrop_path: freshData.backdrop_path,
      vote_average: freshData.vote_average,
      vote_count: freshData.vote_count,
      popularity: freshData.popularity,
      genres: freshData.genres || [],
      trailerKey: freshData.videos?.results[0]?.key || null,
      lastUpdated: new Date(),
    }

    // Mettre à jour le cache
    await Model.findOneAndUpdate({ tmdb_id: id }, dataToSave, {
      upsert: true,
      new: true,
    })

    return dataToSave
  } catch (error) {
    console.error('Cache error:', error)
    throw error
  }
}
