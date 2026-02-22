export const metadata = {
  title: "Cookie Policy – FP CGIL Rovigo",
};

export default function CookiePolicyPage() {
  const updated = new Date().toLocaleDateString("it-IT");

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
        Il sito utilizza <b>solo cookie tecnici</b>, necessari al funzionamento e alla sicurezza.
        Non vengono utilizzati cookie di profilazione né sistemi di tracciamento pubblicitario.
      </p>

      <h3>Cookie tecnici</h3>
      <ul>
        <li>
          <b>fp_cookie_info</b> – memorizza la presa visione del banner informativo cookie – durata ~180 giorni.
        </li>
        <li>
          Eventuali cookie tecnici di base del framework/hosting (es. sicurezza, bilanciamento, prestazioni),
          se presenti, sono strettamente necessari al funzionamento del servizio.
        </li>
      </ul>

      <h2>Link verso servizi esterni</h2>
      <p>
        Alcune pagine possono contenere link che rimandano a siti o servizi esterni (ad esempio mappe).
        Cliccando su tali link, l’utente accede a un sito terzo che applica proprie policy e può impostare
        cookie secondo le proprie regole.
      </p>

      <h2>Come gestire o cancellare i cookie</h2>
      <p>
        È possibile gestire o cancellare i cookie dalle impostazioni del browser. Le procedure variano
        a seconda del browser utilizzato.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.75 }}>
        Ultimo aggiornamento: {updated}
      </p>
    </div>
  );
}