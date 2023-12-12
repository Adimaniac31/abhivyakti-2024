import aboutUs from "./AboutUs/about-us.svg";
import pastGlimpses1 from "./PastGlimpsesImages/about-us.svg";
import pastGlimpses2 from "./PastGlimpsesImages/about-us.svg";
import pastGlimpses3 from "./PastGlimpsesImages/about-us.svg";
import pastGlimpses4 from "./PastGlimpsesImages/about-us.svg";
import pastGlimpses5 from "./PastGlimpsesImages/about-us.svg";
import pastGlimpses6 from "./PastGlimpsesImages/about-us.svg";
import speaker1 from "./speakers/speaker1.svg";

const data = {
  "pastGlimpsesImages": [
      pastGlimpses1,
      pastGlimpses2,
      pastGlimpses3,
      pastGlimpses4,
      pastGlimpses5,
      pastGlimpses6
  ],
  "speakers": [
      { "name": "Speaker 1", "image": speaker1, "info": "Speaker 1 Info","socialMedia": {
        "twitter": "https://www.instagram.com/speaker1",
        "instagram": "https://www.facebook.com/speaker1",
        "linkedin": "https://www.linkedin.com/in/speaker1"
      } },
      { "name": "Speaker 2", "image": speaker1, "info": "Speaker 2 Info","socialMedia": {
        "twitter": "https://www.instagram.com/speaker1",
        "instagram": "https://www.facebook.com/speaker1",
        "linkedin": "https://www.linkedin.com/in/speaker1"
      } }
  ],
  "aboutUs": {
      "text": "Abhivyakti, IIIT Nagpur's annual cultural event, is a dynamic fusion of art, talent, and diversity. It provides a platform for students to express their creativity and celebrate their uniqueness. From intercollege competitions to inspiring speakers, Abhivyakti is a journey from passion to stardom. It's a path where persistence conquers obstacles, leading to a constellation of success. ",
      "image": aboutUs
  }
};

export default data;
  