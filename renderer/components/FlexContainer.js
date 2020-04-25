import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-flow: ${props => props.flow || 'column'};
  flex-grow: ${props => props.grow || 1};
  justify-content: ${props => props.justifyContent || ''};
  align-items: ${props => props.alignItems || ''};
  overflow: hidden;
  flex-basis: 50%;
`;
export default FlexContainer;
