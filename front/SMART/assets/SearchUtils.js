const oeuvres = [
    {
        type : 'painting',
        id : 0,
        title : 'La nuit étoilée',
        artist : 'Vincent Van Gogh',
        image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
    },
    {
        type : 'painting',
        id : 1,
        title : 'La liberté guidant le peuple',
        artist : 'Eugène Delacroix',
        image : 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg'
    },
    {
        type : 'music',
        id : 2,
        title : 'Bohemian Rhapsody',
        singer : 'Queen',
        //image : 'https://ajournalofmusicalthings.com/wp-content/uploads/Queen-Bohemian-Rhapsody.jpg'
    },
    {
        type : 'music',
        id : 3,
        title : 'Everytime we touch',
        singer : 'Cascada',
        image : 'http://2.bp.blogspot.com/-jK42e6ztnJs/Tws_4DX2ezI/AAAAAAAAEGE/AdrcJk6JT4w/w1200-h630-p-nu/Everytime_we_touch_cover.jpg'
    }
]

const categories = [
    {
        key : 'all',
        label : 'Toutes les oeuvres', 
        value : 'all'
    },
    {
        key : 'painting',
        label : 'Peinture',
        value : 'painting'
    },
    {
        key : 'music',
        label : 'Musique',
        value : 'music'
    },
    {
        key : 'photo',
        label : 'Photographie',
        value : 'photography'
    },
    {
        key : 'movie',
        label : 'Film',
        value : 'movie'
    }
]

export {oeuvres, categories}