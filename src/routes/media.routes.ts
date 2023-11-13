import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";

mediaRouter.get("/id/:id", GalleryController.apiGetGalleryById);
mediaRouter.put("/id/:id", GalleryController.apiUpdateGalleryById);


mediaRouter.get("/id/:id/images", GalleryController.apiGetAllImagesByGallery);

mediaRouter.get("/primary", GalleryController.apiGetAllPrimaryImages);
mediaRouter.get("/primary/section/:section", GalleryController.apiGetAllPrimaryImages);


mediaRouter.post("/", GalleryController.apiGetAllGalleries);
mediaRouter.post("/image", GalleryController.apiGetAllImages);
mediaRouter.get("/image/id/:id", GalleryController.apiGetImage);
mediaRouter.put("/image/id/:id", GalleryController.apiUpdateImage);


mediaRouter.post("/tags", GalleryController.apiGetAllTags);
mediaRouter.post("/tags/new", GalleryController.apiCreateTag);


export { mediaRouter };
