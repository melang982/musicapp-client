import Icon from './Icon';

function Button({onClicked, icon, styleName, activated}) {

  let className = 'button';
  if (styleName) 
    className += ' button-play';
  if (activated) 
    className += ' button-activated';
  
  return <div className={className} onClick={onClicked}>
    <Icon icon={icon}/>
  </div>;
}
export default Button;
