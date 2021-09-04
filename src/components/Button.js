import Icon from './Icon';

function Button({onClicked, icon, styleName, activated}) {

  let className = 'button';
  if (styleName) 
    className += ' ' + styleName;
  if (activated) 
    className += ' button_activated';
  
  return <div className={className} onClick={onClicked}>
    <Icon icon={icon}/>
  </div>;
}
export default Button;
