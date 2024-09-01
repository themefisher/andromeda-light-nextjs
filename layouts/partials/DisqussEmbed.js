"use client";
import config from "@config/config.json";
import { DiscussionEmbed } from "disqus-react";

const DisqussEmbed = () => {
  const { disqus } = config;
  return (
    <DiscussionEmbed shortname={disqus.shortname} config={disqus.settings} />
  );
};

export default DisqussEmbed;
