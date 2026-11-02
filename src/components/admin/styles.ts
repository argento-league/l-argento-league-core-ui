import styled from "styled-components";

export const Panel = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  color: var(--season-primary, #ff8a3d);
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

export const Input = styled.input`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  padding: 6px 8px;
  font-size: 14px;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: var(--season-primary, #ff8a3d);
  }
`;

export const Select = styled.select`
  box-sizing: border-box;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  padding: 6px 8px;
  font-size: 14px;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: var(--season-primary, #ff8a3d);
  }
`;

export const Button = styled.button`
  background: var(--season-primary, #ff8a3d);
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: var(--season-primary, #ff8a3d);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(GhostButton)`
  color: #ff6b6b;
  border-color: rgba(255, 107, 107, 0.4);

  &:hover:not(:disabled) {
    border-color: #ff6b6b;
  }
`;

/** Con disabled, bloquea todos los campos de adentro (modo solo lectura) */
export const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;

  &:disabled input,
  &:disabled select,
  &:disabled button {
    opacity: 1;
    color: white;
    cursor: default;
    border-color: rgba(255, 255, 255, 0.08);
  }
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
`;
