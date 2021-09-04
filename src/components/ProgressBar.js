import {useRef} from 'react';

function ProgressBar({onClicked, style, progress}) {

  const divRef = useRef(null);

  return <div ref={divRef} className="progressBar__wrapper" style={style} onClick={e => onClickedProgressBar(e)}>
    <div className="progressBar">
      <div className="progressBar__inner" style={{
          width: progress * 100 + '%'
        }}></div>
    </div>
  </div>;

  function onClickedProgressBar(e) {
    //console.log('clicked on progress bar');

    const x = e.nativeEvent.offsetX;

    const value = x / divRef.current.offsetWidth;
    //console.log(value);

    onClicked(value);
  }
}

export default ProgressBar;
