import { Button, Grid } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import axios from "axios";


const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData)
    await axios.post("/uploads", formData)
    console.log("done")
    try {
      const res = await axios.post("/uploads", formData, {
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      <Grid>
        <form onSubmit={onSubmit}>
          <div>
            <Typography>Upload Products</Typography>
            <TextField
              type="file"
              className="custom-file-input"
              label={fileName}
              id="outlined-basic"
              variant="outlined"
              onChange={onChange}
            />
          </div>
          <Button type="submit" value="Upload">
            Submit
          </Button>
        </form>

        {uploadedFile ? (
          <div>
            <div>
              <h3>{uploadedFile.fileName}</h3>
              <img
                style={{ width: "100%" }}
                src={uploadedFile.filePath}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </Grid>
    </Fragment>
  );
};

export default FileUpload;
