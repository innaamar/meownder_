import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_race: false,
    animal_identity: "dog",
    aminal_interest: "cat",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="dog-animal-identity"
                type="radio"
                name="animal_identity"
                value="dog"
                onChange={handleChange}
                checked={formData.animal_identity === "dog"}
              />
              <label htmlFor="dog-animal-identity">Dog</label>
              <input
                id="cat-animal-identity"
                type="radio"
                name="animal_identity"
                value="cat"
                onChange={handleChange}
                checked={formData.animal_identity === "cat"}
              />
              <label htmlFor="cat-animal-identity">Cat</label>
              <input
                id="more-animal-identity"
                type="radio"
                name="animal_identity"
                value="more"
                onChange={handleChange}
                checked={formData.animal_identity === "more"}
              />
              <label htmlFor="more-animal-identity">More</label>
            </div>

            <label htmlFor="show-animal">Show Animal Type on my Profile</label>

            <input
              id="show-animal"
              type="checkbox"
              name="show_animal"
              onChange={handleChange}
              checked={formData.show_animal}
            />

            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="dog-animal-interest"
                type="radio"
                name="animal_interest"
                value="dog"
                onChange={handleChange}
                checked={formData.animal_interest === "dog"}
              />
              <label htmlFor="dog-animal-interest">Dog</label>
              <input
                id="cat-animal-interest"
                type="radio"
                name="animal_interest"
                value="cat"
                onChange={handleChange}
                checked={formData.animal_interest === "cat"}
              />
              <label htmlFor="cat-animal-interest">Cat</label>
              <input
                id="everyone-animal-interest"
                type="radio"
                name="animal_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.animal_interest === "everyone"}
              />
              <label htmlFor="everyone-animal-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;
