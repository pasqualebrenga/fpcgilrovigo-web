export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 18, paddingBottom: 18 }}>
        <div className="muted" style={{ fontSize: 13 }}>
          © {new Date().getFullYear()} FP CGIL Rovigo — Contenuti e contatti del territorio.
        </div>
      </div>
    </footer>
  );
}