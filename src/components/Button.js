import Icon from './Icon';

function Button({onClicked, icon, styleName}) {

  const className = 'button' + (
    styleName
    ? ' button-play'
    : '');

  return <div className={className} onClick={onClicked}>
    <Icon icon={icon}/>
  </div>;
}
export default Button;
