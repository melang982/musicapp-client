import Icon from './Icon';

function Button({onClicked, icon, title, styleName, activated}) {

  let className = 'button';
  if (styleName) 
    className += ' ' + styleName;
  if (activated) 
    className += ' button_activated';
  
  return <button className={className} title={title} onClick={onClicked}>
    <Icon icon={icon}/>
  </button>;
}
export default Button;
