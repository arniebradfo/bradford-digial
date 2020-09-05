import React from "react"
import GatsbyImage, { FixedObject, FluidObject, GatsbyImageProps } from "gatsby-image"


type FitOptions = 'COVER' | 'CONTAIN' | 'FILL' | 'INSIDE' | 'OUTSIDE';
type CropFocusOptions = 'CENTER' | 'NORTH' | 'NORTHEAST' | 'EAST' | 'SOUTHEAST' | 'SOUTH' | 'SOUTHWEST' | 'WEST' | 'NORTHWEST' | 'ENTROPY' | 'ATTENTION';
type ToFormat = 'NO_CHANGE' | 'JPG' | 'PNG' | 'WEBP';
type ToFormatBase64 = 'JPG' | 'PNG' | 'WEBP';


interface ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#shared-options
    grayscale: boolean,
    duotone: boolean,
    toFormat: ToFormat,
    toFormatBase64: ToFormatBase64,
    base64Width: number,
    cropFocus: CropFocusOptions,
    fit: FitOptions,
    pngCompressionSpeed: number,
    rotate: number,

    // on both but not listed in shared?
    quality: number,
    jpegQuality?: number,
    pngQuality?: number,
    webpQuality?: number,
}
const defaultSharedOptions: ISharedOptions = {
    grayscale: false,
    duotone: false,
    toFormat: 'NO_CHANGE',
    toFormatBase64: 'JPG',
    base64Width: 20,
    cropFocus: 'ATTENTION',
    fit: 'COVER',
    pngCompressionSpeed: 4,
    rotate: 0,

    quality: 50,
}


interface IFluidOptions extends ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fluid
    maxWidth: number,
    maxHeight?: number,
    srcSetBreakpoints: number[],
    background: string
}
const defaultFluidOptions: IFluidOptions = {
    ...defaultSharedOptions,
    maxWidth: 800,
    srcSetBreakpoints: [],
    background: 'rgba(0,0,0,1)',
}
function FluidObjectNetlify(src: string, options?: IFluidOptions): FluidObject {
    options = {
        ...defaultFluidOptions,
        ...options,
    }

    //magic

    return {
        aspectRatio: 1,
        src: '',
        srcSet: '',
        sizes: '',
    }
}


interface IFixedOptions extends ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    width: number,
    height?: number,
}
const defaultFixedOptions: IFixedOptions = {
    ...defaultSharedOptions,
    width: 400,
    height: 0,
}
function FixedObjectNetlify(src: string, options?: IFixedOptions): FixedObject {

    options = {
        ...defaultFixedOptions,
        ...options,
    }

    // Automatically create sizes for different resolutions — we do 1x, 1.5x, and 2x
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    let srcSet = `${src}${netlifyRequestImageTransform(options.width, options.height)} 1x`
    srcSet += `, ${src}${netlifyRequestImageTransform(options.width * 1.5, options.height * 1.5)} 1.5x`
    srcSet += `, ${src}${netlifyRequestImageTransform(options.width * 2, options.height * 2)} 2x`

    //magic

    return {
        width: options.width,
        height: options.height > 0 ? options.height : undefined,
        src: src,
        srcSet: srcSet,
    }
}

function netlifyRequestImageTransform(
    width: number = 0,
    height: number = 0,
    resize: 'fit' | 'smartcrop' = 'smartcrop',
): string {
    // https://docs.netlify.com/large-media/transform-images/#request-transformations
    if (!width && !height)
        return '';
    let urlParams = `?nf_resize=${resize}`
    if (width > 0)
        urlParams += `&w=${width}`
    if (height > 0)
        urlParams += `&h=${width}`
    return urlParams;
}

export { FixedObjectNetlify };





