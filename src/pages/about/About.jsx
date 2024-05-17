// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <Fragment>
      <Loader />
      <Helmet>
        <title>About - MenWear</title>
      </Helmet>
      <img src="./images/sitemap.jpg" alt="sitemap" />
    </Fragment>
  );
};
export default About;
