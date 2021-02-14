/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { graphql, useStaticQuery } from "gatsby";

interface MdxVideoProps extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  videoName: string
}

export const MdxVideo: React.FC<MdxVideoProps> = ({ videoName, children, ...props }) => {

  const { allVideos } = useStaticQuery(graphql`
    query {
      allVideos: allFile(filter: {ext: {regex: "/(avi|mp4|mov|mkv|ogg)/i"}}) {
        edges {
          node {
            publicURL
            base
          }
        }
      }
    }
  `);

  // TODO: test the performance of this...
  const { node: video } = allVideos.edges.find(edge => videoName == edge.node.base)

  return (
    <video
      preload="metadata"
      controls
      {...props}
    >
      <source type="video/mp4" src={video.publicURL} />
      <a href={video.publicURL}>{video.base}</a>
      {children}
    </video>
  )
}
