import React from "react"

interface MdxVideoProps {
    src: string
}

const MdxVideo: React.FC<MdxVideoProps> = ({ src, ...props }) => {

    return (
        <video
            preload="metadata"
            controls
        >
            <source type="video/mp4" src={src} />
            <a href={src}>{src}</a>
        </video>
    )
}

export default MdxVideo