import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";
import { ImageController } from '../controllers/image.controller';
import { TagController } from '../controllers/tag.controller';

mediaRouter.get("/id/:id", GalleryController.apiGetGalleryById);
mediaRouter.put("/id/:id", GalleryController.apiUpdateGalleryById);


mediaRouter.get("/id/:id/images", ImageController.apiGetAllImagesByGallery);

mediaRouter.get("/primary", ImageController.apiGetAllPrimaryImages);
mediaRouter.get("/primary/section/:section", ImageController.apiGetAllPrimaryImages);


mediaRouter.post("/", GalleryController.apiGetAllGalleries);
mediaRouter.post("/image", ImageController.apiGetAllImages);
mediaRouter.get("/image/id/:id", ImageController.apiGetImage);
mediaRouter.put("/image/id/:id", ImageController.apiUpdateImage);


mediaRouter.post("/tag", TagController.apiGetAllTags);
mediaRouter.post("/tag/list", TagController.apiGetAllTagsAsLabelValues);

mediaRouter.post("/tag/new", TagController.apiCreateTag);


export { mediaRouter };
