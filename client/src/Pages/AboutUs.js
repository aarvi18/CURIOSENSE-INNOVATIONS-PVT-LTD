import React from "react";
import "./AboutUs.css";
import image1 from "../Images/img1.png";

export const AboutUs = () => {
  
  const aboutHeaders = "Welcome to CURIOSENSE INNOVATIONS PVT LTD";

  const aboutDiscription = (
    <p>
      At CURIOSENSE INNOVATIONS PVT LTD, we believe in the transformative power
      of curiosity and play-based learning to shape resilient minds. Our mission
      is rooted in fostering not just academic growth, but also nurturing the
      mental well-being of children. <br /> <br />
      <strong>Our Approach: Curiosity Unleashed</strong> <br />
      We embrace a play-centric philosophy that recognizes the innate curiosity
      within every child. Through interactive and engaging experiences, we
      strive to create an environment where learning is an adventure, and
      questions are the compass. <br />
      <br />
      <strong>Mind Matters: Prioritizing Mental Health </strong>
      <br />
      We understand that mental health is the cornerstone of a child's holistic
      development. Our programs and resources are designed not just to educate
      but also to support the emotional well-being of every young mind in our
      care. <br />
      <br />
      <strong>Partners in Progress: Parents, Teachers, and Schools</strong>
      <br />
      We believe in the power of collaboration. Parents, teachers, and schools
      play pivotal roles in shaping the future. Our approach involves working
      hand-in-hand with these key influencers, creating a cohesive ecosystem
      that nurtures skills beyond the classroom. <br />
      <br />
      <strong>Innovative Tools for Tomorrow's Skills</strong>
      <br />
      Introducing innovative tools, we are committed to revolutionizing the
      learning landscape. These cutting-edge resources aim to augment
      traditional approaches, ensuring children are equipped not only for the
      challenges of today but also for the dynamic opportunities of tomorrow.
      <br />
      <br />
      <strong>Skills for Tomorrow: Empowering Futures </strong>
      <br />
      Skill development is at the core of our mission. We aim to equip children
      with the tools they need not just for today, but for the challenges and
      opportunities of tomorrow. Together, let's build a foundation for success
      and a love for learning that lasts a lifetime. <br />
      <br />
      <strong>
        Join us on this exciting journey of exploration, growth, and discovery.
        Together, we can inspire young minds to reach new heights.
      </strong>
    </p>
  );

  return (
    <section className="aboutus">
      <div className="title">About Us</div>
      <div className="aboutus-sec">
        <div className="about-img">
          <img src={image1} />
        </div>
        <div className="about-sec">
          <h2> {aboutHeaders} </h2>
          <p> {aboutDiscription} </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
