import React, { useCallback, useEffect, useState } from 'react';
import { ITeam } from 'app/actions';
import { Checkbox } from 'app/components';

interface IProps {
    teams: ITeam[];
    onChange: (teamIds: number[]) => void;
}

interface ITeamCheckboxProps {
    team: ITeam;
    onCheck: (teamId: number) => void;
    onUncheck: (teamId: number) => void;
}

const TeamCheckbox: React.FC<ITeamCheckboxProps> = React.memo(
    ({
        team: {
            id,
            name,
            TeamUser: { color },
        },
        onCheck,
        onUncheck,
    }) => {
        const onChange = useCallback(
            newValue => {
                if (newValue) {
                    return onCheck(id);
                }
                return onUncheck(id);
            },
            [id]
        );
        return (
            <Checkbox
                label={name}
                onChange={onChange}
                checkboxColor={color}
                defaultChecked={true}
            />
        );
    }
);

export const TeamFilters: React.FC<IProps> = React.memo(
    ({ teams, onChange }) => {
        const [teamIds, setTeamIds] = useState<number[]>([]);

        const addId = useCallback(
            (teamId: number) => setTeamIds(_teamIds => [..._teamIds, teamId]),
            [setTeamIds]
        );

        const removeId = useCallback(
            (teamId: number) =>
                setTeamIds(_teamIds =>
                    _teamIds.filter(_teamId => _teamId !== teamId)
                ),
            [setTeamIds]
        );

        useEffect(() => onChange(teamIds), [teamIds.length]);

        if (teams.length > 0) {
            return (
                <div>
                    <h1 className='label label--md'>Teams</h1>
                    <ul className='calendar__content__toolbar__team-filters'>
                        {teams.map(team => (
                            <TeamCheckbox
                                team={team}
                                key={team.id}
                                onCheck={addId}
                                onUncheck={removeId}
                            />
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    }
);
