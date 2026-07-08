export const metadata = {
  title: "Cookie Policy - FP CGIL Rovigo",
};

const UPDATED = "2 luglio 2026";

export default function CookiePolicyPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.65 }}>
      <h1>Cookie Policy</h1>

      <p>
        Questa pagina spiega quali cookie utilizza il sito <b>FP CGIL Rovigo</b> e come vengono gestiti.
      </p>

      <h2>Che cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti salvano nel browser per consentire
        il corretto funzionamento e, in alcuni casi, migliorare l’esperienza di navigazione.
      </p>

      <h2>Cookie utilizzati da questo sito</h2>
      <p>
        Il sito utilizza <b>cookie tecnici</b>, necessari al funzionamento, alla sicurezza e alla
        memorizzazione delle preferenze espresse dall’utente. Non vengono utilizzati cookie di
        profilazione né sistemi di tracciamento pubblicitario.
      </p>

      <h3>Cookie tecnici</h3>
      <ul>
        <li>
          <b>fp_consent</b> – memorizza le preferenze sui cookie tecnici e sui contenuti esterni –
          durata circa 180 giorni.
        </li>
        <li>
          Eventuali cookie tecnici di base del framework/hosting (es. sicurezza, bilanciamento, prestazioni),
          se presenti, sono strettamente necessari al funzionamento del servizio.
        </li>
      </ul>

      <h2>Contenuti e link verso servizi esterni</h2>
      <p>
        Alcune pagine possono contenere link o contenuti collegati a servizi esterni, ad esempio
        Google Maps, WhatsApp, social network, siti FP CGIL esterni o documenti aperti in una nuova
        scheda. I contenuti esterni incorporati nella pagina vengono caricati solo dopo l’abilitazione
        da parte dell’utente. Cliccando su link verso siti terzi, l’utente accede invece a servizi che
        applicano le proprie informative e possono impostare cookie secondo le rispettive regole.
      </p>
      <p>
        La mappa incorporata è fornita da <b>Google Maps</b> e non viene caricata prima della scelta
        dell'utente. I semplici collegamenti a WhatsApp, social network, Google Maps e siti esterni non
        installano cookie tramite questo sito; il trattamento da parte del servizio esterno inizia quando
        l'utente apre volontariamente il collegamento.
      </p>

      <h2>Analytics e profilazione</h2>
      <p>
        Il sito non utilizza Google Analytics, pixel pubblicitari, cookie di profilazione o sistemi di
        tracciamento per finalità commerciali.
      </p>

      <h2>Come gestire o cancellare le preferenze</h2>
      <p>
        È possibile riaprire la scelta dal pulsante <b>Gestisci cookie</b> nel footer del sito.
        È inoltre possibile cancellare i cookie dalle impostazioni del browser; le procedure variano
        a seconda del browser utilizzato.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.75 }}>
        Ultimo aggiornamento: {UPDATED}
      </p>
    </div>
  );
}
