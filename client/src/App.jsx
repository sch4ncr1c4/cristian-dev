import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Header from "./components/Header";
import HabilidadesSection from "./components/HabilidadesSection";
import InicioCard from "./components/InicioCard";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SobreMiSection from "./components/SobreMiSection";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [sending, setSending] = useState(false);
  const [submitState, setSubmitState] = useState("idle");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendContact = async () => {
    // Keep the CTA and toast states in sync to prevent duplicate submissions.
    setSending(true);
    setSubmitState("sending");
    setStatus("");
    setStatusType("success");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) throw new Error("Error");

      setForm(initialForm);
      setStatus("Mensaje enviado.");
      setStatusType("success");
      setSubmitState("sent");
      setTimeout(() => {
        setSubmitState("idle");
      }, 2000);
    } catch {
      setStatus("No se pudo enviar el mensaje.");
      setStatusType("error");
      setSubmitState("idle");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!status) return undefined;

    // Auto-dismiss feedback so the toast does not stay stuck between attempts.
    const timer = setTimeout(() => {
      setStatus("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await sendContact();
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-mobile");
    if (!nodes.length) return undefined;

    // Reveal animation runs only once per section when it enters the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section id="inicio" className="reveal-mobile from-right py-[30px]">
          <InicioCard />
        </section>

        <section className="reveal-mobile from-left py-[30px]">
          <HabilidadesSection />
        </section>

        <section className="reveal-mobile from-right py-[30px]">
          <ProjectsSection />
        </section>

        <section className="reveal-mobile from-left py-[30px]">
          <SobreMiSection />
        </section>

        <section id="contacto" className="reveal-mobile from-right py-[30px]">
          <ContactSection
            form={form}
            sending={sending}
            submitState={submitState}
            status={status}
            statusType={statusType}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </section>
      </main>
      <Footer />
      {status &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className={`status-toast ${
              statusType === "error"
                ? "status-toast-error"
                : "status-toast-success"
            }`}
          >
            <p className="text-sm font-semibold">{status}</p>
          </div>,
          document.body,
        )}
    </>
  );
}

export default App;
