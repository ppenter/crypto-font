import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--dark-grey);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
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
  color: var(--white);
  font-size: 36px;
  font-weight: 500;
`;

export const TextSubTitle = styled.p`
  color: var(--white);
  font-size: 20px;
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

