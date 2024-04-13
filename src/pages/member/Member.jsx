// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";
import Loader from "../../components/Loader/Loader";
import { MEMBER } from "../../constants/member.constant.js";

const Member = () => {
  return (
    <Fragment>
      <Loader></Loader>
      <section className="container my-5">
        <div className="w-100 text-center my-4">
          <h1 className="fw-bolder">MEMBERS</h1>
        </div>
        <div className="row align-items-stretch">
          {MEMBER.map((member) => (
            <div
              className="col-6 col-lg-2 py-1 px-2 my-4"
              key={member.id}
            >
              <div className="member-container h-100 position-relative pointer-cursor">
                <div className="member-container bg-transparent h-75 p-2 rounded-3">
                  <a
                    href={member.url}
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <span className="text-black text-decoration-none">
                      <img
                        loading="lazy"
                        src={member.img}
                        alt="member"
                        className="w-100 h-100 rounded-4 object-fit-cover"
                      />
                      <h6 className="mt-3 text-center">
                        {member.name}
                      </h6>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};
export default Member;
