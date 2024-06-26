let prompt=require("prompt-sync")();

/**
 * Rappresenta un giocatore.
 */
class Giocatore {
    /**
     * Crea un nuovo giocatore.
     * @param {string} nome - Il nome del giocatore.
     * @param {string} cognome - Il cognome del giocatore.
     * @param {number} eta - L'età del giocatore.
     */
    constructor(nome, cognome, eta) {
        this.nome=nome; // Nome del giocatore
        this.cognome=cognome; // Cognome del giocatore
        this.eta=eta; // Età del giocatore
        this.punteggiPerGara=[]; // Array che conterrà i punteggi ottenuti dal giocatore in ogni gara
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
        // Utilizza reduce per sommare tutti i punteggi
        return this.punteggiPerGara.reduce((a, c) => a + c, 0);
    }

    /**
     * Calcola la percentuale di gare vinte, piazzamenti a podio e fuori dal podio.
     * @param {number} numGareTotali - Il numero totale di gare.
     * @returns {Object} Un oggetto contenente le percentuali di vittorie, piazzamenti a podio e fuori dal podio.
     */
    calcolaPercentuali(numGareTotali) {
        let numPartecipazioni=this.punteggiPerGara.length;
        let numVittorie=0;
        let numPodi=0;

        // Calcola il numero di vittorie e piazzamenti a podio
        this.punteggiPerGara.forEach(punteggio => {
            if(punteggio>=50) {
                numVittorie++;
                numPodi++;
            } else if(punteggio>=20) {
                numPodi++;
            }
        });

        let percentualeVittorie, percentualePodi, percentualeFuoriPodio;

        // Calcola le percentuali basate sul numero di partecipazioni
        if(numPartecipazioni>0) {
            percentualeVittorie=(numVittorie/numPartecipazioni)*100;
            percentualePodi=(numPodi/numPartecipazioni)*100;
            percentualeFuoriPodio=100-percentualePodi;
        } else {
            percentualeVittorie=0;
            percentualePodi=0;
            percentualeFuoriPodio=0;
        }

        return {
            percentualeVittorie: percentualeVittorie.toFixed(2),
            percentualePodi: percentualePodi.toFixed(2),
            percentualeFuoriPodio: percentualeFuoriPodio.toFixed(2)
        };
    }
}

/**
 * Rappresenta una gara.
 */
class Gara {
    /**
     * Crea una nuova gara,inserendo nome della gara e creando un'array che conterrà i giocatori partecipanti alla gara.
     * @param {string} nomeGara - Il nome della gara.
     */
    constructor(nomeGara) {
        this.nomeGara=nomeGara; // Nome della gara
        this.partecipanti=[]; // Array che conterrà i giocatori partecipanti alla gara
    }

    /**
     * Aggiunge un partecipante alla gara.
     * @param {Giocatore} giocatore - Il giocatore da aggiungere.
     */
    aggiungiPartecipante(giocatore) {
        this.partecipanti.push(giocatore);
    }
}

let giocatori=[]; // Array che conterrà tutti i giocatori
let gare=[]; // Array che conterrà tutte le gare

/**
 * Visualizza l'elenco dei giocatori con nome,cognome e età
 */
function visualizzaElencoAtleti() {
    for(let i=0; i<giocatori.length; i++) {
        console.log(`${i+1} ${giocatori[i].nome} ${giocatori[i].cognome} ${giocatori[i].eta}`);
    }
}

/**
 * Registra un nuovo giocatore,facendo inserire nome cognome e età.
 */
function registraNuovoGiocatore() {
    let nome=prompt("Inserisci il nome del giocatore:");
    let cognome=prompt("Inserisci il cognome del giocatore:");
    let eta=parseInt(prompt("Inserisci l'età del giocatore:"));
    let nuovoGiocatore=new Giocatore(nome, cognome, eta);
    giocatori.push(nuovoGiocatore);
    console.log(`Giocatore ${nome} ${cognome} registrato con successo.`);
}

/**
 * Registra una nuova gara.
 */
function registraNuovaGara() {
    let nomeGara=prompt("Inserisci il nome della gara:");
    let nuovaGara=new Gara(nomeGara);
    gare.push(nuovaGara);
    console.log(`Gara ${nomeara} registrata con successo.`);
}

/**
 * Registra i partecipanti ad una gara.
 */
function registraPartecipanGti() {
    let nomeGara=prompt("Inserisci il nome della gara:");
    let gara=gare.find(g => g.nomeGara===nomeGara);
    if(!gara) {
        console.log("Gara non trovata.");
        return;
    }

    let numeroPartecipanti=parseInt(prompt("Inserisci il numero di partecipanti:"));
    visualizzaElencoAtleti();
    for(let i=0; i<numeroPartecipanti; i++) {
        let atleta=parseInt(prompt("Inserire il numero dell'atleta che si vuole aggiungere"));
        let giocatore=giocatori[atleta-1];
        gara.aggiungiPartecipante(giocatore);
    }

    console.log(`Partecipanti alla gara ${nomeGara} registrati con successo.`);
    console.log(`Ecco l'elenco dei partecipanti: `);
    for(let i=0; i<numeroPartecipanti; i++) {
        console.log(`${gara.partecipanti[i].nome} ${gara.partecipanti[i].cognome}`);
    }
}

/**
 * Aggiorna la classifica di campionato.
 */
function aggiornaClassifica() {
    console.log("Elenco delle gare disponibili:");
    gare.forEach((gara, index) => {
        console.log(`${index+1}. ${gara.nomeGara}`);
    });

    let indiceGara=parseInt(prompt("Inserisci il numero corrispondente alla gara su cui vuoi aggiornare i punteggi:"))-1;
    if(isNaN(indiceGara) || indiceGara<0 || indiceGara>=gare.length) {
        console.log("Scelta non valida. Riprova.");
        return;
    }

    let garaSelezionata=gare[indiceGara];

    garaSelezionata.partecipanti.forEach(partecipante => {
        let punteggio=parseInt(prompt(`Inserisci il punteggio per ${partecipante.nome} ${partecipante.cognome} nella gara ${garaSelezionata.nomeGara}:`));
        partecipante.aggiungiPunteggio(punteggio);
    });

    visualizzaClassifica();
}

/**
 * Visualizza la classifica del campionato aggiornata,con i nuovi punteggi.
 */
function visualizzaClassifica() {
    console.log("Classifica:");
    giocatori.sort((a, b) => b.calcolaPunteggioTotale() - a.calcolaPunteggioTotale());
    giocatori.forEach((giocatore, index) => {
        console.log(`${index+1}. ${giocatore.nome} ${giocatore.cognome} - Punteggio totale: ${giocatore.calcolaPunteggioTotale()}`);
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

    let scelta=parseInt(prompt("Inserisci la tua scelta:"));
    switch(scelta) {
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
 * Visualizza la percentuale di gare vinte, dei piazzamenti a podio e fuori dal podio di ogni giocatore e la media totale dei punteggi dei giocatori.
 */
function visualizzaStatisticheGiocatori() {
    const numGareTotali=gare.length;
    const mediaPunteggiTotali=giocatori.reduce((acc, giocatore) => acc + giocatore.calcolaPunteggioTotale(), 0) / giocatori.length;

    giocatori.forEach(giocatore => {
        const percentuali=giocatore.calcolaPercentuali(numGareTotali);

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
