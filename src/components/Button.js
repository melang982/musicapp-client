import IconPlay from './icons/IconPlay';
import IconPause from './icons/IconPause';
import IconVolume from './icons/IconVolume';

function Button({onClicked, icon}) {

  let iconComp;
  switch (icon) {
    case 'play':
      iconComp = <IconPlay/>;
      break;
    case 'pause':
      iconComp = <IconPause/>;
      break;
    case 'volume':
      iconComp = <IconVolume/>;
      break;
    default:
  }

  return <div className="button" onClick={onClicked}>
    {iconComp}
  </div>;
}
export default Button;
