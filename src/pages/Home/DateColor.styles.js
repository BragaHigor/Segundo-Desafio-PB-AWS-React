import styled from "styled-components";

export const DateColor = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    width: 85px;
    height: 85px;
    background: ${props => {


        switch (props.taskDate) {

            case 'monday':
                return '#FF0024'

            case 'tuesday':
                return '#FF8000'

            case 'wednesday':
                return '#FFCE00'

            case 'thursday':
                return '#fe4b65'

            case 'friday':
                return '#FDA54B'

            case 'saturday':
                return '#FEDB4B'

            case 'sunday':
                return '#FD7E8F'
        }

    }};
    border-bottom: 1px solid #DCDFE3;
    border-radius: 10px;
    margin-left: 2.4rem;
    margin-top: 1.4rem;

`