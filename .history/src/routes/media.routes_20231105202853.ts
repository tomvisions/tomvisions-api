import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";

mediaRouter.post("/", GalleryController.apiCreateGallery);
mediaRouter.get("/slug/:slug", GalleryController.apiGetAllGalleries);
mediaRouter.get("/primary", GalleryController.apiGetAllGalleries);


export { mediaRouter };
