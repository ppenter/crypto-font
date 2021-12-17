import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--dark-grey);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  padding: ${({ p }) => ( p ? p : "none" )};
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`

  display: ${({ display }) => (display ? display : "flex")};
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? test : "none")};
  width:  ${({ w }) => ( w ? w : "100%" )};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  margin: ${({ m }) => ( m ? m : "none" )};
  padding: ${({ p }) => ( p ? p : "none" )};
  max-width: ${({ mxw }) => ( mxw ? mxw : "none" )};
  max-height: ${({ mxh }) => ( mxh ? mxh : "none" )};
  min-width: ${({ mnw }) => ( mnw ? mnw : "none" )};
  min-height: ${({ mnh }) => ( mnh ? mnh : "none" )};
  `;

export const Slideshow = styled.div`
  transition: ease 1000ms;
  `;

export const TextTitle = styled.p`
color: var(--primary);
text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
  font-size: 36px;
  font-weight: 500;
`;

export const TextSubTitle = styled.p`
color: var(--primary);
  font-size: 24px;
  font-weight: 500;
`;

export const TextDescription = styled.p`
  color: var(--white);
  font-size: 24px;
  font-weight: ${({ fw }) => ( fw ? fw : "200" )};
  line-height: ${({ lh }) => ( lh ? lh : "1.5" )};

`;

export const TextID = styled.p`
  color: grey;
  font-size: 14px;
  font-weight: 200;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

export const Input = styled.input`
  outline: 0;
  background: transparent;
  color: var(--text);
  border: var(--text) 0.125em solid;
  padding: 0.25em 1em;
  border-radius: 0.25em;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
`;

export const button = styled.button`
  background-color: transparent;
  text-decoration: none;
  
  
  padding: 0.25em 1em;
  border-radius: 0.25em;
  color: var(--primary);
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
  box-shadow: inset 0 0 0.5em 0 var(--primary), 0 0 0.5em 0 var(--primary);
  border: var(--primary) 0.125em solid;
  :disabled{
    background-color: transparent;
    box-shadow: none;
    color: var(--disable);
    border: var(--disable) 0.125em solid;
    text-shadow: none;
  }
`;

