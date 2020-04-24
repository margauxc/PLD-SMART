const fields = {
    'music' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'album'
    },
    'movie' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'description'
    },
    'painting' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium'
    },
    'sculpture' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium'
    },
    'museum' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium'
    }
}

export function standardizeArtwork(artwork){
    var result = {}
    result['ArtworkId'] = artwork.ArtworkId
    const resultFields = ['name', 'artist', 'more_info']
    resultFields.forEach((field) => {
        result[field] = artwork[fields[artwork.category][field]]
    })
    return result
}