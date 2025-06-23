import { useState } from "react";
import styled from "styled-components";

const faqData = [
  {
    question: "¿Si no soy argentino puedo inscribir mi equipo igual?",
    answer:
       "La liga esta abierta a cualquier persona, el requisito mínimo es que el capitán sea hispanohablante. A tener en cuenta, en caso de que el equipo no pueda realizar la inscripción utilizando pesos argentinos, la misma se convertirá a dólar, según el tc a la fecha. También deben tener en cuenta que el horario acordado para las partidas será por predeterminado el de Argentina (GMT-3). Por último, se utilizara como predeterminado el servidor de Argentina, exceptuando que el mismo tenga problemas o que ambos capitanes den su expresa confirmación de cambiar el servidor.",
  },
  {
    question: "¿Hasta cuando tengo tiempo para anotar mi equipo?",
    answer: "Las inscripciones se cerraran el dia 13/12",
  },
  {
    question: "¿Cuánto va a durar la liga?",
    answer: "La edición actual se compondrá de 3 partes. 1ra parte, fase de grupos, la misma se realizara en 3 fechas con una duración de 14 días. 16/12 a 29/12. 2da parte, clasificatoria , la misma se realizara un enfrentamiento entre 16 equipos y su duración será de 7 días.  30/12 a 05/01. 3ra parte, evento principal, el mismo tendra un formato de doble eliminación (upper y lower bracket), comenzara el 06/01 y se pregramara los cruces.",
  },
  {
    question: "¿Las fechas de los partidos ya vienen predeterminadas?",
    answer: "Ya se realizo el sorteo de grupos y el sorteo de las fechas por lo que las mismas ya están establecidas.",
  },
  {
    question: "¿Cómo me comunico con el staff?",
    answer: "Se pueden comunicar con nosotros mediante el discord escribiendo al usuario (Cervecero) o (Messi Gordo). También nos pueden enviar MD a cualquiera de nuestras redes sociales (WSP - IG - FB).",
  },
];

const FAQSection = styled.section`
  font-family: 'Outfit', sans-serif;
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

  border-color: var(--Grayscale-gray-3, #F0F0F0);

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
  max-height: ${({ open }) => (open ? '200px' : '0')};
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