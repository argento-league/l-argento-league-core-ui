import styled from "styled-components";
import type { Match } from "../../admin/types";
import { DangerButton, Input, Select } from "./styles";

type MatchRowProps<T extends Match> = {
  match: T;
  teamNames: string[];
  label?: string;
  onChange: (match: T) => void;
  onRemove?: () => void;
};

/** Un partido: equipo 1, score 1, score 2, equipo 2. Score vacío = "TBD". */
export const MatchRow = <T extends Match>({ match, teamNames, label, onChange, onRemove }: MatchRowProps<T>) => {
  const set = (field: keyof Match, value: string) => onChange({ ...match, [field]: value });
  const normalizeScore = (field: "score1" | "score2") => {
    if (!(match[field] ?? "").trim()) set(field, "TBD");
  };

  return (
    <Wrapper>
      {label && <MatchLabel>{label}</MatchLabel>}
      <TeamSelect value={match.team1} onChange={(e) => set("team1", e.target.value)}>
        <TeamOptions teamNames={teamNames} current={match.team1} />
      </TeamSelect>
      <ScoreInput
        value={match.score1 ?? ""}
        placeholder="TBD"
        onChange={(e) => set("score1", e.target.value)}
        onBlur={() => normalizeScore("score1")}
        aria-label={`Score ${match.team1}`}
      />
      <Versus>-</Versus>
      <ScoreInput
        value={match.score2 ?? ""}
        placeholder="TBD"
        onChange={(e) => set("score2", e.target.value)}
        onBlur={() => normalizeScore("score2")}
        aria-label={`Score ${match.team2}`}
      />
      <TeamSelect value={match.team2} onChange={(e) => set("team2", e.target.value)}>
        <TeamOptions teamNames={teamNames} current={match.team2} />
      </TeamSelect>
      {onRemove && (
        <DangerButton type="button" onClick={onRemove} title="Quitar partido">
          ✕
        </DangerButton>
      )}
    </Wrapper>
  );
};

const TeamOptions = ({ teamNames, current }: { teamNames: string[]; current: string }) => (
  <>
    {/* Si el JSON tiene un nombre que ya no está en equipos, se sigue mostrando */}
    {!teamNames.includes(current) && <option value={current}>{current || "—"}</option>}
    {teamNames.map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </>
);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 52px 10px 52px minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px;
  padding: 6px 0;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr) 44px 10px 44px minmax(0, 1fr) auto;
  }
`;

const MatchLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  min-width: 28px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const TeamSelect = styled(Select)`
  width: 100%;
`;

const ScoreInput = styled(Input)`
  width: 100%;
  text-align: center;
`;

const Versus = styled.span`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`;
