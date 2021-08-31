import SoundBars from './SoundBars';

function Track(props) {
  const { track } = props;

  return <div className="track">
    <div>
      <p className="track__name">
        {track.title}
      </p>
      <p className="track__album">
        Epoch
      </p>
    </div>
    <SoundBars/>
    <p className="track__time">
      3:53
    </p>
  </div>
}
export default Track;
