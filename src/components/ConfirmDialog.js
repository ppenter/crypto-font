import React from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import ActionButton from "./ActionButton.js";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    backgroundColor: "var(--background)",
    color: "var(--text)",
    fontFamily: "VT323",
    padding: "20px",
  },
  title: {
    margin: 10,
  },
  content: {
    margin: 10,
    marginBottom: 10,
    paddingTop: 0,
    marginTop: 0,
  },
}));

const themes = createTheme({
  typography: {
    fontFamily: ["VT323", "monospace"].join(","),
  },
  palette: {
    text: {
      primary: "var(--text)",
    },
    background: {
      paper: "var(--background)",
    },
  },
});

export default function ConfirmDialong(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={themes}>
      <Dialog open={openPopup}>
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography style={{ flexGrow: 1, fontSize: 24 }}>
              {title}
            </Typography>
            <ActionButton
              title="X"
              onClick={() => {
                setOpenPopup(false);
              }}
            ></ActionButton>
          </div>
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          {children}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
