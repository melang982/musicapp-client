import Icon from './Icon';

function Button({onClicked, icon}) {

  return <div className="button" onClick={onClicked}>
    <Icon icon={icon}/>
  </div>;
}
export default Button;
