import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail, MessageCircle, ShieldCheck, UsersRound, Vote } from "lucide-react";

const FP_RED = "#d40000";

const WHATSAPP_TEXT = encodeURIComponent(
  "Ciao, arrivo dal sito FP CGIL Rovigo. Vorrei informazioni sulle RSU e sulla possibilita di candidarmi. Grazie."
);

const PROGRAMMI = [
  "Programma generale FP CGIL Rovigo",
  "Sanita pubblica e socio-sanitaria",
  "Funzioni Locali",
  "Funzioni Centrali",
  "Materiali e volantini per la campagna",
];

function Pill({ children, inverse }: { children: React.ReactNode; inverse?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        border: inverse ? "1px solid rgba(255,255,255,0.30)" : "1px solid rgba(212,0,0,0.25)",
        background: inverse ? "rgba(255,255,255,0.14)" : "rgba(212,0,0,0.10)",
        color: inverse ? "#fff" : FP_RED,
        padding: "6px 10px",
        fontSize: 12,
        fontWeight: 950,
        letterSpacing: 0.3,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 14,
        background: "#fff",
        padding: 18,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(212,0,0,0.10)",
            color: FP_RED,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          {icon}
        </span>
        <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.15, fontWeight: 950 }}>{title}</h2>
      </div>
      <div style={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.55, fontSize: 15 }}>{children}</div>
    </section>
  );
}

function ActionLink({
  href,
  children,
  icon,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      className="btn"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      style={{
        borderRadius: 999,
        padding: "12px 16px",
        fontWeight: 950,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: primary ? FP_RED : "#fff",
        borderColor: primary ? FP_RED : "rgba(0,0,0,0.12)",
        color: primary ? "#fff" : "#111",
      }}
    >
      {icon}
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

export default function RsuPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 18,
          background:
            "linear-gradient(135deg, rgba(212,0,0,0.96) 0%, rgba(110,0,0,0.98) 46%, rgba(17,17,17,1) 100%)",
          color: "#fff",
          padding: "clamp(20px, 4vw, 34px)",
          minHeight: 300,
          display: "grid",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 4px, transparent 4px, transparent 10px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 18, alignItems: "center" }}>
          <div>
            <Pill inverse>
              <Vote size={14} /> RSU FP CGIL Rovigo
            </Pill>
            <h1 style={{ margin: "14px 0 0", maxWidth: 760, fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 0.96, fontWeight: 1000 }}>
              Rappresentare il lavoro, per davvero.
            </h1>
            <p style={{ margin: "14px 0 0", maxWidth: 760, color: "rgba(255,255,255,0.82)", fontSize: 18, lineHeight: 1.45 }}>
              Una sezione dedicata alle RSU: cosa sono, cosa fanno, come candidarsi con FP CGIL Rovigo e dove trovare materiali e programma.
            </p>
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <ActionLink href={`https://wa.me/393405614635?text=${WHATSAPP_TEXT}`} icon={<MessageCircle size={18} />} primary>
                Chiedi informazioni
              </ActionLink>
              <ActionLink href="#programma" icon={<FileText size={18} />}>
                Vedi programma
              </ActionLink>
            </div>
          </div>
          <div
            style={{
              width: 132,
              height: 168,
              borderRadius: 16,
              background: "#fff",
              padding: 10,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.40), 0 18px 48px rgba(0,0,0,0.28)",
              overflow: "hidden",
              display: "none",
            }}
            className="rsuHeroLogo"
          >
            <Image
              src="/images/brand/logo-fp-cgil-rovigo.jpg"
              alt="FP CGIL Rovigo"
              width={132}
              height={168}
              sizes="132px"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              priority
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 720px) {
          .rsuHeroLogo { display: block !important; }
        }
        .rsuList {
          margin: 10px 0 0;
          padding-left: 18px;
        }
        .rsuList li {
          margin: 7px 0;
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <SectionCard icon={<UsersRound size={20} />} title="Che cosa sono le RSU">
          <p style={{ margin: 0 }}>
            RSU significa Rappresentanza Sindacale Unitaria: e l&apos;organismo eletto nei luoghi di lavoro che rappresenta lavoratrici e lavoratori, iscritti e non iscritti al sindacato.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            Nel lavoro pubblico le regole fanno riferimento agli accordi quadro e al regolamento elettorale nazionale. La pagina nazionale FP CGIL raccoglie il quadro generale.
          </p>
        </SectionCard>

        <SectionCard icon={<Vote size={20} />} title="Come si formano">
          <p style={{ margin: 0 }}>
            Le RSU si formano attraverso elezioni nel singolo ente o luogo di lavoro. Il voto da legittimita alla rappresentanza e permette di costruire una voce collettiva dentro l&apos;amministrazione.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            Chi viene eletto nella lista FP CGIL rappresenta tutte le colleghe e tutti i colleghi, non solo chi e iscritto.
          </p>
        </SectionCard>

        <SectionCard icon={<ShieldCheck size={20} />} title="Cosa fanno">
          <p style={{ margin: 0 }}>
            La RSU segue l&apos;applicazione del contratto, porta bisogni e proposte al confronto con l&apos;amministrazione, partecipa alla contrattazione integrativa e promuove assemblee e informazione.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            La sua forza non e solo nelle regole: conta la capacita di ascoltare, costruire consenso e trasformare problemi individuali in risposte collettive.
          </p>
        </SectionCard>

        <SectionCard icon={<FileText size={20} />} title="Durata e diritti">
          <p style={{ margin: 0 }}>
            La RSU resta normalmente in carica tre anni. Ha diritti sindacali collegati al proprio ruolo: assemblee, bacheca, permessi e strumenti previsti da leggi, accordi e contratti.
          </p>
          <p style={{ margin: "8px 0 0" }}>
            Per i casi personali o delicati e sempre meglio affiancare al primo orientamento il contatto con FP CGIL Rovigo.
          </p>
        </SectionCard>
      </div>

      <section
        id="programma"
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 18,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <div style={{ height: 7, background: FP_RED }} />
        <div style={{ padding: 18 }}>
          <Pill>Programma e materiali</Pill>
          <h2 style={{ margin: "12px 0 0", fontSize: 32, lineHeight: 1.05, fontWeight: 1000 }}>Il programma FP CGIL Rovigo</h2>
          <p style={{ margin: "10px 0 0", color: "rgba(0,0,0,0.72)", lineHeight: 1.55, maxWidth: 840 }}>
            Questa sezione diventera il punto di raccolta del programma, dei volantini e dei materiali utili per la campagna RSU. Intanto la prepariamo per comparti e temi, cosi sara pronta quando avremo i documenti definitivi.
          </p>

          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
            {PROGRAMMI.map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(0,0,0,0.10)",
                  borderRadius: 12,
                  padding: 14,
                  background: "linear-gradient(180deg, #fff 0%, #fafafa 100%)",
                }}
              >
                <div style={{ fontWeight: 950, lineHeight: 1.2 }}>{item}</div>
                <div style={{ marginTop: 8, color: "rgba(0,0,0,0.58)", fontSize: 13, fontWeight: 800 }}>In aggiornamento</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section
        style={{
          borderRadius: 18,
          background: "#111",
          color: "#fff",
          padding: 18,
          display: "grid",
          gap: 12,
        }}
      >
        <Pill>Parliamone</Pill>
        <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.08, fontWeight: 1000 }}>Vuoi sapere chi e il tuo delegato? Contattaci.</h2>
        <p style={{ margin: 0, maxWidth: 820, color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
          Ti aiutiamo a capire chi segue il tuo ente, quale referente contattare e come partecipare al percorso RSU con FP CGIL Rovigo.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <ActionLink href={`https://wa.me/393405614635?text=${WHATSAPP_TEXT}`} icon={<MessageCircle size={18} />} primary>
            Scrivici su WhatsApp
          </ActionLink>
          <ActionLink href="mailto:fp.rovigo@veneto.cgil.it?subject=Informazioni%20RSU%20FP%20CGIL%20Rovigo" icon={<Mail size={18} />}>
            Email
          </ActionLink>
          <Link
            className="btn rsuContactButton"
            href="/contatti"
            style={{
              borderRadius: 999,
              padding: "12px 16px",
              fontWeight: 950,
              background: "#fff",
              borderColor: "rgba(255,255,255,0.80)",
              color: "#111",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            Contatti <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
