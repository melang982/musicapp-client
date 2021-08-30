import IconPlay from './icons/IconPlay';
import IconPause from './icons/IconPause';
import IconVolume from './icons/IconVolume';

function Button({onClicked, icon}) {

  let iconComp;
  if (icon == 'play') 
    iconComp = <IconPlay/>;
  else if (icon == 'pause') 
    iconComp = <IconPause/>;
  else if (icon == 'volume') 
    iconComp = <IconVolume/>;
  
  return <div className="button" onClick={onClicked}>
    {iconComp}
  </div>;
}
export default Button;
