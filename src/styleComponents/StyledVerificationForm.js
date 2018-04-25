import styled from 'styled-components';

export default styled.form`
    width: 100%;

    & > div {
        margin-bottom: 50px;
    }

    @media (max-width: 1920px) {

        margin: 40px 0 90px;

        & > div {
            margin-bottom: 30px;
        }

        .ui.input input {
            font-size: 14px;
        }
    }

    @media (max-width: 991px) {
        margin: 30px 0 60px;
    }
`;
