import React from "react"
import GatsbyImage, { FixedObject, FluidObject, GatsbyImageProps } from "gatsby-image"
import intrinsicImgDimensions from "../img-dimensions.json";

// Understanding gatsby-image @ Medium
// https://medium.com/@alexasteinbrueck/a-look-under-the-hood-of-gatsby-image-part-1-graphql-generated-files-generated-markup-ee404e4ff9cf

type FitOptions = 'COVER' | 'CONTAIN' | 'FILL' | 'INSIDE' | 'OUTSIDE';
type CropFocusOptions = 'CENTER' | 'NORTH' | 'NORTHEAST' | 'EAST' | 'SOUTHEAST' | 'SOUTH' | 'SOUTHWEST' | 'WEST' | 'NORTHWEST' | 'ENTROPY' | 'ATTENTION';
type ToFormat = 'NO_CHANGE' | 'JPG' | 'PNG' | 'WEBP';
type ToFormatBase64 = 'JPG' | 'PNG' | 'WEBP';


interface ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#shared-options
    grayscale?: boolean,
    duotone?: boolean,
    toFormat?: ToFormat,
    toFormatBase64?: ToFormatBase64,
    base64Width?: number,
    cropFocus?: CropFocusOptions,
    fit?: FitOptions,
    pngCompressionSpeed?: number,
    rotate?: number,

    // on both but not listed in shared?
    quality?: number,
    jpegQuality?: number,
    pngQuality?: number,
    webpQuality?: number,

    // we need the size to to stuff and things...
    fileName: string;
}
const defaultSharedOptions: ISharedOptions = {
    grayscale: false,
    duotone: false,
    toFormat: 'NO_CHANGE',
    toFormatBase64: 'JPG',
    base64Width: 20,
    cropFocus: 'CENTER',
    fit: 'COVER',
    pngCompressionSpeed: 4,
    rotate: 0,

    quality: 50,
    fileName: '',
}



/*  Examples
    
    fluid(maxWidth: 800) outputs =>
    sizes="(max-width: 800px) 100vw, 800px" 
    srcset="
        ...jpg 200w,  *.25
        ...jpg 400w,  *.5
        ...jpg 800w,  *1
        ...jpg 1200w, *1.5
        ...jpg 1600w, *2
        ...jpg 5184w  full
    " 

    fluid(maxWidth: 630, sizes:"(max-width: 672px) calc(100vw - 21), 672px" ) outputs =>
    sizes="(max-width: 672px) calc(100vw - 21), 672px" 
    srcset="
        ...jpg 158w,  *.25
        ...jpg 315w,  *.5
        ...jpg 630w,  *1
        ...jpg 945w,  *1.5
        ...jpg 1260w, *2
        ...jpg 5184w  full
    "

    fluid(maxWidth: 630, srcSetBreakpoints:[100, 200, 300, 400, 500, 630]) outputs =>
    sizes="(max-width: 630px) 100vw, 630px"
    srcset="
        ...jpg 100w, 
        ...jpg 200w,
        ...jpg 300w,
        ...jpg 400w,
        ...jpg 500w,
        ...jpg 630w,
        ...jpg 5184w
    "

    fluid(maxWidth: 630, srcSetBreakpoints:[300]) outputs =>
    sizes="(max-width: 630px) 100vw, 630px"
    srcset="
        ...jpg 300w,
        ...jpg 630w,
        ...jpg 5184w
    "

*/

interface IFluidOptions extends ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fluid
    maxWidth?: number,
    maxHeight?: number,
    srcSetBreakpoints?: number[],
    sizes?: string;
    background?: string
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
    const aspectRatio = getIntrinsicImgDimensions(options.fileName)?.aspectRatio

    return {
        aspectRatio: aspectRatio,
        src: src,
        srcSet: '',
        sizes: '',
    }
}


interface IFixedOptions extends ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    width?: number,
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

    if (options.fit !== 'COVER' && options.fit !== 'INSIDE') {
        console.warn('FixedObjectNetlify only supports fit:COVER and fit:INSIDE')
        options.fit = 'COVER';
    }
    if (options.cropFocus !== 'CENTER') {
        console.warn('FixedObjectNetlify only supports cropFocus:CENTER')
        options.cropFocus = 'CENTER';
    }

    // Automatically create sizes for different resolutions — we do 1x, 1.5x, and 2x
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    let resize: nfResize = options.fit === 'INSIDE' ? 'fit' : 'smartcrop';
    let srcSet = `${src}${netlifyRequestImageTransform(options.width, options.height, resize)} 1x`
    srcSet += `,\n${src}${netlifyRequestImageTransform(options.width * 1.5, options.height * 1.5, resize)} 1.5x`
    srcSet += `,\n${src}${netlifyRequestImageTransform(options.width * 2, options.height * 2, resize)} 2x`

    //magic

    return {
        width: options.width,
        height: options.height > 0 ? options.height : undefined,
        src: src,
        srcSet: srcSet,
    }
}

type nfResize = 'fit' | 'smartcrop';
function netlifyRequestImageTransform(
    width: number = 0,
    height: number = 0,
    resize: nfResize = 'smartcrop',
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

function getIntrinsicImgDimensions(fileName: string) {
    return intrinsicImgDimensions[fileName];
}

export { FixedObjectNetlify, FluidObjectNetlify };



