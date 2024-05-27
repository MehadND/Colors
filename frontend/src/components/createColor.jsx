import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { ClipboardPaste } from "lucide-react";

const schema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

const Create = ({ setColors }) => {
  const [newColor, setNewColor] = useState("");
  const [newValue, setNewValue] = useState("");

  const [isValid, setIsValid] = useState(false);

  const [showColorError, setShowColorError] = useState(true);
  const [showValueError, setShowValueError] = useState(true);

  const uid = new ShortUniqueId({ length: 10 });

  const theme = useSelector((state) => state.theme.value);
  const colorInClipboard = useSelector((state) => state.clipboard.colorCopy);
  const hexInClipboard = useSelector((state) => state.clipboard.hexCopy);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const addColor = async () => {
    const colorData = {
      id: uid.rnd(),
      color: newColor,
      value: newValue,
    };

    if (
      newColor &&
      newValue &&
      !newColor.includes(" ") &&
      !newValue.includes(" ")
    ) {
      axios
        .post("http://localhost:5100/api/colors/", colorData)
        .then(function (response) {
          setColors(response.data);
          setIsValid(true);
          setNewColor("");
          setNewValue("");
          setTimeout(() => {
            setIsValid(false);
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
          setIsValid(false);
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
        <ClipboardPaste
          onClick={() => {
            setNewColor(colorInClipboard);
            setNewValue(hexInClipboard);
          }}
        />
        <label>New Color</label>
        <input
          type="text"
          {...register("color", { required: true })}
          name="color"
          className={`rounded-md bg-transparent border ${
            theme === "Dark"
              ? "border-white text-white"
              : "border-black text-black"
          }`}
          value={newColor}
          onChange={(e) => {
            setNewColor(e.target.value);
            if (e.target.value.length > 0) {
              setShowColorError(false);
            } else {
              setShowColorError(true);
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length > 0) {
              setShowColorError(false);
            } else {
              setShowColorError(true);
            }
          }}
        />
      </div>
      {showColorError && errors.color && (
        <p className="text-sm text-red-400 mt-2">
          {"* "}
          {errors.color?.message}
        </p>
      )}
      <div className="flex items-center justify-center gap-2">
        <label>New Value</label>
        <input
          type="text"
          {...register("value", { required: true })}
          name="value"
          className={`rounded-md bg-transparent border ${
            theme === "Dark"
              ? "border-white text-white"
              : "border-black text-black"
          }`}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
            if (e.target.value.length > 0) {
              setShowValueError(false);
            } else {
              setShowValueError(true);
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length > 0) {
              setShowValueError(false);
            } else {
              setShowValueError(true);
            }
          }}
        />
      </div>

      {showValueError && errors.value && (
        <p className="text-sm text-red-400 mt-2">
          {"* "}
          {errors.value?.message}
        </p>
      )}
      <div className="flex items-center justify-center">
        <button
          className={`border px-4 py-1 ${
            theme === "Dark"
              ? "text-white border-white"
              : "text-black border-black"
          }  hover:border-red-400 hover:text-red-400 focus:border-red-400 focus:text-red-400 capitalize`}
          onClick={addColor}
        >
          add color
        </button>
      </div>

      {isValid && (
        <p className="text-green-500">Successfully created new color</p>
      )}
    </form>
  );
};

export default Create;
