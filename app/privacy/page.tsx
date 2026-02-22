export const metadata = {
  title: "Privacy Policy – FP CGIL Rovigo",
};

export default function PrivacyPage() {
  const updated = new Date().toLocaleDateString("it-IT");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.65 }}>
      <h1>Privacy Policy</h1>

      <p>
        La presente informativa descrive come vengono trattati i dati personali degli utenti che consultano
        il sito <b>FP CGIL Rovigo</b>, ai sensi del Regolamento (UE) 2016/679 (GDPR) e della normativa
        nazionale applicabile.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        <b>FP CGIL Rovigo</b> 
      </p>

      <h2>Dati trattati</h2>
      <ul>
        <li>
          <b>Dati di navigazione</b>: informazioni tecniche (es. indirizzo IP, log, dati di sicurezza)
          necessarie al funzionamento del sito e alla prevenzione di abusi.
        </li>
        <li>
          <b>Dati forniti volontariamente</b>: dati inviati dall’utente tramite email o altri canali
          di contatto eventualmente indicati sul sito.
        </li>
      </ul>

      <h2>Finalità e basi giuridiche</h2>
      <ul>
        <li>
          <b>Funzionamento e sicurezza del sito</b> (necessità tecnica e/o legittimo interesse del titolare).
        </li>
        <li>
          <b>Riscontro a richieste dell’utente</b> (esecuzione di misure precontrattuali/contrattuali o
          adempimento di obblighi connessi alla richiesta).
        </li>
      </ul>

      <h2>Modalità del trattamento</h2>
      <p>
        Il trattamento avviene con strumenti informatici e misure di sicurezza adeguate, nel rispetto dei
        principi di liceità, correttezza, trasparenza, minimizzazione e limitazione della conservazione.
      </p>

      <h2>Destinatari</h2>
      <p>
        I dati possono essere trattati da fornitori tecnici che supportano l’erogazione del servizio
        (es. hosting e manutenzione), nominati – se necessario – responsabili del trattamento.
      </p>

      <h2>Conservazione</h2>
      <p>
        I dati sono conservati per il tempo strettamente necessario alle finalità indicate e, quando applicabile,
        in conformità agli obblighi di legge o alle esigenze di tutela.
      </p>

      <h2>Link a siti terzi</h2>
      <p>
        Il sito può contenere link a pagine o servizi esterni. Accedendo a tali siti, l’utente è soggetto
        alle policy dei rispettivi titolari, che operano in autonomia rispetto a FP CGIL Rovigo.
      </p>

      <h2>Diritti dell’interessato</h2>
      <p>
        L’utente può esercitare i diritti previsti dal GDPR (accesso, rettifica, cancellazione, limitazione,
        opposizione, portabilità), nei limiti e alle condizioni previste dalla normativa. È inoltre possibile
        proporre reclamo al Garante per la protezione dei dati personali.
      </p>

      <h2>Contatti</h2>
      <p>
        Per richieste in materia di privacy: <b>fp.rovigo@veneto.cgil.it</b>
      </p>

      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.75 }}>
        Ultimo aggiornamento: {updated}
      </p>
    </div>
  );
}