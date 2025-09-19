import { useState } from "react";
import Modal from "../components/ModalSuccess";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [modalOpen, setModalOpen] = useState(false);

  // Track which fields have errors
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    });

    // Field validation
    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      email: email.trim() === "",
      message: message.trim() === "",
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/vanilla/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // Input class helper
  const inputClass = (hasError: boolean) =>
    `w-full rounded-2xl border px-5 py-3 bg-transparent text-neutral-main focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
      hasError ? "border-red-500 focus:ring-red-500" : "border-gray-700"
    }`;

  return (
    <section className="py-2 xl:py-12">
      <div className="mx-auto w-full px-6 lg:px-42">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
          <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
            Contact<span className="text-5xl font-black text-indigo-500">.</span>
          </p>
          <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
            Send me a message - no carrier pigeon required
          </p>
        </div>

        <div className="mx-auto w-full max-w-5xl mb-16 xl:mb-4">
          <form onSubmit={handleSubmit} className="-mx-4 flex flex-wrap lg:items-stretch">
            {/* LEFT: stacked inputs */}
            <div className="w-full px-4 lg:w-1/2 flex flex-col gap-y-4">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass(errors.firstName)}
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass(errors.lastName)}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass(errors.email)}
              />
            </div>

            {/* RIGHT: Message textarea */}
            <div className="w-full px-4 mt-6 lg:mt-0 lg:w-1/2 flex">
              <textarea
                id="message"
                name="message"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass(errors.message) + " h-full resize-none py-4"}
              />
            </div>

            {/* BUTTON */}
            <div className="w-full px-4 mt-6 justify-center items-center flex">
              <button
                type="submit"
                className="flex w-full lg:w-xs items-center justify-center gap-2 rounded-2xl px-4 py-3 text-md font-medium transition bg-indigo-500 text-white hover:bg-indigo-600"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </div>

            {/* STATUS MESSAGE */}
            {status === "error" && (
              <p className="w-full text-center mt-4 text-red-500 font-semibold animate-pulse">
                Oops! Looks like you missed something. Fill all required fields.
              </p>
            )}
          </form>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Message sent!"
        message="I will get back to you soon… but don't hold your breath :)"
      />
    </section>
  );
}