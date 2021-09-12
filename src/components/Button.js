import Icon from './Icon';

function Button({ onClick, icon, title, className, activated }) {

  let classString = 'button';
  if (className)
    classString += ' ' + className;
  if (activated)
    classString += ' button_activated';

  return <button className={classString} title={title} onClick={onClick}>
    <Icon icon={icon}/>
  </button>;
}
export default Button;