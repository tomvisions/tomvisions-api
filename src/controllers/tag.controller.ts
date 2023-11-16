import { ImageOptions, tagMapper } from "../mapper";

export class TagController {
    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiCreateTag(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            const tag = await tagMapper.createTag(req.body);

            if (typeof tag === 'string') {
                return res.status(500).json({ errors_string: tag })
            }

            return res.status(200).json(tag);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }


    apiGetAllTagsAsLabelValues


    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiGetAllTagsAsLabelValues(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            const tags = await tagMapper.getAllTags(req.body);
    
            if (typeof tags === 'string') {
                return res.status(500).json({ errors_string: tags })
            }

            const tagList = tags.map((tag) => {
                return {"label": tag.name, "value": tag.id}
            });

            return res.status(200).json(tagList);

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
    public static async apiGetAllTags(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            const tags = await tagMapper.getAllTags(req.body);
    
            if (typeof tags === 'string') {
                return res.status(500).json({ errors_string: tags })
            }

            const paginationResults = tagMapper.prepareListResults(tags, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }
}