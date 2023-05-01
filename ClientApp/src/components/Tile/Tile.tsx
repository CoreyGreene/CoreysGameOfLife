import React from 'react';
import { useState } from 'react';

interface TileProps {
    onColor?: string;
    offColor?: string;
    state?: boolean;
    width: number;
    height: number;
    updateTileState: CallableFunction
}

export default function Tile(props: TileProps) {
    const { onColor = 'green', offColor = 'blue', state = false, width, height, updateTileState } = props;
    const [activeState, setActiveState] = useState<boolean>(state);

    const SetTileActive = () => {
        setActiveState(true)
        updateTileState(true)
    }

    return (
        <div style={{ backgroundColor: activeState ? onColor : offColor, width, height }} onClick={SetTileActive}>
            <span style={{ width: '100%', height: '100%' }}></span>
        </div>
    )
}