import { useDispatch, useSelector } from "react-redux";
import { toggleEnable } from "../redux/features/enable/enableSlice";

const DeleteToggle = () => {
  const enabled = useSelector((state) => state.enabled.value);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center justify-center">
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          readOnly
        />
        <div
          onClick={() => {
            dispatch(toggleEnable(!enabled));
          }}
          className="w-11 h-6 bg-black/60 rounded-full peer border border-transparent dark:border-white  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
        ></div>
      </label>
    </div>
  );
};

export default DeleteToggle;
