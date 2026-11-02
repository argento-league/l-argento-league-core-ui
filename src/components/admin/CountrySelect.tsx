import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Mismas banderas que usa la web (public/images/countries/{code}.svg)
const COUNTRIES = [
  { code: "ar", name: "Argentina" },
  { code: "bo", name: "Bolivia" },
  { code: "br", name: "Brasil" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "cu", name: "Cuba" },
  { code: "it", name: "Italia" },
  { code: "jp", name: "Japón" },
  { code: "pa", name: "Panamá" },
  { code: "py", name: "Paraguay" },
  { code: "pe", name: "Perú" },
  { code: "sa", name: "Arabia Saudita" },
  { code: "uy", name: "Uruguay" },
  { code: "ve", name: "Venezuela" },
];

const flagSrc = (code: string) => `/images/countries/${code}.svg`;

type CountrySelectProps = {
  value: string;
  onChange: (code: string) => void;
};

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = COUNTRIES.find((c) => c.code === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Wrapper ref={ref}>
      <Trigger type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}>
        {current ? <Flag src={flagSrc(current.code)} alt="" /> : null}
        <span>{current?.name ?? (value ? value.toUpperCase() : "Elegir")}</span>
        <Caret>▾</Caret>
      </Trigger>
      {open && (
        <Menu role="listbox">
          {COUNTRIES.map((country) => (
            <Option
              key={country.code}
              type="button"
              role="option"
              aria-selected={country.code === value}
              className={country.code === value ? "selected" : undefined}
              onClick={() => {
                onChange(country.code);
                setOpen(false);
              }}
            >
              <Flag src={flagSrc(country.code)} alt="" />
              <span>{country.name}</span>
            </Option>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  padding: 6px 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:focus {
    outline: none;
    border-color: var(--season-primary, #ff8a3d);
  }
`;

const Caret = styled.i`
  font-style: normal;
  color: rgba(255, 255, 255, 0.5);
  flex: 0 0 auto !important;
`;

const Flag = styled.img`
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
  flex-shrink: 0;
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 20;
  min-width: 180px;
  max-height: 260px;
  overflow-y: auto;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
`;

const Option = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 6px 8px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;

  &:hover,
  &.selected {
    background: rgba(255, 255, 255, 0.1);
  }
`;
