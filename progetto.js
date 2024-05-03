let prompt=require("prompt-sync")();
class Giocatore {
    constructor(nome, cognome, eta) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
        this.punteggiPerGara = []; // Array per memorizzare i punteggi per ogni gara
    }

    aggiungiPunteggio(punteggio) {
        this.punteggiPerGara.push(punteggio);
    }

    calcolaPunteggioTotale() {
        return this.punteggiPerGara.reduce((acc, curr) => acc + curr, 0); // Somma di tutti i punteggi
    }
}

class Gara {
    constructor(nomeGara) {
        this.nomeGara = nomeGara;
        this.partecipanti = [];
    }

    aggiungiPartecipante(giocatore) {
        this.partecipanti.push(giocatore);
    }
}

let giocatori = [];
let gare = [];

function visualizzaElencoAtleti()
{
    for(let i=0; i<giocatori.length; i++)
    {
        console.log(`${i+1} ${giocatori[i]["nome"]} ${giocatori[i]["cognome"]} ${giocatori[i]["eta"]}`);
    }
}

function registraNuovoGiocatore() {
    let nome=prompt("Inserisci il nome del giocatore:");
    let cognome=prompt("Inserisci il cognome del giocatore:");
    let eta=parseInt(prompt("Inserisci l'età del giocatore:"));

    let nuovoGiocatore=new Giocatore(nome, cognome, eta);
    giocatori.push(nuovoGiocatore);

    console.log(`Giocatore ${nome} ${cognome} registrato con successo.`);
}

function registraNuovaGara() {
    let nomeGara = prompt("Inserisci il nome della gara:");
    let nuovaGara = new Gara(nomeGara);
    gare.push(nuovaGara);
    console.log(`Gara ${nomeGara} registrata con successo.`);
}

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
        let atleta=Number(prompt(`Inserire il numero dell'atleta che si vuole aggiungere`));
        let giocatore=giocatori[atleta-1];
        gara.aggiungiPartecipante(giocatore);
    }

    console.log(`Partecipanti alla gara ${nomeGara} registrati con successo.`);
    console.log(`Ecco l'elenco dei partecipanti: `);
    for(let i=0; i<numeroPartecipanti; i++)
    {
        console.log(`${gara["partecipanti"][i]["nome"]} ${gara["partecipanti"][i]["cognome"]}`);
    }
}

function aggiornaClassifica(){
    // Resetta i punteggi totali dei giocatori
    giocatori.forEach(giocatore => {
        giocatore.punteggio = 0;
    });

    // Visualizza elenco delle gare disponibili e chiedi all'utente su quale gara aggiornare i punteggi
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

    // Aggiorna i punteggi totali dei giocatori per la gara selezionata
    garaSelezionata.partecipanti.forEach(partecipante => {
        let punteggio = parseInt(prompt(`Inserisci il punteggio per ${partecipante.nome} ${partecipante.cognome} nella gara ${garaSelezionata.nomeGara}:`));
        partecipante.aggiungiPunteggio(punteggio); // Aggiungi il punteggio alla lista del giocatore per quella gara
        partecipante.punteggio += punteggio; // Aggiorna il punteggio totale del giocatore
    });

    // Ordina i giocatori in base ai punteggi totali
    giocatori.sort((a, b) => b.calcolaPunteggioTotale() - a.calcolaPunteggioTotale());

    // Visualizza la classifica aggiornata
    console.log("Classifica aggiornata:");
    giocatori.forEach((giocatore, index) => {
        console.log(`${index + 1}. ${giocatore.nome} ${giocatore.cognome} - Punteggio totale: ${giocatore.calcolaPunteggioTotale()}`);
    });
}

function visualizzaClassifica() {
    // Ordina i giocatori in base ai punteggi totali
    giocatori.sort((a, b) => b.calcolaPunteggioTotale() - a.calcolaPunteggioTotale());

    // Visualizza la classifica aggiornata
    console.log("Classifica:");
    giocatori.forEach((giocatore, index) => {
        console.log(`${index + 1}. ${giocatore.nome} ${giocatore.cognome} - Punteggio totale: ${giocatore.calcolaPunteggioTotale()}`);
    });
}

function gestioneCampionato() {
    console.log(`GESTIONE CAMPIONATO DI ATLETICA LEGGERA`);
    console.log(`(1) Registra nuovo giocatore.`);
    console.log(`(2) Registra una nuova gara.`);
    console.log(`(3) Registra partecipanti ad una gara.`);
    console.log(`(4) Aggiorna classifica del campionato.`);
    console.log(`(5) Aggiorna classifica del campionato.`);
    console.log(`(6) ESCI DAL PROGRAMMA.`);

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
            return;
        case 6:
            console.log("Programma terminato.");
            return;
        default:
            console.log("Scelta non valida. Riprova.");
    }

    gestioneCampionato();
}

gestioneCampionato();
