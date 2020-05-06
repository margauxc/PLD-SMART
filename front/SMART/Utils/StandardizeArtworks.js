const fields = {
    'music' : {
        //standardized field : database field
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'album',
        'pictureLink' : 'pictureLink',
        'url' : 'url',
    },
    'movie' : {
        'name' : 'name',
        'artist' : 'director',
        'more_info' : 'description',
        'pictureLink' : 'pictureLink'
    },
    'museum' : {
        'name' : 'name',
        'artist' : 'artist',
        'more_info' : 'medium',
        'pictureLink' : 'pictureLink',
        'url' : 'url'
    }
}

export function standardizeArtwork(artwork){
    var result = {}
    result['ArtworkId'] = artwork.ArtworkId
    result['category'] = artwork.category
    const resultFields = ['name', 'artist', 'more_info', 'pictureLink', 'url']
    resultFields.forEach((field) => {
        result[field] = artwork[fields[artwork.category][field]]
    })
    return result
}