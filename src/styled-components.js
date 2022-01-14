import styled from 'styled-components';

export const View = styled.div`
  align-items: stretch;
  border-width: 0px;
  border-style: solid;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  padding: 0px;
  position: relative;
  min-height: 0px;
  min-width: 0px;
`;

export const Provider = View;

function getColor(color) {
  switch (color) {
    case 0:
      return '#14171A';
    case 1:
      return '#AAB8C2';
    case 2:
      return '#E6ECF0';
    case 3:
      return '#FFAD1F';
    case 4:
      return '#F45D22';
    case 5:
      return '#E0245E';
    default:
      return 'transparent';
  }
}

export const Box = styled(View)`
  align-self: flex-start;
  flex-direction: ${(props) => (props.layout === 'column' ? 'column' : 'row')};
  padding: ${(props) => (props.outer ? '4px' : '0')};
  ${(props) => props.fixed && 'height:6px;'} ${(props) =>
    props.fixed && 'width:6px;'} background-color: ${(props) => getColor(props.color)};
`;

export const Dot = styled(View).attrs((props) => ({
  style: {
    marginLeft: `${props.x}px`,
    marginTop: `${props.y}px`,
    borderRightWidth: `${props.size / 2}px`,
    borderBottomWidth: `${props.size / 2}px`,
    borderLeftWidth: `${props.size / 2}px`,
    borderBottomColor: `${props.color}`,
  },
}))`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
  transform: translate(50%, 50%);
`;
