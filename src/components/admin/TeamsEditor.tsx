import { useState } from "react";
import styled from "styled-components";
import type { TeamData, TeamJsonType } from "../../types/teams";
import { MAX_LOGO_BYTES } from "@constants/admin";
import { Button, DangerButton, Fieldset, GhostButton, Hint, Input, Label, Panel, Row, SectionTitle } from "./styles";
import { CountrySelect } from "./CountrySelect";

type Player = TeamData["players"][number];

type TeamsEditorProps = {
  season: number;
  teams: TeamJsonType;
  readOnly?: boolean;
  /** Logos subidos todavía sin guardar: nombre de archivo -> data URL */
  pendingLogos: Record<string, string>;
  onChange: (teams: TeamJsonType) => void;
  onLogoUpload: (fileName: string, dataUrl: string) => void;
};

const emptyPlayer = (): Player => ({ nick: "", nationality: "ar", mmr: 0, id_dota: "", championships: 0 });

const toLogoFileName = (fileName: string) =>
  fileName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-");

const newTeamKey = (teams: TeamJsonType) => {
  let n = Object.keys(teams).length + 1;
  while (teams[`EQUIPO_${n}`]) n++;
  return `EQUIPO_${n}`;
};

export const TeamsEditor = ({ season, teams, readOnly, pendingLogos, onChange, onLogoUpload }: TeamsEditorProps) => {
  const keys = Object.keys(teams);
  const [selectedKey, setSelectedKey] = useState(keys[0] ?? "");
  const [logoError, setLogoError] = useState<string | null>(null);
  const team = teams[selectedKey];

  const updateTeam = (patch: Partial<TeamData>) => onChange({ ...teams, [selectedKey]: { ...team, ...patch } });
  const updatePlayer = (index: number, patch: Partial<Player>) =>
    updateTeam({ players: team.players.map((p, i) => (i === index ? { ...p, ...patch } : p)) });

  const addTeam = () => {
    const key = newTeamKey(teams);
    onChange({ ...teams, [key]: { name: "Nuevo equipo", logo: "", players: [emptyPlayer()] } });
    setSelectedKey(key);
  };

  const removeTeam = () => {
    if (!window.confirm(`¿Borrar "${team.name}"? Los partidos donde aparece no se modifican.`)) return;
    const rest = { ...teams };
    delete rest[selectedKey];
    onChange(rest);
    setSelectedKey(Object.keys(rest)[0] ?? "");
  };

  const handleLogo = (file: File | undefined) => {
    setLogoError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) return setLogoError("El logo tiene que ser una imagen.");
    if (file.size > MAX_LOGO_BYTES) return setLogoError("El logo pesa más de 1 MB, achicalo un poco.");
    const reader = new FileReader();
    reader.onload = () => {
      const fileName = toLogoFileName(file.name);
      onLogoUpload(fileName, reader.result as string);
      updateTeam({ logo: fileName });
    };
    reader.readAsDataURL(file);
  };

  const logoSrc = (logo: string) => pendingLogos[logo] ?? `/images/teams/season-${season}/${logo}`;

  return (
    <Layout>
      <Panel>
        <SectionTitle>Equipos ({keys.length})</SectionTitle>
        <TeamList>
          {keys.map((key) => (
            <TeamItem
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={key === selectedKey ? "active" : undefined}
            >
              {teams[key].logo ? <SmallLogo src={logoSrc(teams[key].logo)} alt="" /> : <LogoPlaceholder />}
              <span>{teams[key].name || "(sin nombre)"}</span>
            </TeamItem>
          ))}
        </TeamList>
        {!readOnly && (
          <GhostButton type="button" onClick={addTeam} style={{ marginTop: 12, width: "100%" }}>
            + Agregar equipo
          </GhostButton>
        )}
      </Panel>

      {team ? (
        <Panel>
          <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
            <SectionTitle style={{ margin: 0 }}>{team.name || "(sin nombre)"}</SectionTitle>
            {!readOnly && (
              <DangerButton type="button" onClick={removeTeam}>
                Borrar equipo
              </DangerButton>
            )}
          </Row>

          <Fieldset disabled={readOnly}>
          <TeamFields>
            <Label>
              Nombre
              <Input value={team.name} onChange={(e) => updateTeam({ name: e.target.value })} />
            </Label>
            <Label>
              Logo
              <Row>
                {team.logo ? <BigLogo src={logoSrc(team.logo)} alt="" /> : <BigLogoPlaceholder>TBD</BigLogoPlaceholder>}
                <Input
                  value={team.logo}
                  placeholder="archivo.png"
                  onChange={(e) => updateTeam({ logo: e.target.value })}
                  style={{ flex: 1 }}
                />
                {!readOnly && (
                <UploadButton>
                  Subir…
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleLogo(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </UploadButton>
                )}
              </Row>
              {logoError && <ErrorText>{logoError}</ErrorText>}
            </Label>
          </TeamFields>
          <Hint style={{ margin: "8px 0 16px" }}>
            {readOnly
              ? "Season finalizada: solo lectura."
              : "Si cambiás el nombre, al guardar también se actualiza en las jornadas y en el evento principal."}
          </Hint>

          <PlayersTable>
            <thead>
              <tr>
                <th>Nick</th>
                <th>País</th>
                <th>MMR</th>
                <th>ID Dota</th>
                <th title="Veces campeón de L'Argento">🏆</th>
                {!readOnly && <th />}
              </tr>
            </thead>
            <tbody>
              {team.players.map((player, i) => (
                <tr key={i}>
                  <td>
                    <Input value={player.nick} onChange={(e) => updatePlayer(i, { nick: e.target.value })} />
                  </td>
                  <td>
                    <CountrySelect
                      value={player.nationality}
                      onChange={(nationality) => updatePlayer(i, { nationality })}
                    />
                  </td>
                  <td>
                    <Input
                      inputMode="numeric"
                      value={player.mmr ?? 0}
                      onChange={(e) => updatePlayer(i, { mmr: Number(e.target.value.replace(/\D/g, "")) || 0 })}
                    />
                  </td>
                  <td>
                    <Input value={player.id_dota ?? ""} onChange={(e) => updatePlayer(i, { id_dota: e.target.value.trim() })} />
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={player.championships ?? 0}
                      onChange={(e) => updatePlayer(i, { championships: Number(e.target.value) || 0 })}
                    />
                  </td>
                  {!readOnly && (
                    <td>
                      <DangerButton
                        type="button"
                        title="Quitar jugador"
                        onClick={() => updateTeam({ players: team.players.filter((_, j) => j !== i) })}
                      >
                        ✕
                      </DangerButton>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </PlayersTable>
          </Fieldset>
          {!readOnly && (
            <Button type="button" onClick={() => updateTeam({ players: [...team.players, emptyPlayer()] })} style={{ marginTop: 12 }}>
              + Jugador
            </Button>
          )}
        </Panel>
      ) : (
        <Panel>
          <Hint>{readOnly ? "No hay equipos." : "No hay equipos. Agregá uno."}</Hint>
        </Panel>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 60vh;
  overflow-y: auto;
`;

const TeamItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: white;
  padding: 6px 8px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &.active {
    border-color: var(--season-primary, #ff8a3d);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SmallLogo = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const LogoPlaceholder = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
`;

const TeamFields = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const BigLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const BigLogoPlaceholder = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
`;

const UploadButton = styled.label`
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: white;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    border-color: var(--season-primary, #ff8a3d);
  }
`;

const ErrorText = styled.span`
  color: #ff6b6b;
`;

const PlayersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    padding: 0 4px 4px;
  }

  td {
    padding: 3px 4px;
  }

  td input {
    width: 100%;
  }

  th:nth-child(2) {
    width: 150px;
  }

  th:nth-child(3) {
    width: 80px;
  }

  th:nth-child(5) {
    width: 56px;
  }

  th:last-child {
    width: 40px;
  }
`;
