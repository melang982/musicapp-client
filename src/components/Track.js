import SoundBars from './SoundBars';

function Track() {
  return <div class="track">
    <div>
      <p class="track__name">
        Division
      </p>
      <p class="track__album">
        Epoch
      </p>
    </div>
    <SoundBars/>
    <p class="track__time">
      3:53
    </p>
  </div>
}
export default Track;
