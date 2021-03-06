import React, { useEffect } from "react";
import PropTypes from "prop-types";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LinkOffOutlinedIcon from "@material-ui/icons/LinkOffOutlined";
import DateRangeIcon from "@material-ui/icons/DateRange";

//redux
import { connect } from "react-redux";
import { apiGetUserBegan } from "../../store/actions";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "absolute",
    top: "3rem",
  },
  media: {
    height: 160,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileInfo: {
    textAlign: "start",
    paddingTop: "3rem",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "1em",
  },
  note: {
    padding: "0 1rem",
  },
});
const ProfileCard = (props) => {
  const classes = useStyles(props);
  const {
    handle,
    bio,
    website,
    location,
    createdAt,
    following,
    followedBy,
  } = props.user;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/image/twitterLogo.jpg"
          title="background"
        />

        <CardContent className={classes.profileInfo}>
          <Typography gutterBottom variant="h6" component="h2">
            {handle}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            @ {handle}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {bio}
          </Typography>

          <Typography className={classes.notes}>
            <Typography variant="body2" color="textSecondary" component="p">
              <LocationOnOutlinedIcon />
              {location}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              <LinkOffOutlinedIcon />
              {website}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              <DateRangeIcon />
              {createdAt ? createdAt.split("T")[0] : ""}
            </Typography>
          </Typography>

          <Typography className={classes.notes}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.note}
            >
              {following ? following.length : ""} Followings
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.note}
            >
              {followedBy ? followedBy.length : ""} Followers
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttons}>
        <Button size="small" color="primary">
          Tweets
        </Button>
        <Button size="small" color="primary">
          Tweets & replies
        </Button>
        <Button size="small" color="primary">
          Likes
        </Button>
      </CardActions>
    </Card>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  fetch_loading: PropTypes.bool.isRequired,
  fetch_errors: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
  fetch_loading: state.user.fetch_loading,
  fetch_errors: state.user.fetch_errors,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(ProfileCard);
