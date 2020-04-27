module.exports = {
    base : '/api/artworks',
    templates: {
        '/text': {
            POST : {
                "name": "Mon super texte",
                "author": "Moi meme",
                "text": "Le temps est beau la vie est belle"
            }
        },
    },
    mock: {
        MUSIC : {
            name : "nom musique",
            database : "spotify",
            category : "music",

            url : "urlsource",
            artist : "unartist",
            album : "unalbum"
        },
        MOVIE : {
            name : "nom film",
            database : "tmdb",
            category : "movie",

            description : "test"
        },
        FREETEXT : {
            name : "nom freeText",
            database : "freeText",
            category : "freeText",
            author : "un auteur",
            text : "le texte"
        },
        MUSEUM : {
            name : "nom musee",
            database : "met",
            category : "museum",
            url : "un url museum",
            medium : "musee"
        },
        PAINTING : {
            name : "nom peinture",
            database : "met",
            category : "museum",
            url : "un url painting",
            medium : "painting"
        },
        SCULPTURE : {
            name : "sculture tavu",
            database : "met",
            category : "museum",
            url : "un url sculture",
            medium : "sculture"
        }
    }
    
}