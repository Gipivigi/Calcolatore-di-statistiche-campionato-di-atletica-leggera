class Atleta{
    constructor(nome,cognome,eta)
    {
        this.nome=nome;
        this.cognome=cognome;
        this.eta=eta;
        this.gare=[];
    }

    get nome(){
        return this.nome;
    }

    get cognome(){
        return this.cognome;
    }

    get eta(){
        return this.eta;
    }

    registraGara(gara)
    {
        this.gare.push(gara.nomeGara());
    }

}

class Gara
{
    constructor(nomeGara)
    {
        this.nomeGara=nomeGara;
        this.atleti=[];
    }

    get nomeGara()
    {
        return this.nomeGara;
    }

    aggiungiPartecipante(atleta){
        this.atleti.push(atleta);
    }
}

function gestioneCampionato()
{
    console.log(`CALCOLATORE DI STATISTICHE CAMPIONATO ATLETICA LEGGERA`);
    console.log(`(1) Ragistra nuovo atleta.`);
    console.log(`(2) Registra una nuova gara.`);
    console.log(`(3) Inserisci risultati della gara.`);
    console.log(`(4) Visualizza la classifica del campionato.`);
    console.log(`(5) Visualizza la media dei concorrenti per gara`);
    console.log(`(6) Visualizza andamento del singolo giocatore`);
    console.log(`(7) Azzera dati`);
    console.log(`(8) Esci dal programma`);
}

function main()
{
    gestioneCampionato();
}

main()