import React from "react"
import GatsbyImage, { FixedObject, FluidObject, GatsbyImageProps } from "gatsby-image"
import intrinsicImgDimensions from "./media-dimensions.json";
import { option } from "yargs";

// Understanding gatsby-image @ Medium
// https://medium.com/@alexasteinbrueck/a-look-under-the-hood-of-gatsby-image-part-1-graphql-generated-files-generated-markup-ee404e4ff9cf

type FitOptions = 'COVER' | 'CONTAIN' | 'FILL' | 'INSIDE' | 'OUTSIDE';
type CropFocusOptions = 'CENTER' | 'NORTH' | 'NORTHEAST' | 'EAST' | 'SOUTHEAST' | 'SOUTH' | 'SOUTHWEST' | 'WEST' | 'NORTHWEST' | 'ENTROPY' | 'ATTENTION';
type ToFormat = 'NO_CHANGE' | 'JPG' | 'PNG' | 'WEBP';
type ToFormatBase64 = 'JPG' | 'PNG' | 'WEBP';
type ImgDimensions = {
    height: number // int
    width: number  // int
    aspectRatio: number // float
}


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
    fit: 'INSIDE',
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


    fluid(maxHeight: 630) outputs =>
    sizes="(max-width: 945px) 100vw, 945px"
    srcset="
        ...jpg 237w,
        ...jpg 473w,
        ...jpg 945w,
        ...jpg 1418w,
        ...jpg 1890w,
        ...jpg 5184w
    "
    image is 3:2 so looks like its taking the width still?


    fluid(maxWidth: 630, maxHeight: 630) outputs =>
    sizes="(max-width: 630px) 100vw, 630px"
    srcset="
        ...jpg 158w,
        ...jpg 315w,
        ...jpg 630w,
        ...jpg 945w,
        ...jpg 1260w,
        ...jpg 5184w
    "
    image is cropped to square, or to aspect ratio specified

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
    // maxWidth: 800, // handle this default in the function
    srcSetBreakpoints: [],
    background: 'rgba(0,0,0,1)',
}
function FluidObjectNetlify(src: string, options?: IFluidOptions): FluidObject {

    options = {
        ...defaultFluidOptions,
        ...options,
    }
    let { maxWidth: width, maxHeight: height, sizes, srcSetBreakpoints, fileName, fit } = options

    const imgDimensions: ImgDimensions = getIntrinsicImgDimensions(fileName)
    if (imgDimensions == null) {
        console.error(`'${fileName}' did not exist in the media-dimensions.json lookup.`)
        return {
            aspectRatio: 1.5, // assume its 3:2 ? better than not existing, right?
            src: src,
            srcSet: '',
            sizes: sizes,
        }
    }
    let { aspectRatio } = imgDimensions

    if (height != null && width == null) {
        width = Math.round(height * aspectRatio)
    } else if (width != null && height == null) {
        height = 0
    } else if (width == null && height == null) {
        height = 0
        width = 800 // default from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fluid
    } else if (width > 0 && height > 0) {
        aspectRatio = width / height
    }

    if (width < 1 && height < 1) {
        console.warn(`'${fileName}': fluid height and width are both 0. What are you asking for`)
    }

    if (sizes == null) {
        sizes = `(max-width: ${width}px) 100vw, ${width}px`
    }

    // if height and width are both defined, we want to crop in
    let resize: nfResize = (width > 0 && height > 0) ? 'smartcrop' : 'fit';
    // let resize: nfResize = fit === 'INSIDE' ? 'fit' : 'smartcrop';

    // srcSetBreakpoints is analogous to resolutions
    if (srcSetBreakpoints.length === 0) {
        srcSetBreakpoints = [.25, .5, 1, 1.5, 2].map(coefficient => Math.round(width * coefficient))
    } else {
        if (!srcSetBreakpoints.includes(width))
            srcSetBreakpoints.push(width)
        srcSetBreakpoints.sort((a, b) => a - b)
    }

    let srcSets = srcSetBreakpoints.map(breakpointWidth => {
        const breakpointHeight = height > 0 ? Math.round(breakpointWidth / aspectRatio) : 0;
        return `${src}${nf_resize(breakpointWidth, breakpointHeight, resize)} ${breakpointWidth}w`
    })
    srcSets.push(`${src} ${imgDimensions.width}w`) // TODO: this doesn't make sense for constrained/cropped images
    const srcSet = srcSets.join(`,\n`)

    return {
        aspectRatio: aspectRatio,
        src: src,
        srcSet: srcSet,
        sizes: sizes,
    }
}


interface IFixedOptions extends ISharedOptions {
    // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    width?: number,
    height?: number,
}
const defaultFixedOptions: IFixedOptions = {
    ...defaultSharedOptions,

    // we handle these defaults in the function
    // width: 400,
    // height: 0,
}
function FixedObjectNetlify(src: string, options?: IFixedOptions): FixedObject {

    options = {
        ...defaultFixedOptions,
        ...options,
    }
    let { width, height, fileName, fit } = options

    const imgDimensions: ImgDimensions = getIntrinsicImgDimensions(fileName)
    if (imgDimensions == null) {
        console.error(`'${fileName}' did not exist in the 'media-dimensions.json' lookup. please rerun {the npm command}`)
        return {
            width: width,
            height: height,
            src: src,
            srcSet: '',
        }
    }
    let { aspectRatio } = imgDimensions

    if (height != null && width == null)
        width = 0
    else if (width != null && height == null)
        height = 0
    else if (width == null && height == null) {
        height = 0
        width = 400 // default from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    } // else if (width > 0 && height > 0) {
    // aspectRatio = width / height // this won't be used
    // }

    if (width < 1 && height < 1) {
        console.warn(`'${fileName}': fixed height and width are both 0. This will return a full size image`)
        return {
            width: imgDimensions.width,
            height: imgDimensions.height,
            src: src,
            srcSet: '',
        }
    }

    // sizes... height and width attributes are used instead

    // if height and width are both defined, we want to crop in
    let resize: nfResize = (width > 0 && height > 0) ? 'smartcrop' : 'fit';
    // let resize: nfResize = fit === 'INSIDE' ? 'fit' : 'smartcrop';

    // resolutions is analogous to srcSetBreakpoints
    // "Automatically create sizes for different resolutions — we do 1x, 1.5x, and 2x"
    // - https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    const resolutions = [1, 1.5, 2]

    let srcSets = resolutions.map(resolution => {
        return `${src}${nf_resize(width * resolution, height * resolution, resize)} ${resolution}x`
    })
    const srcSet = srcSets.join(`,\n`)

    return {
        width: width || Math.round(height * aspectRatio),
        height: height || Math.round(width / aspectRatio),
        src: src,
        srcSet: srcSet,
    }
}

type nfResize = 'fit' | 'smartcrop';
function nf_resize(
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
        urlParams += `&h=${height}`
    return urlParams;
}

function normalizeOptions(options: IFluidOptions | IFixedOptions): IFluidOptions | IFixedOptions {
    if (options.fit !== 'COVER' && options.fit !== 'INSIDE') {
        console.warn('FixedObjectNetlify only supports fit:COVER and fit:INSIDE')
        options.fit = 'INSIDE';
    }
    if (options.cropFocus !== 'CENTER') {
        console.warn('FixedObjectNetlify only supports cropFocus:CENTER')
        options.cropFocus = 'CENTER';
    }
    return options
}

function getIntrinsicImgDimensions(fileName: string): ImgDimensions | undefined {
    return intrinsicImgDimensions[fileName];
}

export { FixedObjectNetlify, FluidObjectNetlify };



