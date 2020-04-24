const fields = {
    'music' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'album',
        'pictureLink' : 'pictureLink'
    },
    'movie' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'description',
        'pictureLink' : 'pictureLink'
    },
    'painting' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium',
        'pictureLink' : 'pictureLink'
    },
    'sculpture' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium',
        'pictureLink' : 'pictureLink'
    },
    'museum' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium',
        'pictureLink' : 'pictureLink'
    }
}

export function standardizeArtwork(artwork){
    var result = {}
    result['ArtworkId'] = artwork.ArtworkId
    const resultFields = ['name', 'artist', 'more_info', 'pictureLink']
    resultFields.forEach((field) => {
        result[field] = artwork[fields[artwork.category][field]]
    })
    return result
}