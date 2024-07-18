import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getHSLDif, hexToHSL, hexToRGB} from '../../utils';

export const ColorConverter = () => {
    const [baseColor, setBaseColor] = useState('');
    const [baseColorTitle, setBaseColorTitle] = useState('#213547');

    const [targetColor, setTargetColor] = useState('');
    const [targetColorTitle, setTargetColorTitle] = useState('#213547');

    const [hslDif, setHslDif] = useState('');

    useEffect(() => {
        const rgb = hexToRGB(baseColor);
        if (baseColor && typeof rgb !== 'string' && rgb[0] < 120) {
            setBaseColorTitle('#ffffff');
        } else {
            setBaseColorTitle('#213547');
        }
    }, [baseColor]);

    useEffect(() => {
        const rgb = hexToRGB(targetColor);
        if (targetColor && typeof rgb !== 'string' && rgb[0] < 120) {
            setTargetColorTitle('#ffffff');
        } else {
            setTargetColorTitle('#213547');
        }
    }, [targetColor]);

    useEffect(() => {
        if (baseColor && targetColor) {
            setHslDif(getHSLDif(baseColor, targetColor));
        }
    }, [baseColor, targetColor]);

    return (
        <ColorConverterContainer>
            <ColorContainer key="baseColorContainer" background={baseColor} color={baseColorTitle}>
                <Title>
                    Select base color:
                    <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} />

                </Title>
                {baseColor &&
                    <>
                        <span>Hex: {baseColor}</span>
                        <span>RGB: {hexToRGB(baseColor, true) || ''}</span>
                        <span>HSL: {hexToHSL(baseColor, true) || ''}</span>
                    </>
                }
            </ColorContainer>
            {hslDif &&
                <ColorContainer key="hslDifColorContainer" align="center">
                    <Title>HSL dif</Title>
                    <span>{hslDif}</span>
                </ColorContainer>
            }
            <ColorContainer key="targetColorContainer" background={targetColor} color={targetColorTitle}>
                <Title>
                    Select target color:
                    <input type="color" value={targetColor} onChange={e => setTargetColor(e.target.value)} />
                </Title>
                {targetColor &&
                    <>
                        <span>Hex: {targetColor}</span>
                        <span>RGB: {hexToRGB(targetColor, true) || ''}</span>
                        <span>HSL: {hexToHSL(targetColor, true) || ''}</span>
                    </>
                }
            </ColorContainer>
        </ColorConverterContainer>
    );
};

const Title = styled.label`
  display: inline-flex;
  justify-content: space-between;
  margin: 12px 0;  
`;

const ColorContainer = styled.div<{background?: string, color?: string, align?: string}>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align: 'initial'};
  background: ${props => props.background};
  color: ${props => props.color};
  min-width: 220px;
  padding: 16px;
  border-radius: 4px;
`;

const ColorConverterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
