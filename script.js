//viene interrogato il DOM che restituisce tutti i bottoni con la classe "year-button"
const yearButtons = document.querySelectorAll('.year-button');
//vengono selezionati tutti i testi delle varie annualità con la classe "timeline-text-container"
const yearContents = document.querySelectorAll('.timeline-text-container');

// a tutti i bottoni della timeline, ovvero ai vari anni, viene aggiunto l'evento "click"
yearButtons.forEach(button => { // ciclo per ogni button
    button.addEventListener('click', () => {
        // viene rimossa da tutti i bottoni la classe active (originariamente associata solo al bottone dell'anno 2023 in quanto anno corrente
        yearButtons.forEach(btn => btn.classList.remove('active'));
        
        // viene aggiunta la classe "active" al bottone sul quale l'utente ha cliccato (ad es. se utente clicca su 2022 viene attivato quell'anno)
        button.classList.add('active');

        // nella costante selectedYear viene inserito l'anno che l'utente ha cliccato
        const selectedYear = button.dataset.year;

        // viene mostrato all'utente solo il contenuto dell'anno selezionato
        yearContents.forEach(content => {
            if (content.dataset.year === selectedYear) {
                content.classList.add('active'); // questa funzione mostra solo il contenitore selezionato associandogli l'attributo "active"
            } else {
                content.classList.remove('active'); // questa funzione nasconde tutti gli altri contenitori rimuovendogli l'attributo "active"
            }
        });
    });
});

/* Recupera la lista degli elementi nel DOM con la classe info-block e la restituisce. 
La costante infoBlocks conterrà quindi tutti i blocchi ai quali abbiamo la necessità di applicare l’animazione di transizione;*/
const infoBlocks = document.querySelectorAll('.info-block');

/* In questo caso utilizziamo un API del browser, ovvero IntersectionObserver, con la 
quale andiamo ad osservare quando un elemento entra o esce dall’interfaccia utente.
A ciò passiamo una callback che riceve due parametri, ovvero:
entries: che contiene tutte le informazioni sull’elemento osservato
observer: che ci permette di interrompere l’osservazione. In questo caso 
è utile perché l’animazione viene proposta all’utente solo la prima volta che visita la pagina.*/
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
		/*Qui Andiamo ad iterare su ogni occorrenza (entry) dell’array entries di cui abbiamo parlato prima. 
		Attraverso il booleano “entry.isIntersecting” (true or false) andiamo a 
		verificare se l’elemento è entrato nella viewport (interfaccia) dell’utente 
		attraverso il confronto con il threshold. In questo caso l’utente dovrà aver scoperto almeno il 90% 
		del blocco affinché questo appaia. Se la condizione è vera viene aggiunta la classe “visible” e il blocco appare sullo schermo dell’utente.*/
	if (entry.isIntersecting) {
            entry.target.classList.add('visible'); 
			/*Con observer.unobserve(entry.target) andiamo ad interrompere l’osservazione degli elementi 
			in modo che l’animazione venga effettuata solo la prima volta ad ogni visita.*/
            observer.unobserve(entry.target); // Interrompe l'osservazione dopo l'animazione
        }
    });
	/*threshold, 
	che in questo caso è impostato a 0.9 ci indica quanto 
	l’utente dovrà scorrere la pagina affinché il blocco appaia sul suo schermo.*/
}, { threshold: 0.9 }); // Inizia l'animazione quando il 90% del blocco è visibile

/*In fine andiamo a richiamare observer.observe(block) per ogni blocco 
che va mostrato e animato all’utente.*/
infoBlocks.forEach(block => {
    observer.observe(block);
});
