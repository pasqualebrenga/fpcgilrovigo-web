"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, FileImage, FileText, Send, Upload } from "lucide-react";

const categories = [
  "Salute e benessere",
  "Ristorazione",
  "Mare, vacanze e tempo libero",
  "Casa e servizi",
  "Formazione",
  "Professionisti",
  "Altro",
];

const advantageTypes = ["Sconto percentuale", "Prezzo fisso", "Pacchetto dedicato", "Omaggio", "Altro"];

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="proposalField">
      <span>
        {label}
        {required ? <b> *</b> : null}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="proposalField">
      <span>
        {label}
        {required ? <b> *</b> : null}
      </span>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>
          Seleziona
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  required,
  placeholder,
  rows = 5,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="proposalField proposalFieldWide">
      <span>
        {label}
        {required ? <b> *</b> : null}
      </span>
      <textarea name={name} required={required} rows={rows} placeholder={placeholder} />
    </label>
  );
}

function FileField({
  label,
  name,
  accept,
  icon,
  onFileChange,
}: {
  label: string;
  name: string;
  accept: string;
  icon: ReactNode;
  onFileChange: (fileName: string) => void;
}) {
  return (
    <label className="proposalFileField">
      <span className="proposalFileIcon">{icon}</span>
      <span>
        <strong>{label}</strong>
        <small>JPG, PNG, WebP o PDF. Max 2 MB per file.</small>
      </span>
      <input
        name={name}
        type="file"
        accept={accept}
        onChange={(event) => onFileChange(event.target.files?.[0]?.name || "")}
      />
    </label>
  );
}

export default function ProponiConvenzioneForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [logoName, setLogoName] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  const fileSummary = useMemo(() => {
    const files = [logoName, attachmentName].filter(Boolean);
    return files.length ? files.join(" + ") : "Nessun file selezionato";
  }, [attachmentName, logoName]);

  return (
    <form
      className="proposalForm"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");
        setSubmitted(false);
        setSubmissionId("");

        const form = event.currentTarget;
        try {
          const response = await fetch("/api/convenzione-proposta", {
            method: "POST",
            body: new FormData(form),
          });
          const data = (await response.json().catch(() => ({}))) as { error?: string; id?: string };

          if (!response.ok) {
            throw new Error(data.error || "Non sono riuscito a inviare la proposta.");
          }

          setSubmitted(true);
          setSubmissionId(data.id || "");
          form.reset();
          setLogoName("");
          setAttachmentName("");
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (sendError) {
          setError(sendError instanceof Error ? sendError.message : "Non sono riuscito a inviare la proposta.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {submitted ? (
        <div className="proposalSuccess" role="status">
          <CheckCircle2 size={24} />
          <div>
            <strong>Proposta inviata correttamente.</strong>
            <span>
              È stata inviata a fp.ro.brenga@veneto.cgil.it con PDF riepilogativo e allegati separati.
              {submissionId ? ` ID invio: ${submissionId}.` : ""}
            </span>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="proposalError" role="alert">
          <AlertCircle size={24} />
          <div>
            <strong>Invio non riuscito.</strong>
            <span>{error}</span>
          </div>
        </div>
      ) : null}

      <section className="proposalFormSection">
        <div className="proposalSectionHeader">
          <span>1</span>
          <div>
            <h2>Dati aziendali</h2>
            <p>Servono per identificare correttamente la struttura che propone la convenzione.</p>
          </div>
        </div>
        <div className="proposalFormGrid">
          <Field label="Ragione sociale" name="ragioneSociale" required />
          <Field label="Nome commerciale" name="nomeCommerciale" placeholder="Se diverso dalla ragione sociale" />
          <Field label="Partita IVA / Codice fiscale" name="partitaIva" required />
          <Field label="Indirizzo" name="indirizzo" required />
          <Field label="Comune" name="comune" required />
          <Field label="Sito web o pagina social" name="sito" type="url" placeholder="https://..." />
        </div>
      </section>

      <section className="proposalFormSection">
        <div className="proposalSectionHeader">
          <span>2</span>
          <div>
            <h2>Referente</h2>
            <p>La persona da ricontattare per chiarimenti, materiali o approvazione della proposta.</p>
          </div>
        </div>
        <div className="proposalFormGrid">
          <Field label="Nome e cognome" name="referenteNome" required />
          <Field label="Ruolo" name="referenteRuolo" placeholder="Titolare, responsabile, amministrazione..." />
          <Field label="Telefono" name="telefono" type="tel" required />
          <Field label="Email" name="email" type="email" required />
        </div>
      </section>

      <section className="proposalFormSection">
        <div className="proposalSectionHeader">
          <span>3</span>
          <div>
            <h2>Proposta di convenzione</h2>
            <p>Qui racconti cosa offri agli iscritti FP CGIL Rovigo e con quali condizioni.</p>
          </div>
        </div>
        <div className="proposalFormGrid">
          <SelectField label="Categoria attività" name="categoria" options={categories} required />
          <SelectField label="Tipo di vantaggio" name="tipoVantaggio" options={advantageTypes} required />
          <Field label="Durata proposta" name="durata" placeholder="Annuale, stagionale, fino al..." />
          <Field label="Valore indicativo" name="valore" placeholder="Es. 10%, 15 euro, pacchetto famiglia..." />
          <TextareaField
            label="Descrizione della proposta"
            name="descrizione"
            required
            placeholder="Descrivi in modo concreto cosa riceve l’iscritto: sconto, servizio incluso, pacchetto, vantaggio..."
          />
          <TextareaField
            label="Condizioni, esclusioni o note"
            name="condizioni"
            placeholder="Es. giorni validi, prenotazione obbligatoria, esclusioni, periodo di validità, documenti richiesti..."
            rows={4}
          />
        </div>
      </section>

      <section className="proposalFormSection">
        <div className="proposalSectionHeader">
          <span>4</span>
          <div>
            <h2>Materiali</h2>
            <p>Logo e immagine aiutano a preparare una scheda coerente con le altre convenzioni del sito.</p>
          </div>
        </div>
        <div className="proposalFiles">
          <FileField
            label="Logo aziendale"
            name="logo"
            accept="image/png,image/jpeg,image/webp"
            icon={<FileImage size={22} />}
            onFileChange={setLogoName}
          />
          <FileField
            label="Immagine, volantino o listino"
            name="allegato"
            accept="image/png,image/jpeg,image/webp,application/pdf"
            icon={<FileText size={22} />}
            onFileChange={setAttachmentName}
          />
        </div>
        <div className="proposalFileSummary">
          <Upload size={16} />
          {fileSummary}
        </div>
      </section>

      <section className="proposalFormSection">
        <div className="proposalChecks">
          <label>
            <input name="privacy" type="checkbox" required /> Ho letto l’informativa privacy e autorizzo FP CGIL Rovigo
            a ricontattarmi per la valutazione della proposta.
          </label>
          <label>
            <input name="truth" type="checkbox" required /> Dichiaro che i dati inseriti e i materiali inviati sono
            corretti e che posso proporre la convenzione per conto della struttura indicata.
          </label>
        </div>
      </section>

      <div className="proposalFormFooter">
        <div>
          <strong>Invio proposta</strong>
          <span>Genera un PDF automatico e invia la richiesta alla sede con gli allegati caricati.</span>
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Invio in corso..." : "Invia proposta"} <Send size={18} />
        </button>
      </div>
    </form>
  );
}
