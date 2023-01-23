import styled from "styled-components";

export const TaskContainer = styled.div`

    display: flex;
    width: 1.4rem;
    border-radius: 15px 0px 0px 15px;
    -webkit-border-radius: 15px 0px 0px 15px;
    -moz-border-radius: 15px 0px 0px 15px;
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

`