import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { ClipboardPaste } from "lucide-react";

const schema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

const Edit = ({ setColors }) => {
  const [colorID, setColorID] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newValue, setNewValue] = useState("");

  const theme = useSelector((state) => state.theme.value);
  const idInClipboard = useSelector((state) => state.clipboard.idCopy);
  const colorInClipboard = useSelector((state) => state.clipboard.colorCopy);
  const hexInClipboard = useSelector((state) => state.clipboard.hexCopy);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const editColor = async () => {
    const colorData = {
      id: idInClipboard,
      color: newColor,
      hex: newValue,
    };

    if (
      newColor &&
      newValue &&
      !newColor.includes(" ") &&
      !newValue.includes(" ")
    ) {
      axios
        .put("http://localhost:5100/api/colors/", colorData)
        .then(function (response) {
          setColors(response.data);
          setNewColor("");
          setNewValue("");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const submitForm = () => {
    console.log("color created successfully");
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`flex flex-col gap-4 m-4 items-center justify-center ml-auto`}
    >
      <div className="flex items-center justify-center gap-2">
        <label>ID</label>
        <input
          type="text"
          //   {...register("id", { required: true })}
          name="id"
          className={`rounded-md bg-transparent border ${
            theme === "Dark"
              ? "border-white text-white/50"
              : "border-black text-black/50"
          }`}
          value={colorID}
          readOnly
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <ClipboardPaste
          onClick={() => {
            setColorID(idInClipboard);
            setNewColor(colorInClipboard);
            setNewValue(hexInClipboard);
          }}
        />
        <label>New Color</label>
        <input
          type="text"
          //   {...register("color", { required: true })}
          name="edit_color"
          className={`rounded-md bg-transparent border ${
            theme === "Dark"
              ? "border-white text-white"
              : "border-black text-black"
          }`}
          value={newColor}
          onChange={(e) => {
            setNewColor(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <label>New Value</label>
        <input
          type="text"
          //   {...register("value", { required: true })}
          name="edit_value"
          className={`rounded-md bg-transparent border ${
            theme === "Dark"
              ? "border-white text-white"
              : "border-black text-black"
          }`}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className={`border px-4 py-1 ${
            theme === "Dark"
              ? "text-white border-white"
              : "text-black border-black"
          }  hover:border-red-400 hover:text-red-400 focus:border-red-400 focus:text-red-400 capitalize`}
          onClick={editColor}
        >
          edit color
        </button>
      </div>
    </form>
  );
};

export default Edit;
