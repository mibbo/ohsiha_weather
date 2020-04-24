import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .card.card--day{
   background: ${({ theme }) => theme.cardDay};
 }

 .card.card--day > header {
   background: ${({ theme }) => theme.cardDayHeader};
  }

  #li1 {
   color: ${({ theme }) => theme.li1};
 }

 #location {
   color: ${({ theme }) => theme.location};
 }

 #feels {
   color: ${({ theme }) => theme.feels};
 }

 #line {
   background: ${({ theme }) => theme.line};
 }

 .card {
   background: ${({ theme }) => theme.card};
 }
  .card > header {
   background: ${({ theme }) => theme.cardHeader};
  }




  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

//   footer {
//     position: absolute;
//     bottom: 5%;
//     left: 50%;
//     transform: translateX(-50%);
//   }

//   small {
//     display: block;
//   }

//   button {
//     display: block;
//   }

//   a {
//     color: ${({ theme }) => theme.text};
//   }

  
`;
