import Icon from './Icon';

function Button({ onClick, icon, title, styleName, activated }) {

  let className = 'button';
  if (styleName)
    className += ' ' + styleName;
  if (activated)
    className += ' button_activated';

  return <button className={className} title={title} onClick={onClick}>
    <Icon icon={icon}/>
  </button>;
}
export default Button;