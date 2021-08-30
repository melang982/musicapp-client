import IconPlay from './icons/IconPlay';
import IconPause from './icons/IconPause';

function Button({onClicked, icon}) {

  let iconComp;
  if (icon == 'play') 
    iconComp = <IconPlay/>;
  else 
    iconComp = <IconPause/>;
  
  return <div className="button" onClick={onClicked}>
    {iconComp}
  </div>;
}
export default Button;
