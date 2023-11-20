import { imageMapper, paramsOptions } from "../mapper";
import { GalleryOptions, ImageOptions } from "../mapper";

export class ImageController {
    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiGetImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            let id;
            if (req.params.id) {
                id = req.params.id
            }

            const images = await imageMapper.getImageById(id);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

//            const paginationResults = galleryMapper.prepareListResults(images, req.query);
            
            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiUpdateImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  

            let id;
            if (req.params.id) {
                 id = req.params.id
            }

            const images = await imageMapper.updateImageById(id, req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
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

            const images = await imageMapper.getAllImages(req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            console.log('the list');
            console.log(images);

            req.body.listLength = await imageMapper.getListLength();
            const paginationResults = imageMapper.prepareListResults(images, req.body);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

      /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
  public static async apiGetAllPrimaryImages(req: any, res: any, next: any) {
    try {
        //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
        //      }
        const options: GalleryOptions = { section: 'all' };

        if (req.params.section) {
            options.section = req.params.section
        }

        const images = await imageMapper.getAllPrimaryImages(options);

        if (typeof images === 'string') {
            return res.status(500).json({ errors_string: images })
        }

     //   const paginationResults = imageMapper.prepareListResults(galleries, req.query);

        return res.status(200).json({"images":images});

    } catch (error) {
        res.status(500).json({ error_main: error.toString() })
    }

}

    /**
  * Calling all galleries
  * @param req
  * @param res
  * @param next
  */
    public static async apiGetAllImagesByGallery(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }

           
            const options: paramsOptions = { id: "string", pageIndex: 1, pageSize:10, filterQuery: "" };


            if (req.params.id) {
                options.id = req.params.id;
            }

            if (req.params.pageIndex) {
                options.pageIndex = req.params.pageIndex;
            }

            if (req.params.pageIndex) {
                options.pageIndex = req.params.pageIndex;
            }

            if (req.params.filterQuery) {
                options.pageIndex = req.params.filterQuery;
            }


            const galleries = await imageMapper.getImagesByGallery(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({ errors_string: galleries })
            }

            console.log('the gallery');
            console.log(galleries);

            const paginationResults = imageMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

}