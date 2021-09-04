import {useState, useEffect, useRef} from 'react';
import {clamp} from './../utils.js';

function ProgressBar({onClicked, style}) {
  const [progress, setProgress] = useState(0.5);
  const [mouseDown, setMouseDown] = useState(false);
  const [addedEvents, setAddedEvents] = useState(false);

  const divRef = useRef(null);

  function onMouseDown() {
    setMouseDown(true);
    //console.log('mouse down!');
  }

  useEffect(() => {

    const onWindowMouseMove = (e) => {
      //console.log('dragging');
      const x = e.pageX;

      const rect = divRef.current.getBoundingClientRect();

      const value = clamp((x - rect.left) / divRef.current.offsetWidth, 0, 1);
      //console.log(value);
      setProgress(value);
    };

    const removeEvents = () => {
      console.log('mouse up');
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', removeEvents);
      //console.log('removed events');
      setMouseDown(false);
      setAddedEvents(false);
    };

    if (mouseDown && !addedEvents) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', removeEvents);
      //console.log('added events');
      setAddedEvents(true);
    }

    return() => removeEvents,
    [mouseDown]
  });

  return <div ref={divRef} className="progressBar__wrapper" style={style} onClick={e => onClickedProgressBar(e)} onMouseDown={onMouseDown}>
    <div className="progressBar">
      <div className="progressBar__inner" style={{
          width: progress * 100 + '%'
        }}></div>
    </div>
  </div>;

  function onClickedProgressBar(e) {

    const x = e.nativeEvent.offsetX;

    const value = x / divRef.current.offsetWidth;
    setProgress(value);

    //onClicked(value);
  }
}

export default ProgressBar;
