import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Orders from "./Orders";
import Suggestions from "./Suggestions";
import FileUpload from "./FileUpload";
import PaymentForm from "./PaymentForm";
import UploadModal from "./UploadModal";
import { useQuery, gql } from "@apollo/client";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { Redirect, useParams } from 'react-router-dom';

import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function Profile() {
  const classes = useStyles()
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/signin" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  return (
    <div>

        <Grid className={classes.paper}>
          <div className={classes.paper}>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Typography varient="h2"> JJDT</Typography>
            <Typography varient="h6"></Typography>
          </div>
          <div className={classes.paper}>
            <div className={classes.paper}>
              <UploadModal />
              <FileUpload />
              <PaymentForm />
            </div>
            <div className={classes.paper}>
              <Orders />
            </div>
          </div>
          <div className={classes.paper}>
            <Suggestions />
          </div>
        </Grid>
    </div>
  );
}

export default Profile;
