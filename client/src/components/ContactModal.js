import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import WebIcon from "@material-ui/icons/Web";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import bitmojiSmile from '../assets/img/bitmoji-smile.png';

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    width: 450,
    [theme.breakpoints.down("xs")]: {
      width: "92%",
    },
  },
  bitmojiButton: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/bitmoji-neutral.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 66,
    width: 50,
    position: "absolute",
    bottom: 25,
    left: 15,
    zIndex: 25,
    "&:hover": {
      backgroundImage: `url(${process.env.PUBLIC_URL}/img/bitmoji-smile.png)`,
    },
  },
  precache: {
    position: "absolute",
    bottom: 0,
    left: 0,
    opacity: 0.1,
    width: 2,
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: `${theme.spacing(2)} 0`,
    width: "100%",
  },
  img: {
    maxWidth: 160,
  },
  contactInfo: {
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0.5),
    },
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactModal() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.bitmojiButton} onClick={handleClickOpen}></div>
      <img
        className={classes.precache}
        src="/img/bitmoji-smile.png"
        alt="smiling ben precache img"
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-contact-info"
        aria-describedby="alert-dialog-ben-perlmutter-contact-information"
        className={classes.dialog}
      >
        <div className={classes.contentWrapper}>
          <div className={classes.imgWrapper}>
            <img
              className={classes.img}
              src={`/img/bitmoji-breakdancing.png`}
              alt="Ben emoji"
            />
          </div>
          <DialogTitle id="ben-permutter-contact" align="center">
            Ben Perlmutter
          </DialogTitle>
          <DialogContent className={classes.contactInfo}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://ben.perlmutter.io" target="_blank">
                      ben.perlmutter.io
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="mailto:ben@perlmutter.io">
                      ben@perlmutter.io
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://github.com/bpmutter" target="_blank">
                      Github
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkedInIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href="https://linkedin.com/in/ben-perlmutter"
                      target="_blank"
                    >
                      LinkedIn
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://twitter.com/bpmutter" target="_blank">
                      Twitter
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
