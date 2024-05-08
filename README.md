                                         Calcolatore di statistiche campionato di atletica leggera
Questo progetto è un calcolatore di statistiche per un campionato di atletica leggera. Consente di registrare giocatori, gare e di tenere traccia dei punteggi ottenuti dai giocatori in ogni gara. È in grado di calcolare la classifica generale del campionato, le statistiche dei giocatori e aggiornare la classifica dopo ogni gara.

                                                                Classe Giocatore
La classe Giocatore rappresenta un giocatore nel campionato di atletica leggera.

                                                                Metodi
aggiungiPunteggio(punteggio): Aggiunge un punteggio alla lista dei punteggi per gara del giocatore.

calcolaPunteggioTotale(): Calcola il punteggio totale del giocatore sommando tutti i suoi punteggi per gara.

calcolaPercentuali(numGareTotali): Calcola le percentuali di vittorie, podi e gare fuori dal podio del giocatore. Riceve in input il numero totale di gare disputate nel campionato e restituisce un oggetto contenente le percentuali di vittorie, podi e gare fuori dal podio.
                                                                Classe Gara
La classe Gara rappresenta una singola gara nel campionato.

                                                                Metodi
aggiungiPartecipante(giocatore): Aggiunge un giocatore alla lista dei partecipanti della gara.
                                                                Funzioni
visualizzaElencoAtleti(): Stampa l'elenco dei giocatori registrati nel campionato, mostrando il loro nome, cognome ed età.

registraNuovoGiocatore(): Permette di registrare un nuovo giocatore nel campionato.

registraNuovaGara(): Permette di registrare una nuova gara nel campionato.

registraPartecipanti(): Permette di registrare i partecipanti ad una gara.

aggiornaClassifica(): Aggiorna la classifica del campionato con i nuovi punteggi ottenuti dai giocatori nella gara selezionata.

visualizzaClassifica(): Visualizza la classifica aggiornata del campionato, ordinando i giocatori in base ai punteggi totali.

visualizzaStatisticheGiocatori(): Visualizza le statistiche di ogni giocatore, incluse le percentuali di vittorie, podi e gare fuori dal podio, insieme alla media dei punteggi totali.

gestioneCampionato(): Funzione principale del programma, che gestisce le operazioni del campionato.
