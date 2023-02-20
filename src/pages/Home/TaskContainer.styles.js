import styled from "styled-components";

export const TaskContainer = styled.div`

    display: flex;
    width: 1.4rem;
    border-radius: 15px 0px 0px 15px;
    -webkit-border-radius: 15px 0px 0px 15px;
    -moz-border-radius: 15px 0px 0px 15px;
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

`