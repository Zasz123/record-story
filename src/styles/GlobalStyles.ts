import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    
    * {
        box-sizing: border-box;

        margin: 0;
    }
`;

export default GlobalStyles;
