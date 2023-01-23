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

            case 'Monday':
                return '#FF0024'

            case 'Tuesday':
                return '#FF8000'

            case 'Wednesday':
                return '#FFCE00'

            case 'Thursday':
                return '#fe4b65'

            case 'Friday':
                return '#FDA54B'

            case 'Saturday':
                return '#FEDB4B'

            case 'Sunday':
                return '#FD7E8F'
        }

    }};
    border-bottom: 1px solid #DCDFE3;
    border-radius: 10px;
    margin-left: 2.4rem;
    margin-top: 1.4rem;

`