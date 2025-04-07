
const PointsGuide = () => {
  return (
    <div className="glass-effect p-4 rounded-lg">
      <h4 className="font-medium mb-2">How to Earn Points</h4>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span>Upload from Camera Roll</span>
          <span className="font-semibold">1x Points</span>
        </li>
        <li className="flex justify-between">
          <span>Post Right Now (in app)</span>
          <span className="font-semibold">2x Points</span>
        </li>
        <li className="flex justify-between">
          <span>Make Available to Pin</span>
          <span className="font-semibold">3x Points</span>
        </li>
        <li className="flex justify-between">
          <span>Post Gets Pinned by Venue</span>
          <span className="font-semibold">5x Points</span>
        </li>
      </ul>
    </div>
  );
};

export default PointsGuide;
