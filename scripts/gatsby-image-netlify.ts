import React from "react"
import GatsbyImage, { FixedObject, FluidObject, GatsbyImageProps } from "gatsby-image"
import intrinsicImgDimensions from "./img-dimensions.json";
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
    options = normalizeOptions({
        ...defaultFluidOptions,
        ...options,
    })

    if (options.maxHeight != null && options.maxWidth == null) {
        // options.maxWidth = 0 // later...
        // TODO: what if its a maxHeight?
        console.warn(`'${options.fileName}' maxHeight is yet supported on fluid images`)
        options.maxHeight = 0
        options.maxWidth = 800
    } else if (options.maxWidth != null && options.maxHeight == null) {
        options.maxHeight = 0
    } else if (options.maxWidth == null && options.maxHeight == null) {
        options.maxHeight = 0
        options.maxWidth = 800 // default from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fluid
    }

    if (options.sizes == null) {
        options.sizes = `(max-width: ${options.maxWidth}px) 100vw, ${options.maxWidth}px`
    }

    const imgDimensions: ImgDimensions = getIntrinsicImgDimensions(options.fileName)
    if (imgDimensions == null) {
        console.error(`'${options.fileName}' did not exist in the media-dimensions.json lookup.`)
        return {
            aspectRatio: 1.5, // assume its 3:2 ? better than not existing, right?
            src: src,
            srcSet: '',
            sizes: options.sizes,
        }
    }

    const { width, height, aspectRatio } = imgDimensions
    const { maxWidth, maxHeight } = options

    if (options.srcSetBreakpoints.length === 0) {
        options.srcSetBreakpoints = [.25, .5, 1, 1.5, 2].map(coefficient => Math.round(maxWidth * coefficient))
    } else {
        if (!options.srcSetBreakpoints.includes(maxWidth))
            options.srcSetBreakpoints.push(maxWidth)
        options.srcSetBreakpoints.sort((a, b) => a - b)
    }

    // TODO: handle this depending of if maxHeight and maxWidth are both Set?
    // let resize: nfResize = options.fit === 'INSIDE' ? 'fit' : 'smartcrop';
    let resize: nfResize = 'fit'; // always fit for now

    let srcSets = options.srcSetBreakpoints.map(breakpoint => {
        return `${src}${nf_resize(breakpoint, 0, resize)} ${breakpoint}w`
    })
    srcSets.push(`${src} ${width}w`)

    const srcSet = srcSets.join(`,\n`)

    return {
        aspectRatio: aspectRatio,
        src: src,
        srcSet: srcSet,
        sizes: options.sizes,
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

    if (options.height != null && options.width == null)
        options.width = 0
    else if (options.width != null && options.height == null)
        options.height = 0
    else if (options.width == null && options.height == null) {
        options.height = 0
        options.width = 400 // default from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    }


    const imgDimensions: ImgDimensions = getIntrinsicImgDimensions(options.fileName)
    if (imgDimensions == null) {
        console.error(`'${options.fileName}' did not exist in the 'media-dimensions.json' lookup. please rerun {the npm command}`)
        return {
            width: options.width,
            height: options.height,
            src: src,
            srcSet: '',
        }
    }

    if (options.width < 1 && options.height < 1) {
        console.warn(`'${options.fileName}': fixed height and width are both 0. This will return a full size image`)
        return {
            width: imgDimensions.width,
            height: imgDimensions.height,
            src: src,
            srcSet: '',
        }
    }

    // if height and width are both defined, we want to crop in
    let resize: nfResize = (options.width > 0 && options.height > 0) ? 'smartcrop' : 'fit';
    // let resize: nfResize = options.fit === 'INSIDE' ? 'fit' : 'smartcrop';

    // "Automatically create sizes for different resolutions — we do 1x, 1.5x, and 2x"
    // - https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#fixed
    let srcSets = [1, 1.5, 2].map(resolution => {
        return `${src}${nf_resize(options.width * resolution, options.height * resolution, resize)} ${resolution}x`
    })
    const srcSet = srcSets.join(`,\n`)

    return {
        width: options.width || Math.round(options.height * imgDimensions.aspectRatio),
        height: options.height || Math.round(options.width / imgDimensions.aspectRatio),
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



