import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dropzone = ({ className, files, setFiles }) => {
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <div>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            />
          </svg>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="text-gray-500 text-heading4-medium">
              Drag & drop files here, or click to select files
            </p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        {(files.length > 0 || rejected.length > 0) && (
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant={"destructive"}
              onClick={removeAll}
              className="mt-1 text-[12px] tracking-wider font-bold rounded-md px-3 text-white  "
            >
              Remove all images
            </Button>
          </div>
        )}

        {/* Accepted files */}
        {files.length > 0 && (
          <>
            <h3 className="pb-6 mt-10 text-lg font-semibold title text-neutral-600">
              Accepted Files
            </h3>
            <ul className="flex gap-5 mt-6">
              {files.map((file) => (
                <li key={file.name} className="w-20 rounded-md hover:shadow-lg">
                  <Button
                    size={"icon"}
                    type="button"
                    variant={"destructive"}
                    className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-3 -left-3 "
                    onClick={() => removeFile(file.name)}
                  >
                    <X className="w-5 h-5 " />
                  </Button>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="object-contain rounded-md "
                  />
                  {/*  <p className="mt-2 px-5 text-neutral-900 text-[12px] font-medium">
                    {file.name}
                  </p> */}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Rejected Files */}
        {rejected.length > 0 && (
          <>
            <h3 className="my-3 text-lg font-semibold border-b ">
              Rejected Files
            </h3>
            <ul className="flex flex-col gap-2 mt-6">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="mt-2 text-sm font-medium text-neutral-500">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
};

export default Dropzone;
