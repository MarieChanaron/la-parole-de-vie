const pentateuch = {
    'Le Pentateuque': [
        {book_id: 1, name: "Genèse", shortname: "Gen"},
        {book_id: 2, name: "Exode", shortname: "Ex"},
        {book_id: 3, name: "Lévitique", shortname: "Lev"},
        {book_id: 4, name: "Nombres", shortname: "Num"},
        {book_id: 5, name: "Deutéronome", shortname: "Deut"}
    ]
}

const historicalBooks = {
    'Les Livres historiques': [
        {book_id: 6, name: "Josué", shortname: "Josh"},
        {book_id: 7, name: "Juges", shortname: "Judg"},
        {book_id: 8, name: "Ruth", shortname: "Ru"},
        {book_id: 9, name: "1 Samuel", shortname: "1_Sam"},
        {book_id: 10, name: "2 Samuel", shortname: "2_Sam"},
        {book_id: 11, name: "1 Rois", shortname: "1_Ki"},
        {book_id: 12, name: "2 Rois", shortname: "2_Ki"},
        {book_id: 13, name: "1 Chroniques", shortname: "1_Chron"},
        {book_id: 14, name: "2 Chroniques", shortname: "2_Chron"},
        {book_id: 15, name: "Esdras", shortname: "Ezra"},
        {book_id: 16, name: "Néhémie", shortname: "Neh"},
        {book_id: 17, name: "Esther", shortname: "Esth"}
    ]
}

const poeticBooks = {
    'Les Livres poétiques': [
        {book_id: 18, name: "Job", shortname: "Job"},
        {book_id: 19, name: "Psaumes", shortname: "Ps"},
        {book_id: 20, name: "Proverbes", shortname: "Prov"},
        {book_id: 21, name: "Ecclésiaste", shortname: "Ecc"},
        {book_id: 22, name: "Cantique des Cantiques", shortname: "SOS"}
    ]
}

const propheticBooks = {
    'Les Livres prophétiques': [
        {book_id: 23, name: "Esaïe", shortname: "Isa"},
        {book_id: 24, name: "Jérémie", shortname: "Jer"},
        {book_id: 25, name: "Lamentations", shortname: "Lam"},
        {book_id: 26, name: "Ezéchiel", shortname: "Eze"},
        {book_id: 27, name: "Daniel", shortname: "Dan"},
        {book_id: 28, name: "Osée", shortname: "Hos"},
        {book_id: 29, name: "Joël", shortname: "Joel"},
        {book_id: 30, name: "Amos", shortname: "Amos"},
        {book_id: 31, name: "Abdias", shortname: "Obad"},
        {book_id: 32, name: "Jonas", shortname: "Jon"},
        {book_id: 33, name: "Michée", shortname: "Micah"},
        {book_id: 34, name: "Nahum", shortname: "Nah"},
        {book_id: 35, name: "Habacuc", shortname: "Hab"},
        {book_id: 36, name: "Sophonie", shortname: "Zeph"},
        {book_id: 37, name: "Aggée", shortname: "Hag"},
        {book_id: 38, name: "Zacharie", shortname: "Zech"},
        {book_id: 39, name: "Malachie", shortname: "Mal"}
    ]
}

const gospels = {
    'Les Évangiles': [
        {book_id: 40, name: "Matthieu", shortname: "Matt"},
        {book_id: 41, name: "Marc", shortname: "Mark"},
        {book_id: 42, name: "Luc", shortname: "Luke"},
        {book_id: 43, name: "Jean", shortname: "John"}
    ]
}

const acts = {
    'Les Actes des Apôtres': [
        {book_id: 44, name: "Actes des Apôtres", shortname: "Acts"}
    ]
}

const paulEpistles = {
    'Les Épitres de Paul': [
        {book_id: 45, name: "Romains", shortname: "Rom"},
        {book_id: 46, name: "1 Corinthiens", shortname: "1_Cor"},
        {book_id: 47, name: "2 Corinthiens", shortname: "2_Cor"},
        {book_id: 48, name: "Galates", shortname: "Gal"},
        {book_id: 49, name: "Ephésiens", shortname: "Eph"},
        {book_id: 50, name: "Philippiens", shortname: "Phil"},
        {book_id: 51, name: "Colossiens", shortname: "Col"},
        {book_id: 52, name: "1 Thessaloniciens", shortname: "1_Thess"},
        {book_id: 53, name: "2 Thessaloniciens", shortname: "2_Thess"},
        {book_id: 54, name: "1 Timothée", shortname: "1_Tim"},
        {book_id: 55, name: "2 Timothée", shortname: "2_Tim"},
        {book_id: 56, name: "Tite", shortname: "Titus"},
        {book_id: 57, name: "Philémon", shortname: "Phm"},
        {book_id: 58, name: "Hébreux", shortname: "Heb"}
    ]
}

const epistles = {
    'Épitres': [
        {book_id: 59, name: "Jacques", shortname: "Jas"},
        {book_id: 60, name: "1 Pierre", shortname: "1_Pet"},
        {book_id: 61, name: "2 Pierre", shortname: "2_Pet"},
        {book_id: 62, name: "1 Jean", shortname: "1_John"},
        {book_id: 63, name: "2 Jean", shortname: "2_John"},
        {book_id: 64, name: "3 Jean", shortname: "3_John"},
        {book_id: 65, name: "Jude", shortname: "Jude"}
    ]
}

const revelation = {
    "L'Apocalypse de Jean": [
        {book_id: 66, name: "Apocalypse", shortname: "Rev"}
    ]
}

const oldTestament = {
    'Ancien Testament': 
    [pentateuch, historicalBooks, poeticBooks, propheticBooks]
}

const newTestament = {
    'Nouveau Testament': 
    [gospels, acts, paulEpistles, epistles, revelation]
}

export const bible = [oldTestament, newTestament];

export const sections = [pentateuch, historicalBooks, poeticBooks, propheticBooks, gospels, acts, paulEpistles, epistles, revelation];