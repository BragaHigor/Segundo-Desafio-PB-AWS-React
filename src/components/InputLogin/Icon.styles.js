import styled from "styled-components";


export const Icon = styled.div`

    position: absolute;
    right: ${props => props.putInside === true ? '3vw' : '-0.1vw'};
    display: flex;
    align-items: center;
    transition: .5s;
`