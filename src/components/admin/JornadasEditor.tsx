import { useState } from "react";
import styled from "styled-components";
import type { JornadasData, Match } from "../../admin/types";
import { MatchRow } from "./MatchRow";
import { DangerButton, Fieldset, GhostButton, Hint, Panel, Row, SectionTitle } from "./styles";

type JornadasEditorProps = {
  jornadas: JornadasData;
  teamNames: string[];
  readOnly?: boolean;
  onChange: (jornadas: JornadasData) => void;
};

const jornadaNumber = (key: string) => parseInt(key.replace(/\D/g, ""), 10) || 0;
const groupLabel = (key: string) => key.replace("grupo-", "Grupo ").replace(/ (\w)$/, (_, l) => ` ${l.toUpperCase()}`);
const emptyMatch = (): Match => ({ team1: "TBD", score1: "TBD", team2: "TBD", score2: "TBD" });

export const JornadasEditor = ({ jornadas, teamNames, readOnly, onChange }: JornadasEditorProps) => {
  const keys = Object.keys(jornadas).sort((a, b) => jornadaNumber(a) - jornadaNumber(b));
  const [index, setIndex] = useState(0);
  const current = keys[Math.min(index, keys.length - 1)];
  const groups = current ? Object.keys(jornadas[current]) : [];

  const updateGroup = (group: string, matches: Match[]) =>
    onChange({ ...jornadas, [current]: { ...jornadas[current], [group]: matches } });

  const addJornada = () => {
    const allGroups = Array.from(new Set(Object.values(jornadas).flatMap((j) => Object.keys(j))));
    const next = `Jornada-${(keys.length ? jornadaNumber(keys[keys.length - 1]) : 0) + 1}`;
    onChange({
      ...jornadas,
      [next]: Object.fromEntries((allGroups.length ? allGroups : ["grupo-a", "grupo-b"]).map((g) => [g, [emptyMatch()]])),
    });
    setIndex(keys.length);
  };

  const removeJornada = () => {
    if (!current || !window.confirm(`¿Borrar ${current.replace("-", " ")} con todos sus partidos?`)) return;
    const rest = { ...jornadas };
    delete rest[current];
    onChange(rest);
    setIndex(Math.max(0, index - 1));
  };

  return (
    <Wrapper>
      <Panel>
        <Row>
          <GhostButton type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            ← Anterior
          </GhostButton>
          <JornadaTitle>{current ? current.replace("-", " ") : "Sin jornadas"}</JornadaTitle>
          <GhostButton type="button" disabled={index >= keys.length - 1} onClick={() => setIndex(index + 1)}>
            Siguiente →
          </GhostButton>
          <Spacer />
          {!readOnly && (
            <>
              <GhostButton type="button" onClick={addJornada}>
                + Jornada
              </GhostButton>
              {current && (
                <DangerButton type="button" onClick={removeJornada}>
                  Borrar jornada
                </DangerButton>
              )}
            </>
          )}
        </Row>
        {!readOnly && (
          <Hint style={{ marginTop: 8 }}>
            Cargá el resultado en cada partido. Dejá el score vacío (o "TBD") si todavía no se jugó.
          </Hint>
        )}
      </Panel>

      {groups.map((group) => {
        const matches = jornadas[current][group];
        return (
          <Panel key={group}>
            <SectionTitle>{groupLabel(group)}</SectionTitle>
            <Fieldset disabled={readOnly}>
            {matches.map((match, i) => (
              <MatchRow
                key={i}
                match={match}
                teamNames={teamNames}
                label={`#${i + 1}`}
                onChange={(m) => updateGroup(group, matches.map((x, j) => (j === i ? m : x)))}
                onRemove={readOnly ? undefined : () => updateGroup(group, matches.filter((_, j) => j !== i))}
              />
            ))}
            </Fieldset>
            {!readOnly && (
              <GhostButton type="button" onClick={() => updateGroup(group, [...matches, emptyMatch()])}>
                + Partido
              </GhostButton>
            )}
          </Panel>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const JornadaTitle = styled.h2`
  margin: 0 12px;
  font-size: 20px;
`;

const Spacer = styled.div`
  flex: 1;
`;
