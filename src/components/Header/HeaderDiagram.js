import { WrapperHeader} from "./HeaderDiagram.styles";
const HeaderDiagram = (props) => {
  return <WrapperHeader theme={props.theme}>{props.title}</WrapperHeader>; 
}

export default HeaderDiagram;