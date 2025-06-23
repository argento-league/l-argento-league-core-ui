import { useState } from "react";
import styled from "styled-components";

const faqData = [
  {
    question: "¿La liga es solo para Argentinos?",
    answer:
      "No, la liga esta abierta a cualquier persona, el requisito mínimo es que el capitán sea hispanohablante. A tener en cuenta, en caso de que el equipo no pueda realizar la inscripción utilizando pesos argentinos, la misma se convertirá a dólar, según el tc a la fecha. También deben tener en cuenta que el horario acordado para las partidas será por predeterminado el de Argentina (GMT-3). Por último, se utilizara como predeterminado el servidor de Argentina, exceptuando que el mismo tenga problemas o que ambos capitanes den su expresa confirmación de cambiar el servidor.",
  },
  {
    question: "¿Cuándo empieza y cuánto dura la liga?",
    answer:
      "La liga se compone de 2 partes, Fase de grupos y Evento Principal, que duran entre 2 y 3 meses. Las fechas se podrán ver dentro del apartado de la season vigente.",
  },
  {
    question: "¿Las fechas de los partidos ya vienen predeterminadas?",
    answer:
      "No, el staff definirá el rango de fechas en los que se deban acordar los games para cada instancia. Dentro de ese rango, los capitanes de los equipos deberán arreglar entre ellos día y horario para el game, y notificar al staff en el grupo de capitanes.En caso de no acordar un día y horario entre capitanes, el staff definirá uno por defecto.",
  },
  {
    question: "¿Cómo me comunico con el staff?",
    answer:
      "Se pueden comunicar con nosotros mediante el discord de la liga o escribiendo al usuario (Cervecero) o (Messi Gordo). También nos pueden enviar MD a cualquiera de nuestras redes sociales (WSP - IG - FB).",
  },
];

const FAQSection = styled.section`
  font-family: "Outfit", sans-serif;
  margin: 0 auto;
  color: #fff;
  max-width: 1000px;
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: 32px;
  padding-right: 32px;
`;

const FAQHeading = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 2rem;
`;

const FAQContainer = styled.div`
  border-width: 1px 0px 1px 0px;

  border-style: solid;

  border-color: var(--Grayscale-gray-3, #f0f0f0);

  padding: 24px 16px;
`;

const QuestionButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 1.5rem 1rem 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  outline: none;
`;

const Icon = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;

const AnswerPanel = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? "600px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s 0.1s;
  padding: 0 0 1.5rem 0;
  font-weight: 400;
  font-size: 1.1rem;
  color: #e0e0e0;
`;

const AnswerText = styled.div<{ open: boolean }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.4s;
  font-size: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #fff;
  margin: 0;
`;

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <FAQSection>
      <FAQHeading>Preguntas frecuentes</FAQHeading>
      <FAQContainer>
        {faqData.map((item, idx) => (
          <div key={item.question}>
            <QuestionButton
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            >
              {item.question}
              <Icon>{openIndex === idx ? "–" : "+"}</Icon>
            </QuestionButton>
            <AnswerPanel
              id={`faq-panel-${idx}`}
              open={openIndex === idx && !!item.answer}
              aria-hidden={openIndex !== idx}
            >
              {item.answer && (
                <AnswerText open={openIndex === idx}>{item.answer}</AnswerText>
              )}
            </AnswerPanel>
            {idx < faqData.length - 1 && <Divider />}
          </div>
        ))}
      </FAQContainer>
    </FAQSection>
  );
};
