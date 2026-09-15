import { useState } from "react";
import PageHeader from "../components/PageHeader";

const questions = [
  [
    "How long does delivery take?",
    "Standard delivery usually takes 3-5 business days. Express delivery takes 1-2 business days after dispatch.",
  ],
  [
    "Can I return a component?",
    "Unused components in their original packaging can be returned within 30 days. Contact support before shipping anything back.",
  ],
  [
    "How do I know a part will fit?",
    "Check the specifications on the product page and send our support team your bike model, current parts, and intended build.",
  ],
  [
    "Can I track my order?",
    "Open Track Order in the footer and enter the order number from your confirmation. Signed-in customers can also find every order in their account.",
  ],
  [
    "Do you offer trade pricing?",
    "Yes. Contact us with your shop details and estimated volume and we will prepare a trade account quote.",
  ],
];

const FAQPage = () => {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <PageHeader
        eyebrow="SUPPORT CENTRE"
        title="COMMON"
        accent="QUESTIONS"
        subtitle="Clear answers for choosing, ordering, and fitting your next component."
      />
      <section
        style={{ maxWidth: 820, margin: "0 auto", padding: "56px 40px 100px" }}
      >
        {questions.map(([question, answer], index) => (
          <div key={question} style={{ borderTop: "1px solid #252525" }}>
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "#F0F0F0",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "left",
                padding: "22px 0",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              <span>{question}</span>
              <span style={{ color: "#FF5500", fontSize: 22 }}>
                {open === index ? "−" : "+"}
              </span>
            </button>
            {open === index && (
              <p
                style={{
                  color: "#777",
                  lineHeight: 1.7,
                  fontSize: 14,
                  margin: "-4px 40px 24px 0",
                }}
              >
                {answer}
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};
export default FAQPage;
