export const metadata = {
  title: "Privacy Policy - FP CGIL Rovigo",
  description: "Informativa sul trattamento dei dati personali del sito FP CGIL Rovigo e dei servizi Quadrato Rosso e Segreteria AI.",
};

const UPDATED = "2 luglio 2026";

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.65 }}>
      <h1>Privacy Policy</h1>

      <p>
        La presente informativa descrive il trattamento dei dati personali degli utenti del sito
        <b> FP CGIL Rovigo</b>, ai sensi del Regolamento (UE) 2016/679 (GDPR) e della normativa
        nazionale applicabile.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        Il titolare territoriale del trattamento è <b>FLFP CGIL</b>, con sede in Via Calatafimi 1/B,
        45100 Rovigo, nella persona del Segretario Generale <b>Riccardo Mantovan</b>.
      </p>
      <p>
        Email: <a href="mailto:fp.rovigo@veneto.cgil.it">fp.rovigo@veneto.cgil.it</a>.
      </p>

      <h2>Dati trattati</h2>
      <ul>
        <li>
          <b>Dati di navigazione</b>: indirizzo IP, data e ora della richiesta, pagina richiesta,
          informazioni sul browser e altri dati tecnici necessari al funzionamento e alla sicurezza.
        </li>
        <li>
          <b>Dati forniti volontariamente</b>: contenuti e recapiti trasmessi tramite email, telefono,
          WhatsApp o altri canali indicati sul sito.
        </li>
        <li>
          <b>Messaggi inviati a Quadrato Rosso</b>: testo della domanda e messaggi recenti della
          conversazione necessari a generare una risposta e orientare l'utente.
        </li>
        <li>
          <b>Chiamate alla Segreteria AI</b>: numero chiamante, data, ora e durata della chiamata,
          contenuto audio, trascrizione, sintesi, recapiti ed eventuali informazioni comunicate
          volontariamente durante la conversazione.
        </li>
      </ul>

      <h2>Finalità e basi giuridiche</h2>
      <ul>
        <li>
          <b>Funzionamento e sicurezza del sito</b>: legittimo interesse del titolare a garantire
          disponibilità, integrità e prevenzione degli abusi, ai sensi dell'art. 6, par. 1, lett. f) GDPR.
        </li>
        <li>
          <b>Riscontro alle richieste e ricontatto</b>: esecuzione di misure adottate su richiesta
          dell'interessato e legittimo interesse a gestire le comunicazioni, ai sensi dell'art. 6,
          par. 1, lett. b) e f) GDPR.
        </li>
        <li>
          <b>Quadrato Rosso e Segreteria AI</b>: fornitura di un servizio informativo di primo
          orientamento e indirizzamento al referente competente, sulla base del legittimo interesse del
          titolare e della richiesta dell'utente, ai sensi dell'art. 6, par. 1, lett. f) GDPR.
        </li>
        <li>
          <b>Contenuti esterni</b>: caricamento di servizi come Google Maps esclusivamente dopo la scelta
          dell'utente, ai sensi dell'art. 6, par. 1, lett. a) GDPR e dell'art. 122 del Codice Privacy.
        </li>
      </ul>

      <h2>Dati particolari e richieste sindacali</h2>
      <p>
        Quadrato Rosso e la Segreteria AI non sono destinati alla raccolta di dati sanitari, appartenenza
        sindacale, documenti, codici fiscali, informazioni su vertenze, procedimenti disciplinari o altre
        categorie particolari di dati. Per richieste personali o delicate è necessario utilizzare i canali
        ufficiali e parlare direttamente con un referente, dove verrà fornita l'informativa appropriata.
      </p>
      <p>
        Qualora tali informazioni siano comunicate in modo non richiesto, saranno utilizzate soltanto nella
        misura strettamente necessaria a interrompere il flusso automatizzato e indirizzare l'interessato a
        un contatto umano, senza sviluppare valutazioni o consulenze automatizzate.
      </p>

      <h2>Quadrato Rosso</h2>
      <p>
        Quadrato Rosso è un assistente digitale basato su intelligenza artificiale. I messaggi sono inviati
        all'API di OpenAI per generare la risposta. FLFP CGIL non utilizza la chat per prendere decisioni
        automatizzate che producano effetti giuridici o analogamente significativi e non conserva le
        conversazioni in un proprio database.
      </p>
      <p>
        I dati inviati tramite l'API OpenAI non sono utilizzati per addestrare i modelli per impostazione
        predefinita. OpenAI può conservare log di monitoraggio degli abusi contenenti input e output fino a
        30 giorni, salvo obblighi di legge o configurazioni di conservazione più restrittive.
      </p>

      <h2>Quadrato Rosso Segreteria AI e Fonio</h2>
      <p>
        La Segreteria AI, fornita tramite <b>Fonio</b>, risponde alle chiamate, raccoglie la richiesta,
        produce una trascrizione e una sintesi e può inoltrare le informazioni necessarie alla sede o al
        referente competente. All'inizio della chiamata l'utente deve essere informato che sta interagendo
        con un sistema di intelligenza artificiale e che la conversazione viene registrata e trascritta.
      </p>
      <p>
        Fonio dichiara di ospitare la propria infrastruttura nell'Unione europea e di utilizzare servizi
        LLM tramite infrastruttura europea. Registrazioni, trascrizioni e dati della chiamata sono conservati
        esclusivamente per il tempo strettamente necessario alla lavorazione della richiesta e al ricontatto,
        quindi cancellati o resi non identificabili, salvo obblighi di legge o necessità di tutela.
      </p>

      <h2>Destinatari e fornitori tecnici</h2>
      <p>I dati possono essere trattati, nei limiti necessari, da:</p>
      <ul>
        <li><b>Vercel</b>, per hosting, distribuzione del sito, sicurezza e log tecnici;</li>
        <li><b>OpenAI Ireland Ltd.</b>, per l'elaborazione dei messaggi di Quadrato Rosso;</li>
        <li><b>Fonio</b>, per il servizio telefonico, la registrazione, la trascrizione e l'inoltro delle richieste;</li>
        <li><b>Google Maps</b>, solo quando l'utente abilita o apre volontariamente il servizio;</li>
        <li>personale e collaboratori FLFP CGIL autorizzati e istruiti per la gestione delle richieste.</li>
      </ul>
      <p>
        I fornitori che trattano dati per conto del titolare sono vincolati, ove applicabile, da accordi ai
        sensi dell'art. 28 GDPR. Qualora un fornitore o un suo sub-responsabile tratti dati fuori dallo Spazio
        economico europeo, il trasferimento avviene sulla base di una decisione di adeguatezza, clausole
        contrattuali standard o altra garanzia prevista dagli artt. 44 e seguenti GDPR.
      </p>

      <h2>Conservazione</h2>
      <ul>
        <li>
          <b>Log tecnici</b>: per il periodo necessario alla sicurezza, al funzionamento del servizio e alla
          gestione di eventuali abusi, secondo le configurazioni del fornitore di hosting.
        </li>
        <li>
          <b>Quadrato Rosso</b>: nessuna archiviazione delle conversazioni in un database FLFP CGIL; OpenAI
          può conservare i log di monitoraggio degli abusi fino a 30 giorni.
        </li>
        <li>
          <b>Segreteria AI Fonio</b>: per il tempo strettamente necessario alla lavorazione della richiesta,
          all'inoltro e all'eventuale ricontatto.
        </li>
        <li>
          <b>Email e richieste di contatto</b>: per il tempo necessario a rispondere e gestire la richiesta,
          oltre gli eventuali termini richiesti dalla legge o dalla tutela dei diritti del titolare.
        </li>
      </ul>

      <h2>Natura del conferimento</h2>
      <p>
        Il conferimento dei dati tramite chat, telefono o altri canali è facoltativo. Il mancato conferimento
        può impedire di fornire una risposta personalizzata o effettuare il ricontatto; resta sempre possibile
        consultare liberamente le pagine pubbliche del sito.
      </p>

      <h2>Link e servizi di terzi</h2>
      <p>
        Il sito contiene link a WhatsApp, social network, Google Maps, siti CGIL e altri servizi esterni.
        Aprendo tali collegamenti, l'utente accede a servizi gestiti da titolari autonomi e soggetti alle
        rispettive informative.
      </p>

      <h2>Diritti dell'interessato</h2>
      <p>
        L'interessato può chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei dati e
        opposizione al trattamento, nei casi e limiti previsti dagli artt. 15-22 GDPR. Quando il trattamento
        si basa sul consenso, questo può essere revocato in qualsiasi momento senza pregiudicare la liceità
        del trattamento precedente alla revoca.
      </p>
      <p>
        Le richieste possono essere inviate a
        <a href="mailto:fp.rovigo@veneto.cgil.it"> fp.rovigo@veneto.cgil.it</a>. È possibile proporre reclamo al
        <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer"> Garante per la protezione dei dati personali</a>.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.75 }}>
        Ultimo aggiornamento: {UPDATED}
      </p>
    </div>
  );
}
