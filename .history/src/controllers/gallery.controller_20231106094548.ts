import {galleryMapper, Options} from "../mapper/";

export class GalleryController {

    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllGalleries(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:Options = {image: {primary:false}, gallery: {}};

            if (req.params.slug) {
                options.gallery.slug = req.params.slug;
            } else if (req.query.gallery_slug) {
                options.image.primary = true;
            } 

            const galleries = await galleryMapper.getAllGalleries(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({errors_string: galleries})
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }

    }

       /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
       public static async apiGetAllImages(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:Options = {image: {primary:false}, gallery: {}};

            if (req.params.slug) {
                options.gallery.slug = req.params.slug;
            } else if (req.query.gallery_slug) {
                options.image.primary = true;
            } 

            const galleries = await galleryMapper.getAllGalleries(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({errors_string: galleries})
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }

    }
}
