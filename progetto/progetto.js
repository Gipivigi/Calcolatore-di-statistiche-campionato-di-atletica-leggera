let prompt = require("prompt-sync")();

/**
 * Rappresenta un giocatore.
 * @param {string} nome - Il nome del giocatore.
 * @param {string} cognome - Il cognome del giocatore.
 * @param {number} eta - L'età del giocatore.
 */
class Giocatore {
    constructor(nome, cognome, eta) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
        this.punteggiPerGara = []; // Array che conterrà i punteggi ottenuti dal giocatore in ogni gara.
    }

    /**
     * Aggiunge un punteggio per una gara.
     * @param {number} punteggio - Il punteggio da aggiungere.
     */
    aggiungiPunteggio(punteggio) {
        this.punteggiPerGara.push(punteggio);
    }

    /**
     * Calcola il punteggio totale.
     * @returns {number} Il punteggio totale.
     */
    calcolaPunteggioTotale() {
        // Somma dei punteggi di tutte le gare a cui il giocatore ha partecipato.
        return this.punteggiPerGara.reduce((acc, curr) => acc + curr, 0);
    }

    /**
     * Calcola la percentuale di gare vinte, piazzamenti a podio e fuori dal podio.
     * @param {number} numGareTotali - Il numero totale di gare disputate.
     * @returns {Object} Oggetto contenente le percentuali di vittorie, podi e gare fuori dal podio.
     */
    calcolaPercentuali(numGareTotali) {
        let numVittorie = 0;
        let numPodi = 0;

        this.punteggiPerGara.forEach(punteggio => {
            // Se il punteggio è maggiore o uguale a 50, il giocatore ha vinto la gara e si trova al primo posto sul podio.
            if (punteggio >= 50) {
                numVittorie++;
                numPodi++;
            } 
            // Se il punteggio è compreso tra 20 e 49, il giocatore si trova al secondo posto sul podio.
            else if (punteggio >= 20) {
                numPodi++;
            } 
            // Se il punteggio è compreso tra 10 e 19, il giocatore si trova al terzo posto sul podio.
            else if (punteggio >= 10) {
                numPodi++;
            }
        });

        // Numero di gare in cui il giocatore non si è piazzato sul podio.
        const numFuoriPodio = numGareTotali - numPodi;
        // Calcolo delle percentuali.
        const percentualeVittorie = ((numVittorie / numGareTotali) * 100).toFixed(2);
        const percentualePodi = ((numPodi / numGareTotali) * 100).toFixed(2);
        const percentualeFuoriPodio = ((numFuoriPodio / numGareTotali) * 100).toFixed(2);

        return {
            percentualeVittorie,
            percentualePodi,
            percentualeFuoriPodio
        };
    }
}

/** Rappresenta una gara. */
class Gara {
    constructor(nomeGara) {
        this.nomeGara = nomeGara;
        this.partecipanti = []; // Array che conterrà i giocatori partecipanti alla gara.
    }

    /**
     * Aggiunge un partecipante alla gara.
     * @param {Giocatore} giocatore - Il giocatore da aggiungere come partecipante.
     */
    aggiungiPartecipante(giocatore) {
        this.partecipanti.push(giocatore);
    }
}

let giocatori = [];
let gare = [];

/**
 * Visualizza l'elenco dei giocatori.
 */
function visualizzaElencoAtleti() {
    for (let i = 0; i < giocatori.length; i++) {
        console.log(`${i + 1} ${giocatori[i].nome} ${giocatori[i].cognome} ${giocatori[i].eta}`);
    }
}

/**
 * Registra un nuovo giocatore.
 */
function registraNuovoGiocatore() {
    let nome = prompt("Inserisci il nome del giocatore:");
    let cognome = prompt("Inserisci il cognome del giocatore:");
    let eta = parseInt(prompt("Inserisci l'età del giocatore:"));

    let nuovoGiocatore = new Giocatore(nome, cognome, eta);
    giocatori.push(nuovoGiocatore);

    console.log(`Giocatore ${nome} ${cognome} registrato con successo.`);
}

/**
 * Registra una nuova gara.
 */
function registraNuovaGara() {
    let nomeGara = prompt("Inserisci il nome della gara:");
    let nuovaGara = new Gara(nomeGara);
    gare.push(nuovaGara);
    console.log(`Gara ${nomeGara} registrata con successo.`);
}

/**
 * Registra i partecipanti ad una gara.
 */
function registraPartecipanti() {
    let nomeGara = prompt("Inserisci il nome della gara:");
    let gara = gare.find(g => g.nomeGara === nomeGara);
    if (!gara) {
        console.log("Gara non trovata.");
        return;
    }

    let numeroPartecipanti = parseInt(prompt("Inserisci il numero di partecipanti:"));
    visualizzaElencoAtleti();
    for (let i = 0; i < numeroPartecipanti; i++) {
        let atleta = Number(prompt(`Inserire il numero dell'atleta che si vuole aggiungere`));
        let giocatore = giocatori[atleta - 1];
        gara.aggiungiPartecipante(giocatore);
    }

    console.log(`Partecipanti alla gara ${nomeGara} registrati con successo.`);
    console.log(`Ecco l'elenco dei partecipanti: `);
    for (let i = 0; i < numeroPartecipanti; i++) {
        console.log(`${gara.partecipanti[i].nome} ${gara.partecipanti[i].cognome}`);
    }
}

/**
 * Aggiorna la classifica con i nuovi punteggi.
 */
function aggiornaClassifica() {
    // Visualizza l'elenco delle gare disponibili e chiedi all'utente su quale gara aggiornare i punteggi
    console.log("Elenco delle gare disponibili:");
    gare.forEach((gara, index) => {
        console.log(`${index + 1}. ${gara.nomeGara}`);
    });

    let indiceGara = parseInt(prompt("Inserisci il numero corrispondente alla gara su cui vuoi aggiornare i punteggi:")) - 1;
    if (isNaN(indiceGara) || indiceGara < 0 || indiceGara >= gare.length) {
        console.log("Scelta non valida. Riprova.");
        return;
    }

    let garaSelezionata = gare[indiceGara];

    // Aggiorna i punteggi dei partecipanti per la gara selezionata
    garaSelezionata.partecipanti.forEach(partecipante => {
        let punteggio = parseInt(prompt(`Inserisci il punteggio per ${partecipante.nome} ${partecipante.cognome} nella gara ${garaSelezionata.nomeGara}:`));
        partecipante.aggiungiPunteggio(punteggio); // Aggiungi il punteggio alla lista del giocatore per quella gara
    });

    // Visualizza la classifica aggiornata
    console.log("Classifica aggiornata:");
    giocatori.sort((a, b) => b.calcolaPunteggioTotale() - a.calcolaPunteggioTotale());
    giocatori.forEach((giocatore, index) => {
        console.log(`${index + 1}. ${giocatore.nome} ${giocatore.cognome} - Punteggio totale: ${giocatore.calcolaPunteggioTotale()}`);
    });
}

/**
 * Visualizza la classifica del campionato aggiornata.
 */
function visualizzaClassifica() {
    // Visualizza la classifica aggiornata
    console.log("Classifica:");
    giocatori.sort((a, b) => b.calcolaPunteggioTotale() - a.calcolaPunteggioTotale());
    giocatori.forEach((giocatore, index) => {
        console.log(`${index + 1}. ${giocatore.nome} ${giocatore.cognome} - Punteggio totale: ${giocatore.calcolaPunteggioTotale()}`);
    });
}

/**
 * Gestisce le operazioni del campionato.
 */
function gestioneCampionato() {
    console.log(`GESTIONE CAMPIONATO DI ATLETICA LEGGERA`);
    console.log(`(1) Registra nuovo giocatore.`);
    console.log(`(2) Registra una nuova gara.`);
    console.log(`(3) Registra partecipanti ad una gara.`);
    console.log(`(4) Inserisci e aggiorna la classifica con i nuovi punteggi.`);
    console.log(`(5) Visualizza classifica del campionato aggiornata.`);
    console.log(`(6) Visualizza statistiche dei giocatori e il calcolo della media dei punteggi (totale di tutti i giocatori).`);
    console.log(`(7) ESCI DAL PROGRAMMA.`);

    let scelta = parseInt(prompt("Inserisci la tua scelta:"));
    switch (scelta) {
        case 1:
            registraNuovoGiocatore();
            break;
        case 2:
            registraNuovaGara();
            break;
        case 3:
            registraPartecipanti();
            break;
        case 4:
            aggiornaClassifica();
            break;
        case 5:
            visualizzaClassifica();
            break;
        case 6:
            visualizzaStatisticheGiocatori();
            break;
        case 7:
            console.log("Programma terminato.");
            return;
        default:
            console.log("Scelta non valida. Riprova.");
    }

    gestioneCampionato();
}

/**
 * Visualizza le statistiche dei giocatori.
 */
function visualizzaStatisticheGiocatori() {
    const numGareTotali = gare.length;
    const mediaPunteggiTotali = giocatori.reduce((acc, giocatore) => acc + giocatore.calcolaPunteggioTotale(), 0) / giocatori.length;

    giocatori.forEach(giocatore => {
        const percentuali = giocatore.calcolaPercentuali(numGareTotali);

        console.log(`Statistiche di ${giocatore.nome} ${giocatore.cognome}:`);
        console.log(`- Media dei punteggi totali: ${mediaPunteggiTotali.toFixed(2)}`);
        console.log(`- Percentuale di gare vinte: ${percentuali.percentualeVittorie}%`);
        console.log(`- Percentuale di piazzamenti a podio: ${percentuali.percentualePodi}%`);
        console.log(`- Percentuale di gare fuori dal podio: ${percentuali.percentualeFuoriPodio}%`);
        console.log("-----------------------------------------");
    });
}

// Avvio del programma.
gestioneCampionato();
