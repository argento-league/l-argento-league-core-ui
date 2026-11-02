import styled from "styled-components";
import type { BracketMatch, EventoPrincipalData } from "../../admin/types";
import { MatchRow } from "./MatchRow";
import { Fieldset, Hint, Panel, SectionTitle } from "./styles";

type MainEventEditorProps = {
  evento: EventoPrincipalData;
  teamNames: string[];
  readOnly?: boolean;
  onChange: (evento: EventoPrincipalData) => void;
};

const roundLabel = (key: string) => key.replace("round-", "Ronda ");

/** Edita equipos y resultados del bracket. La estructura (rondas y partidos) queda fija. */
export const MainEventEditor = ({ evento, teamNames, readOnly, onChange }: MainEventEditorProps) => {
  const updateBracketMatch = (
    bracket: "upper-bracket" | "lower-bracket",
    round: string,
    index: number,
    match: BracketMatch
  ) =>
    onChange({
      ...evento,
      [bracket]: {
        ...evento[bracket],
        [round]: evento[bracket][round].map((m, i) => (i === index ? match : m)),
      },
    });

  const renderBracket = (bracket: "upper-bracket" | "lower-bracket", title: string) => (
    <Panel>
      <SectionTitle>{title}</SectionTitle>
      {Object.entries(evento[bracket] ?? {}).map(([round, matches]) => (
        <Round key={round}>
          <RoundTitle>{roundLabel(round)}</RoundTitle>
          {matches.map((match, i) => (
            <MatchRow
              key={match.match}
              match={match}
              teamNames={teamNames}
              label={`#${match.match}`}
              onChange={(m) => updateBracketMatch(bracket, round, i, m)}
            />
          ))}
        </Round>
      ))}
    </Panel>
  );

  return (
    <Fieldset disabled={readOnly}>
    <Wrapper>
      {!readOnly && (
      <Panel>
        <Hint>
          Elegí los equipos de cada cruce a medida que avanzan y cargá los resultados. Para cambiar la
          cantidad de rondas o partidos hay que tocar el JSON.
        </Hint>
      </Panel>
      )}
      {renderBracket("upper-bracket", "Upper Bracket")}
      {renderBracket("lower-bracket", "Lower Bracket")}
      <Panel>
        <SectionTitle>Gran Final</SectionTitle>
        {(evento["grand-final"] ?? []).map((match, i) => (
          <MatchRow
            key={match.match}
            match={match}
            teamNames={teamNames}
            label={`#${match.match}`}
            onChange={(m) =>
              onChange({ ...evento, "grand-final": evento["grand-final"].map((x, j) => (j === i ? m : x)) })
            }
          />
        ))}
      </Panel>
    </Wrapper>
    </Fieldset>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Round = styled.div`
  & + & {
    margin-top: 12px;
  }
`;

const RoundTitle = styled.h4`
  margin: 0 0 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;
